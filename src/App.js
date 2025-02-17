import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import StreamListPage from "./pages/StreamListPage";
import MoviesPage from "./pages/MoviesPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<StreamListPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
