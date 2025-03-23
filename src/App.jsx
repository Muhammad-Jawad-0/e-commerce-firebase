import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import NoPage from "./pages/noPage/NoPage";
import ProductInfo from "./pages/productInfo/ProductInfo";
import ScrollTop from "./components/scrollTop/ScrollTop";

function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<NoPage />} />
        <Route path="/productinfo" element={<ProductInfo />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
