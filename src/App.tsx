import "./App.css";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Merch from "./pages/Merch";
import MerchShow from "./pages/MerchShow";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/events" element={<Events />} /> */}
          <Route path="/merch" element={<Merch />} />
          <Route path="/merch/:id" element={<MerchShow />} />
        </Routes>
      </Router>{" "}
    </>
  );
}

export default App;
