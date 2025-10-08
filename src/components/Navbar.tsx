import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaCocktail, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Tailwind classes
  const base = "transition hover:text-blue-400";
  const active = "text-blue-400 font-semibold";

  return (
    <nav className="bg-gray-800 border-b border-gray-700 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-blue-300"
        >
          <FaCocktail className="text-blue-400 text-xl" />
          <span>Zero to Tipsy</span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <NavLink to="/about" className={({ isActive }) => (isActive ? active : base)}>
            About
          </NavLink>
          <NavLink to="/recipes" className={({ isActive }) => (isActive ? active : base)}>
            Recipes
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? active : base)}>
            Contact
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-blue-400 text-2xl"
            title="Menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-gray-300 text-sm">
          <NavLink to="/about" onClick={() => setMenuOpen(false)} className={({ isActive }) => (isActive ? active : base)}>
            About
          </NavLink>
          <NavLink to="/recipes" onClick={() => setMenuOpen(false)} className={({ isActive }) => (isActive ? active : base)}>
            Recipes
          </NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)} className={({ isActive }) => (isActive ? active : base)}>
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
