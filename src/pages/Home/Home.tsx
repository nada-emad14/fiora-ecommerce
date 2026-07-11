import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "../../types/product";
import type { CartItem } from "../../types/cart";
import { currency } from "../../utils/currency";
import { SlidersHorizontal, ShoppingBag, Minus, Plus, X } from "lucide-react";
import SkeletonCard from "../../components/Loading/Skeleton";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import Hero from "../../components/Hero/Hero";

type HomePageProps = {
  products: Product[];
  categories: string[];
  category: string;
  setCategory: (value: string) => void;
  priceCap: number;
  setPriceCap: (value: number) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  addToCart: (
    product: Product,
    selectedColor: string,
    selectedSize: string,
  ) => void;
  cart: CartItem[];
  isLoading: boolean;
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

function HomePage({
  products,
  categories,
  category,
  setCategory,
  priceCap,
  setPriceCap,
  searchTerm,
  setSearchTerm,
  addToCart,
  cart,
  isLoading,
  subtotal,
  removeFromCart,
  updateQuantity,
}: HomePageProps) {
  return (
    <motion.div
      className="home-page"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35 }}
    >
    <Hero />

    <section className="content-grid">  
        <div className="catalog-panel">
          <div className="toolbar">
            <div className="search-box">
              <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              categories={categories}
              category={category}
              setCategory={setCategory}
              priceCap={priceCap}
              setPriceCap={setPriceCap}
            />
            </div>
            <div className="toolbar-chip">
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </div>
          </div>

          <div className="filter-bar">
            <div className="filter-group">
              <label htmlFor="category-select">Category</label>
              <select
                id="category-select"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="price-select">Max price</label>
              <input
                id="price-select"
                type="range"
                min="60"
                max="200"
                value={priceCap}
                onChange={(event) => setPriceCap(Number(event.target.value))}
              />
              <span>{currency(priceCap)}</span>
            </div>
          </div>

          <div id="collections" className="product-grid">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <motion.article
                  key={product.id}
                  className="product-card"
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="product-image-link"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                    />
                  </Link>
                  <div className="product-info">
                    <div className="product-topline">
                      <span className="badge">{product.badge}</span>
                      <span className="rating">★ {product.rating.rate}</span>
                    </div>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="product-meta">
                      <span>{product.category}</span>
                      <strong>{currency(product.price)}</strong>
                    </div>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() =>
                        addToCart(product, product.colors[0], product.sizes[0])
                      }
                    >
                      Add to bag
                    </button>
                  </div>
                </motion.article>
              ))
            ) : (
              <div className="empty-state">
                <h3>No matches yet</h3>
                <p>Try widening your price range or switching categories.</p>
              </div>
            )}
          </div>
        </div>

        <aside className="cart-panel">
          <div className="cart-header">
            <h3>Your bag</h3>
            <span>
              {cart.reduce((total, item) => total + item.quantity, 0)} items
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            {cart.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="empty-cart"
              >
                <ShoppingBag size={20} />
                <p>Your bag is ready for a few favorites.</p>
              </motion.div>
            ) : (
              cart.map((item) => (
                <motion.div
                  key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="cart-item"
                >
                  <div>
                    <strong>{item.name}</strong>
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
              ))
            )}
          </AnimatePresence>

          <div className="checkout-box">
            <div className="checkout-row">
              <span>Subtotal</span>
              <strong>{currency(subtotal)}</strong>
            </div>
            <button type="button" className="primary-button full-width">
              Check out
            </button>
          </div>
        </aside>
      </section>
    </motion.div>
  );
}
export default HomePage;
