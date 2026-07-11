import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import type { Product } from "../../types/product";
import type { CartItem } from "../../types/cart";
import { currency, truncateText } from "../../utils/currency";

type ProductDetailPageProps = {
  products: Product[];
  addToCart: (
    product: Product,
    selectedColor: string,
    selectedSize: string,
  ) => void;
  cart: CartItem[];
  subtotal: number;
  removeFromCart: (
    id: number,
    selectedColor: string,
    selectedSize: string,
  ) => void;
  updateQuantity: (
    id: number,
    selectedColor: string,
    selectedSize: string,
    delta: number,
  ) => void;
};

function ProductDetailPage({
  products,
  addToCart,
  cart,
  subtotal,
  removeFromCart,
  updateQuantity,
}: ProductDetailPageProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));
  const [selectedColor, setSelectedColor] = useState(
    products[0]?.colors[0] ?? "Default",
  );
  const [selectedSize, setSelectedSize] = useState(
    products[0]?.sizes[0] ?? "One size",
  );
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!product) {
      return;
    }
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[0]);
    setActiveImage(0);
  }, [product]);

  if (!product) {
    return (
      <motion.div
        className="detail-page empty-state"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h3>Product not found</h3>
        <p>That item is no longer available in the current collection.</p>
        <button
          type="button"
          className="primary-button"
          onClick={() => navigate("/")}
        >
          Back home
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="detail-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
    >
      <button type="button" className="back-link" onClick={() => navigate("/")}>
        ← Back to collection
      </button>

      <section className="detail-grid">
        <div className="detail-gallery">
          <img
            src={product.images[activeImage]}
            alt={product.title}
            className="main-image"
            loading="lazy"
          />
          <div className="thumb-row">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={`thumb-button ${index === activeImage ? "active" : ""}`}
                onClick={() => setActiveImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.title} view ${index + 1}`}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="detail-panel">
          <p className="eyebrow">{product.badge}</p>
          <h2>{product.title}</h2>
          <p className="detail-copy">{truncateText(product.description, 10)}</p>
          <div className="detail-meta">
            <span>{product.category}</span>
            <span>★ {product.rating.rate}</span>
          </div>

          <div className="selector-group">
            <label>Color</label>
            <div className="option-row">
              {product.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`option-chip ${selectedColor === color ? "active" : ""}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="selector-group">
            <label>Size</label>
            <div className="option-row">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`option-chip ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="detail-actions">
            <div className="price-block">
              <span>Price</span>
              <strong>{currency(product.price)}</strong>
            </div>
            <button
              type="button"
              className="primary-button"
              onClick={() => addToCart(product, selectedColor, selectedSize)}
            >
              Add to bag
            </button>
          </div>

          <div className="cart-panel detail-cart">
            <div className="cart-header">
              <h3>Current bag</h3>
              <span>{cart.length} items</span>
            </div>
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="cart-item"
                >
                  <div>
                    <strong>{item.title}</strong>
                    <p>
                      {item.selectedColor} · {item.selectedSize}
                    </p>
                  </div>
                  <div className="quantity-row">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.selectedColor,
                          item.selectedSize,
                          -1,
                        )
                      }
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.selectedColor,
                          item.selectedSize,
                          1,
                        )
                      }
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="cart-item-end">
                    <span>{currency(item.price * item.quantity)}</span>
                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(
                          item.id,
                          item.selectedColor,
                          item.selectedSize,
                        )
                      }
                    >
                      <X size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="checkout-box">
              <div className="checkout-row">
                <span>Subtotal</span>
                <strong>{currency(subtotal)}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="related-section">
        <h3>Related picks</h3>
        <div className="related-grid">
          {products
            .filter((item) => item.id !== product.id)
            .slice(0, 2)
            .map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="related-card"
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <div>
                  <strong>{item.title}</strong>
                  <p>{currency(item.price)}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </motion.div>
  );
}


export default ProductDetailPage;