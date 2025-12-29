import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../../assets/FishEntLogo.svg";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "About Us", to: "/about" },
  { name: "Events", to: "/events" },
  { name: "Merch", to: "/merch" },
  { name: "Store", to: "/store" },
  { name: "Contacts", to: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-10 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-8">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              to={link.to}
              className={`... ${
                location.pathname === link.to ? "text-[#739AD4] font-bold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <img src={logo} alt="logo" className="h-20" />
        </div>

        {/* Right */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.slice(3).map((link) => (
            <Link
              to={link.to}
              className={`... ${
                location.pathname === link.to ? "text-[#739AD4] font-bold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          {navLinks.map((link) => (
            <Link
              to={link.to}
              className={`... ${
                location.pathname === link.to ? "text-[#739AD4] font-bold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
