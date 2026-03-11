import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Packages', path: '/packages' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.split('#')[0]) && path.split('#')[0] !== '/';
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'rgba(245, 240, 232, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(200,169,110,0.2)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="z-50">
            <span
              className="text-2xl tracking-wide"
              style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', color: 'var(--color-text)' }}
            >
              Anaghalaxmi Tours
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative py-1 text-sm tracking-wide transition-colors duration-300"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  color: isActive(link.path) ? 'var(--color-accent)' : 'var(--color-text)',
                }}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/contact"
            className="hidden md:block px-5 py-2 text-sm tracking-wide transition-all duration-300 hover:scale-[1.03]"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              color: scrolled ? 'var(--color-off-white)' : 'var(--color-text)',
              backgroundColor: scrolled ? 'var(--color-accent)' : 'transparent',
              border: '1px solid var(--color-accent)',
              borderRadius: '8px',
            }}
          >
            Plan My Trip
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden z-50 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={24} color="var(--color-text)" />
            ) : (
              <Menu size={24} color="var(--color-text)" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ backgroundColor: 'var(--color-bg)' }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl tracking-wide"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 500,
                    color: isActive(link.path) ? 'var(--color-accent)' : 'var(--color-text)',
                  }}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 px-8 py-3 text-base tracking-wide"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  color: 'var(--color-off-white)',
                  backgroundColor: 'var(--color-accent)',
                  borderRadius: '8px',
                }}
              >
                Plan My Trip
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
