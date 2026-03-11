import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// REPLACE THIS — Your WhatsApp number
const WHATSAPP_NUMBER = '918600669991';

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);
  const location = useLocation();

  // Hide on contact page
  if (location.pathname === '/contact') return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap"
            style={{
              backgroundColor: 'var(--color-text)',
              color: 'var(--color-off-white)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Chat with us
          </motion.span>
        )}
      </AnimatePresence>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Can I know about ....')}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-14 h-14 flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110"
        style={{ backgroundColor: '#25D366' }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} color="#fff" fill="#fff" />
      </a>
    </div>
  );
}
