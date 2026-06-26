import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
    if (!product) return;
    setCartItems((previousCartItems) => {
      const productAlreadyInCart = previousCartItems.find(
        (item) => item.id == product.id,
      );
      if (productAlreadyInCart) {
        return previousCartItems.map((item) =>
          item.id == product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...previousCartItems, { ...product, quantity: 1 }];
    });
  }

  function increaseQuantity(productId) {
    setCartItems((previousCartItems) =>
      previousCartItems.map((item) =>
        item.id == productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function decreaseQuantity(productId) {
    setCartItems((previousCartItems) =>
      previousCartItems
        .map((item) =>
          item.id == productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <BrowserRouter>
      <div className="app">
        <Header cartCount={cartCount} />
        <main>
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
