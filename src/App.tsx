import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
// import ProductDetailPage from "./components/pages/ProductDetailPage";

function App() {
  return (
    <Router>
      <div>
        <Header />
        {/* Main Page */}
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          {/* <Route path="/detail" element={<ProductDetailPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
