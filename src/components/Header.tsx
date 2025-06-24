"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"


const Header = () => {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          CB
        </Link>
        <div className="header__actions">
          <button className="header__menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <nav className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link
                to="/"
                className={`header__nav-link ${location.pathname === "/" ? "header__nav-link--active" : ""}`}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                to="/about"
                className={`header__nav-link ${location.pathname === "/about" ? "header__nav-link--active" : ""}`}
                onClick={closeMenu}
              >
                About
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                to="/playground"
                className={`header__nav-link ${location.pathname === "/playground" ? "header__nav-link--active" : ""}`}
                onClick={closeMenu}
              >
                Playground
              </Link>
              </li>
            <li className="header__nav-item">
              <Link
                to="/work"
                className={`header__nav-link ${location.pathname === "/work" ? "header__nav-link--active" : ""}`}
                onClick={closeMenu}
              >
                Work
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                to="/contact"
                className={`header__nav-link ${location.pathname === "/contact" ? "header__nav-link--active" : ""}`}
                onClick={closeMenu}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
