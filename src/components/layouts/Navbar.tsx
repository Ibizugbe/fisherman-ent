import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/FishEntLogo.svg";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "About Us", to: "/about" },
  { name: "Events", to: "/events" },
  { name: "Merch", to: "/merch" },
  { name: "Contacts", to: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const leftLinks = useMemo(() => navLinks.slice(0, 3), []);
  const rightLinks = useMemo(() => navLinks.slice(3), []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (to: string) => pathname === to;

  const linkBase =
    "text-sm font-medium tracking-wide text-gray-800 hover:text-[#739AD4] transition-colors";
  const linkActive = "text-[#739AD4] font-bold";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/5"
    >
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-20 md:h-24 flex items-center justify-between">
          {/* Left links (desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {leftLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`${linkBase} ${isActive(link.to) ? linkActive : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Logo (always visible) */}
          <div className="flex items-center justify-center md:justify-center flex-1 md:flex-none">
            <Link to="/" className="inline-flex items-center">
              <img
                src={logo}
                alt="logo"
                className="h-10 sm:h-12 md:h-14 w-auto"
              />
            </Link>
          </div>

          {/* Right links (desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {rightLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`${linkBase} ${isActive(link.to) ? linkActive : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-black/5 transition"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black/25"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden relative bg-white border-t border-black/5"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <div className="grid gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={[
                        "flex items-center justify-between",
                        "px-4 py-3 rounded-xl",
                        "text-base font-medium",
                        "transition-colors",
                        isActive(link.to)
                          ? "bg-[#739AD4]/10 text-[#739AD4] font-bold"
                          : "text-gray-900 hover:bg-black/5",
                      ].join(" ")}
                    >
                      <span>{link.name}</span>
                      {isActive(link.to) && (
                        <span className="h-2 w-2 rounded-full bg-[#739AD4]" />
                      )}
                    </Link>
                  ))}
                </div>

                {/* (CTA row) */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Link
                    to="/merch"
                    className="h-11 rounded-full bg-[#739AD4] text-white font-semibold grid place-items-center"
                  >
                    Shop Merch
                  </Link>
                  <Link
                    to="/contact"
                    className="h-11 rounded-full border border-[#739AD4] text-[#739AD4] font-semibold grid place-items-center"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
