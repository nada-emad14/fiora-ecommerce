import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { currency } from "../../utils/currency";
import type { Product } from "../../types/product";

type Props = {
  product: Product;
  addToCart: (
    product: Product,
    selectedColor: string,
    selectedSize: string,
  ) => void;
};

function ProductCard({ product, addToCart }: Props) {
  return (
    <motion.article
      key={product.id}
      className="product-card"
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img src={product.image} alt={product.title} loading="lazy" />
      </Link>
      <div className="product-info">
        <div className="product-topline">
          {/* <span className="badge">{product.badge}</span> */}
          <span className="rating">★ {product.rating?.rate ?? "-"}</span>
        </div>
        <h3>{product.title}</h3>
        <p>{product.description.split(" ").slice(10).join(" ")}...</p>

        <div className="product-meta">
          <span>{product.category}</span>
          <strong>{currency(product.price)}</strong>
        </div>
        <button
          type="button"
          className="secondary-button"
          onClick={() => addToCart(product, "Default", "One Size")}
        >
          Add to bag
        </button>
      </div>
    </motion.article>
  );
}

export default ProductCard;
