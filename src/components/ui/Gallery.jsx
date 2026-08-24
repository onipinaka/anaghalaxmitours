import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { useGallery } from '../../hooks/useGallery';

// Maps the simple layout value from the sheet to Tailwind grid span classes
function getSpanClass(layout) {
  if (layout === 'horizontal') return 'col-span-2 row-span-1';
  if (layout === 'vertical') return 'col-span-1 row-span-2';
  return 'col-span-1 row-span-1';
}

// Skeleton tile shown while data is loading
function SkeletonTile({ className }) {
  return (
    <div
      className={`${className} rounded-xl animate-pulse`}
      style={{ backgroundColor: 'var(--color-border)' }}
    />
  );
}

export default function Gallery() {
  const { items, loading } = useGallery();
  const [lightbox, setLightbox] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered =
    filter === 'all'
      ? items
      : items.filter((item) => item.type === filter);

  return (
    <>
      {/* Filter pills */}
      <div className="flex items-center justify-center gap-3 mb-10">
        {['all', 'photo', 'video'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-1.5 text-xs uppercase tracking-widest rounded-full transition-all duration-300"
            style={{
              backgroundColor: filter === f ? 'var(--color-accent)' : 'transparent',
              color: filter === f ? 'var(--color-off-white)' : 'var(--color-muted)',
              border: `1px solid ${filter === f ? 'var(--color-accent)' : 'var(--color-border)'}`,
              fontWeight: 500,
            }}
          >
            {f === 'all' ? 'All' : f === 'photo' ? 'Photos' : 'Videos'}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[200px]">
        {loading
          ? // Show 10 skeleton tiles while fetching
            Array.from({ length: 10 }).map((_, i) => (
              <SkeletonTile key={i} className="col-span-1 row-span-1" />
            ))
          : filtered.map((item, i) => (
              <motion.div
                key={`${item.id}-${i}`}
                className={`${getSpanClass(item.layout)} relative group rounded-xl overflow-hidden cursor-pointer`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setLightbox(item)}
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 60%)' }}
                >
                  <p className="text-white text-xs font-medium">{item.caption}</p>
                </div>
                {/* Video play icon */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm"
                      style={{ backgroundColor: 'rgba(200,169,110,0.85)' }}
                    >
                      <Play size={20} color="#FDFAF5" fill="#FDFAF5" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 z-10 p-2 rounded-full"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)' }}
            >
              <X size={20} color="#fff" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.type === 'video' ? (
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={lightbox.video_url + '?autoplay=1'}
                    title={lightbox.caption}
                    className="absolute inset-0 w-full h-full rounded-xl"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img
                  src={lightbox.src}
                  alt={lightbox.caption}
                  className="w-full max-h-[80vh] object-contain rounded-xl"
                />
              )}
              <p
                className="text-center mt-4 text-sm"
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}
              >
                {lightbox.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
