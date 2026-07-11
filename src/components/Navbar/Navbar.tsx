import { Moon, ShoppingBag, SunMedium } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";
import "../../App.css";
import "./Navbar.css";

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext)!;
  const { cartCount } = useCart();

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div>
      <header className="topbar">
        <div className="flix">
          <div className="topbar-logo">
            <img
              src="/images/FIORA.png"
              className="navLogo"
              alt="FIORA Logo"
            />
          </div>
          <div>
            <p className="eyebrow">Curated essentials</p>
            <h1>FIORA</h1>
          </div>
        </div>
        <div className="topbar-actions">
          <button
            type="button"
            className="icon-button"
            onClick={handleThemeToggle}
          >
            {theme === "light" ? <Moon size={18} /> : <SunMedium size={18} />}
          </button>
          <Link to="/" className="icon-button cart-pill" aria-label="View cart">
            <ShoppingBag size={18} />
            <span>{cartCount}</span>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
