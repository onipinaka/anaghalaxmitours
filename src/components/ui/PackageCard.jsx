import { motion } from 'framer-motion';
import { Clock, MessageCircle, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// Parse "3 Tier AC - 15999|AC Bus - 18999" → [{ label, price }]
function parsePricingTiers(raw) {
  if (!raw) return [];
  return raw.split(',').map((t) => {
    const dashIdx = t.lastIndexOf(' - ');
    if (dashIdx === -1) return null;
    const label = t.slice(0, dashIdx).trim();
    const price = parseInt(t.slice(dashIdx + 3).trim(), 10);
    return { label, price };
  }).filter(Boolean);
}

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDateShort(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

export default function PackageCard({ pkg, onViewDetails, index = 0, isLarge = false, fillHeight = false }) {
  const tiers = parsePricingTiers(pkg.pricing_tiers);
  const lowestPrice = tiers.length > 0
    ? Math.min(...tiers.map((t) => t.price))
    : null;

  const displayPrice = lowestPrice
    ? `From ₹${lowestPrice.toLocaleString('en-IN')}`
    : pkg.price
      ? `₹${pkg.price}`
      : null;

  const hasDates = pkg.start_date && pkg.end_date;
  const lowSeats = pkg.seats_available != null && pkg.seats_available <= 10;

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
        {/* Low seats badge */}
        {lowSeats && (
          <span
            className="absolute bottom-3 left-3 px-2 py-1 text-xs rounded-md flex items-center gap-1"
            style={{
              backgroundColor: 'rgba(220,38,38,0.88)',
              color: '#fff',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              backdropFilter: 'blur(4px)',
            }}
          >
            <Users size={11} />
            Only {pkg.seats_available} seats left!
          </span>
        )}
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
          className="text-sm mb-3 line-clamp-2"
          style={{ color: 'var(--color-muted)', fontWeight: 300, lineHeight: 1.6 }}
        >
          {pkg.tagline}
        </p>

        {/* Date strip */}
        {hasDates && (
          <div
            className="flex items-center gap-1.5 text-xs mb-4 py-2 px-3 rounded-lg"
            style={{
              backgroundColor: 'var(--color-bg-dark)',
              color: 'var(--color-muted)',
              border: '1px solid var(--color-border)',
            }}
          >
            <Calendar size={11} />
            <span style={{ fontWeight: 500 }}>
              {formatDateShort(pkg.start_date)} – {formatDate(pkg.end_date)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span
              className="text-lg block"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-accent)' }}
            >
              {displayPrice}
            </span>
            {tiers.length > 1 && (
              <span className="text-xs" style={{ color: 'var(--color-muted)' }}>
                {tiers.length} pricing options
              </span>
            )}
          </div>
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
