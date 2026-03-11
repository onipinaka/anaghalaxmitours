import { motion } from 'framer-motion';
import { Clock, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PackageCard({ pkg, onViewDetails, index = 0, isLarge = false, fillHeight = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`card-underline group rounded-2xl overflow-hidden flex flex-col ${isLarge ? 'sm:flex-row' : ''} ${fillHeight ? 'lg:h-full' : ''}`}
      style={{
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-off-white)',
      }}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${isLarge ? 'sm:w-1/2' : ''} ${fillHeight ? 'lg:flex-1' : ''}`}>
        <img
          src={pkg.image_url}
          alt={pkg.name}
          loading="lazy"
          width={800}
          height={500}
          className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            isLarge
              ? 'h-[280px] sm:h-full min-h-[280px]'
              : fillHeight
                ? 'h-[220px] lg:h-full min-h-[220px] lg:min-h-[160px]'
                : 'h-[220px] min-h-[220px]'
          }`}
        />
        {/* Category badge */}
        <span
          className="absolute top-3 left-3 px-3 py-1 text-xs uppercase tracking-wider rounded-md"
          style={{
            backgroundColor: 'rgba(245,240,232,0.9)',
            color: 'var(--color-accent)',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            backdropFilter: 'blur(4px)',
          }}
        >
          {pkg.category}
        </span>
        {/* Duration badge */}
        <span
          className="absolute top-3 right-3 px-3 py-1 text-xs rounded-md flex items-center gap-1"
          style={{
            backgroundColor: 'rgba(245,240,232,0.9)',
            color: 'var(--color-muted)',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            backdropFilter: 'blur(4px)',
          }}
        >
          <Clock size={12} />
          {pkg.duration}
        </span>
      </div>

      {/* Content */}
      <div className={`p-5 flex flex-col flex-1 ${isLarge ? 'sm:p-6 justify-center' : ''}`}>
        <h3
          className="text-xl mb-1"
          style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-text)' }}
        >
          {pkg.name}
        </h3>
        <p
          className="text-sm mb-4 line-clamp-2"
          style={{ color: 'var(--color-muted)', fontWeight: 300, lineHeight: 1.6 }}
        >
          {pkg.tagline}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span
            className="text-lg"
            style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-accent)' }}
          >
            {pkg.price}
          </span>
          <div className="flex items-center gap-2">
            <Link
              to={`/packages/${pkg.slug}`}
              className="px-4 py-2 text-xs tracking-wide transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                color: 'var(--color-accent)',
                border: '1px solid var(--color-accent)',
                borderRadius: '8px',
              }}
            >
              View Details
            </Link>
            <a
              href={`https://wa.me/918600669991?text=${encodeURIComponent(pkg.whatsapp_text || '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-colors duration-300"
              style={{ border: '1px solid var(--color-border)' }}
              aria-label="WhatsApp"
            >
              <MessageCircle size={16} color="var(--color-accent)" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
