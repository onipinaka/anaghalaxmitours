import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MessageCircle, Check, Minus, Calendar, Users } from 'lucide-react';
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

export default function PackageDetailModal({ pkg, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!pkg) return null;

  const included = pkg.included ? pkg.included.split('|') : [];
  const notIncluded = pkg.not_included ? pkg.not_included.split('|') : [];
  const itinerary = Array.isArray(pkg.itinerary) ? pkg.itinerary : [];
  const tiers = parsePricingTiers(pkg.pricing_tiers);
  const [selectedTier, setSelectedTier] = useState(tiers[0] ?? null);

  const overviewItems = pkg.overview
    ? pkg.overview.split('|').map((item) => {
        const [label, value] = item.split(':').map((s) => s.trim());
        return { label, value };
      })
    : [];

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'itinerary', label: 'Itinerary' },
    { key: 'inclusions', label: 'Inclusions' },
  ];

  const hasDates = pkg.start_date && pkg.end_date;
  const displayPrice = selectedTier
    ? `₹${selectedTier.price.toLocaleString('en-IN')}`
    : pkg.price
      ? `₹${pkg.price}`
      : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{ backgroundColor: 'var(--color-off-white)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full"
              style={{ backgroundColor: 'rgba(245,240,232,0.9)', backdropFilter: 'blur(4px)' }}
            >
              <X size={16} color="var(--color-text)" />
            </button>

            {/* Image */}
            <img
              src={pkg.image_url}
              alt={pkg.name}
              className="w-full object-cover"
              style={{ height: 280 }}
              width={800}
              height={280}
            />

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-3 py-1 text-xs uppercase tracking-wider rounded-md"
                  style={{
                    backgroundColor: 'var(--color-bg-dark)',
                    color: 'var(--color-accent)',
                    fontWeight: 600,
                  }}
                >
                  {pkg.category}
                </span>
                <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-muted)' }}>
                  <Clock size={12} /> {pkg.duration}
                </span>
              </div>

              <h2
                className="text-3xl mb-1"
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}
              >
                {pkg.name}
              </h2>
              <p className="text-sm mb-3" style={{ color: 'var(--color-muted)', fontWeight: 300 }}>
                {pkg.tagline}
              </p>

              {/* Dates & Seats row */}
              {(hasDates || pkg.seats_available != null) && (
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  {hasDates && (
                    <div
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
                      style={{ backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-muted)', border: '1px solid var(--color-border)' }}
                    >
                      <Calendar size={12} />
                      <span style={{ fontWeight: 500 }}>
                        {formatDate(pkg.start_date)} – {formatDate(pkg.end_date)}
                      </span>
                    </div>
                  )}
                  {pkg.seats_available != null && (
                    <div
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
                      style={{
                        backgroundColor: pkg.seats_available <= 10 ? 'rgba(220,38,38,0.08)' : 'var(--color-bg-dark)',
                        color: pkg.seats_available <= 10 ? '#dc2626' : 'var(--color-muted)',
                        border: `1px solid ${pkg.seats_available <= 10 ? 'rgba(220,38,38,0.2)' : 'var(--color-border)'}`,
                      }}
                    >
                      <Users size={12} />
                      <span style={{ fontWeight: 500 }}>{pkg.seats_available} seats available</span>
                    </div>
                  )}
                </div>
              )}

              {/* Pricing Tier Selector */}
              {tiers.length > 0 && (
                <div className="mb-5">
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted)', fontWeight: 600 }}>
                    Select Travel Option
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tiers.map((tier) => {
                      const isSelected = selectedTier?.label === tier.label;
                      return (
                        <button
                          key={tier.label}
                          onClick={() => setSelectedTier(tier)}
                          className="px-3 py-2 rounded-lg text-xs transition-all duration-200"
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: isSelected ? 600 : 400,
                            border: `1.5px solid ${isSelected ? 'var(--color-accent)' : 'var(--color-border)'}`,
                            backgroundColor: isSelected ? 'var(--color-accent)' : 'transparent',
                            color: isSelected ? 'var(--color-off-white)' : 'var(--color-text)',
                          }}
                        >
                          {tier.label}
                          <span className="ml-1.5 font-semibold">₹{tier.price.toLocaleString('en-IN')}</span>
                        </button>
                      );
                    })}
                  </div>
                  {pkg.booking_amount && (
                    <p className="text-xs mt-2" style={{ color: 'var(--color-muted)' }}>
                      Book now for just <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>₹{Number(pkg.booking_amount).toLocaleString('en-IN')}</span> advance
                    </p>
                  )}
                </div>
              )}

              {/* Tabs */}
              <div className="flex gap-6 mb-6" style={{ borderBottom: '1px solid var(--color-border)' }}>
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="relative pb-3 text-sm transition-colors duration-300"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: activeTab === tab.key ? 600 : 400,
                      color: activeTab === tab.key ? 'var(--color-accent)' : 'var(--color-muted)',
                    }}
                  >
                    {tab.label}
                    {activeTab === tab.key && (
                      <motion.div
                        layoutId="modal-tab-underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px]"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[200px]">
                {activeTab === 'overview' && (
                  <div>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text)', fontWeight: 300 }}>
                      {pkg.description}
                    </p>
                    {overviewItems.length > 0 && (
                      <div className="grid grid-cols-2 gap-3">
                        {overviewItems.map((item, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-xl"
                            style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
                          >
                            <span className="text-xs block mb-1" style={{ color: 'var(--color-muted)', fontWeight: 500 }}>
                              {item.label}
                            </span>
                            <span className="text-sm" style={{ fontWeight: 500 }}>{item.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'itinerary' && (
                  <div className="space-y-4">
                    {itinerary.map((day, i) => (
                      <div key={i} className="flex gap-4">
                        <div
                          className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: 'var(--color-accent)',
                            color: 'var(--color-off-white)',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          {day.day}
                        </div>
                        <div className="flex-1 pb-4" style={{ borderBottom: i < itinerary.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                          <h4 className="text-sm font-medium mb-1">{day.title}</h4>
                          <p className="text-sm" style={{ color: 'var(--color-muted)', fontWeight: 300, lineHeight: 1.6 }}>
                            {day.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'inclusions' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--color-accent)' }}>
                        What's Included
                      </h4>
                      <ul className="space-y-2">
                        {included.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ fontWeight: 300 }}>
                            <Check size={14} className="mt-0.5 flex-shrink-0" color="#27ae60" />
                            {item.trim()}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-3" style={{ color: '#c0392b' }}>
                        Not Included
                      </h4>
                      <ul className="space-y-2">
                        {notIncluded.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm" style={{ fontWeight: 300 }}>
                            <Minus size={14} className="mt-0.5 flex-shrink-0" color="#c0392b" />
                            {item.trim()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sticky Bottom Bar */}
            <div
              className="sticky bottom-0 p-4 flex items-center justify-between rounded-b-2xl"
              style={{
                backgroundColor: 'var(--color-bg)',
                borderTop: '1px solid var(--color-border)',
              }}
            >
              <div>
                <span
                  className="text-2xl block"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-accent)' }}
                >
                  {displayPrice}
                </span>
                {selectedTier && (
                  <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{selectedTier.label}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/contact?package=${pkg.slug}`}
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm tracking-wide rounded-lg transition-opacity duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-off-white)',
                    fontWeight: 500,
                  }}
                >
                  Send Enquiry
                </Link>
                <a
                  href={`https://wa.me/918600669991?text=${encodeURIComponent(pkg.whatsapp_text || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <MessageCircle size={18} color="var(--color-accent)" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
