import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const reviews = [
  {
    name: 'Aditi Sharma',
    destination: 'Bali, Indonesia',
    rating: 5,
    text: '"Anaghalaxmi Tours turned our Bali trip into a story we tell at every dinner party. The rice terrace sunrise and private villa were beyond anything we imagined."',
  },
  {
    name: 'Rohit Mehta',
    destination: 'Rajasthan, India',
    rating: 5,
    text: '"Sleeping in a desert camp under a billion stars while folk musicians played — that\'s the kind of moment you can\'t plan alone. Thank you, Anaghalaxmi Tours."',
  },
  {
    name: 'Priya Nair',
    destination: 'Santorini, Greece',
    rating: 5,
    text: '"Our honeymoon was absolutely flawless. Every restaurant, every sunset point, every ferry — curated with such love and attention to detail."',
  },
  {
    name: 'Arjun Kapoor',
    destination: 'Japan',
    rating: 5,
    text: '"The cherry blossom season in Kyoto was magical. Anaghalaxmi Tours arranged a private tea ceremony that made us feel like we\'d stepped back in time."',
  },
  {
    name: 'Meera Joshi',
    destination: 'Maldives',
    rating: 5,
    text: '"Waking up to turquoise water right beneath our villa floor — it felt surreal. Anaghalaxmi Tours made luxury feel effortless and personal."',
  },
  {
    name: 'Vikram Singh',
    destination: 'Himalayas, India',
    rating: 5,
    text: '"The trek was challenging but the guides were incredible. Standing at the summit watching the sun rise over snow peaks changed something in me forever."',
  },
];

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('');
}

export default function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const perPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(reviews.length / perPage);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const currentReviews = reviews.slice(currentIndex * perPage, currentIndex * perPage + perPage);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden" style={{ minHeight: 260 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}
          >
            {currentReviews.map((review) => (
              <div
                key={review.name}
                className="p-6 rounded-2xl"
                style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-off-white)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
                    style={{
                      backgroundColor: 'var(--color-bg-dark)',
                      color: 'var(--color-accent)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                    }}
                  >
                    {getInitials(review.name)}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{review.name}</h4>
                    <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{review.destination}</span>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="var(--color-accent)" color="var(--color-accent)" />
                  ))}
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', color: 'var(--color-text)', fontWeight: 400 }}
                >
                  {review.text}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          className="w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-300"
          style={{ border: '1px solid var(--color-border)' }}
          aria-label="Previous reviews"
        >
          <ChevronLeft size={16} color="var(--color-muted)" />
        </button>
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === currentIndex ? 'var(--color-accent)' : 'var(--color-border)',
                transform: i === currentIndex ? 'scale(1.3)' : 'scale(1)',
              }}
              aria-label={`Go to review page ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-300"
          style={{ border: '1px solid var(--color-border)' }}
          aria-label="Next reviews"
        >
          <ChevronRight size={16} color="var(--color-muted)" />
        </button>
      </div>
    </div>
  );
}
