import "./App.css";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Merch from "./pages/Merch";
import MerchShow from "./pages/MerchShow";
import MerchOrderSuccess from "./components/merch/MerchOrderSuccess";
import TradoutTickets from "./pages/TradoutTickets";
import TicketOrderSuccess from "./pages/TicketOrderSuccess";
import EventShow from "./pages/EventsShow";
import Events from "./pages/Events";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/merch/:id" element={<MerchShow />} />
          <Route path="/merch/order-success" element={<MerchOrderSuccess />} />
          <Route path="/tickets/tradout" element={<TradoutTickets />} />
          <Route path="/tickets/success" element={<TicketOrderSuccess />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<EventShow />} />
          <Route
            path="/tickets/tradout"
            element={<Navigate to="/events/tradout" replace />}
          />
        </Routes>
      </Router>{" "}
    </>
  );
}

export default App;
