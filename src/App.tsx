import { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getProducts } from "./services/productService";
import type { Product } from "./types/product";
import { useCart } from "./context/CartContext";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/Home/Home";
import ProductDetailPage from "./pages/ProductDetails/ProductDetails";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const { cart, subtotal, addToCart, removeFromCart, updateQuantity } =
    useCart();

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [priceCap, setPriceCap] = useState(200);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);

        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [products],
  );
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        category === "All" || product.category === category;
      const matchesPrice = product.price <= priceCap;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, category, priceCap, searchTerm]);

  return (
    <div className="app-shell">
      <Navbar />
     
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                products={filteredProducts}
                categories={categories}
                category={category}
                setCategory={setCategory}
                priceCap={priceCap}
                setPriceCap={setPriceCap}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                addToCart={addToCart}
                cart={cart}
                isLoading={isLoading}
                subtotal={subtotal}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetailPage
                products={products}
                addToCart={addToCart}
                cart={cart}
                subtotal={subtotal}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            }
          />
        </Routes>
      </main>

      
      <Footer />
    </div>
  );
}
export default App;
