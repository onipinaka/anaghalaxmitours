import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const reviews = [
  {
    name: 'Shrikant Sangale',
    destination: 'Dwarka, Somnath and Girnar',
    rating: 5,
    text: '"Namskar, wonderful trip to dwaraka,Somnath and girnaar.  Journey from pune to dwaraka, dwaraka to Somnath and further to Girnar and back to pune was well arranged,planned and managed by anaghalaxmi tours. They have made it a memorable and great trip for all of us. Thanks Anaghalaxmi Tours."',
  },
  {
    name: 'Sujata Katore',
    destination: 'Dhanushkodi, India',
    rating: 5,
    text: '"The staff of Anagha Tour were very supportive and helpful throughout the trip. All the arrangements were good, and they took care of everything nicely, which made both wore journey easy and enjoyable."',
  },
  {
    name: 'Amol Daigude',
    destination: 'Pithapuram, Vishakapatnam',
    rating: 5,
    text: '"I went to Pithapuram, Vishakapatnam.Very good management for travelling and other all facilities.All team members are satisfied about this trip."',
  },
  {
    name: 'Shashikant Nerlekar',
    destination: 'Kashi, Ayodhya, Nepal',
    rating: 5,
    text: '"We experienced very nice tour of Kashi, Ayodhya, Nepal. Its well arranged by Moreji. Accommodation along with breakfast, Lunch and Dinner was also very good and therefore no health issues were observed."',
  },
  {
    name: 'Pallavi Kale',
    destination: 'Ayodhya',
    rating: 5,
    text: '"I had a wonderful experience with this travel company. Everything was very well managed, and the arrangements were smooth from start to finish."',
  },
  {
    name: 'Noddya Mathwad',
    destination: 'Girnar',
    rating: 5,
    text: '"Travelled with anaghalaxmi tours to girnar.The tour was great.Whole management from start to end was professional without any misleading information."',
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
