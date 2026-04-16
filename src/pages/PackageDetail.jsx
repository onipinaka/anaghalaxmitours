import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, MessageCircle, Check, Minus, Copy, Share2, ArrowLeft, Calendar, Users, MapPin } from 'lucide-react';
import { getPackageBySlug } from '../lib/supabase';
import { usePackages } from '../hooks/usePackages';
import PackageCard from '../components/ui/PackageCard';
import SkeletonCard from '../components/ui/SkeletonCard';

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

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'itinerary', label: 'Itinerary' },
  { key: 'inclusions', label: 'Inclusions' },
];

export default function PackageDetail() {
  const { slug } = useParams();
  const { packages: allPackages } = usePackages();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setActiveTab('overview');
      const result = await getPackageBySlug(slug);
      if (result?.isFallback) {
        setPkg(result.data);
      } else {
        setPkg(result);
      }
      setLoading(false);
    })();
  }, [slug]);

  const included = pkg?.included ? pkg.included.split('|') : [];
  const notIncluded = pkg?.not_included ? pkg.not_included.split('|') : [];
  const itinerary = Array.isArray(pkg?.itinerary) ? pkg.itinerary : [];
  const tiers = parsePricingTiers(pkg?.pricing_tiers);

  // Set default tier once pkg loads
  useEffect(() => {
    if (tiers.length > 0 && !selectedTier) setSelectedTier(tiers[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pkg]);

  const overviewItems = pkg?.overview
    ? pkg.overview.split('|').map((item) => {
        const [label, value] = item.split(':').map((s) => s.trim());
        return { label, value };
      })
    : [];

  const places = pkg?.places_english ? pkg.places_english.split(',').map((p) => p.trim()) : [];

  const displayPrice = selectedTier
    ? `₹${selectedTier.price.toLocaleString('en-IN')}`
    : pkg?.price ? `₹${pkg.price}` : null;

  const related = allPackages
    .filter((p) => p.category === pkg?.category && p.slug !== slug)
    .slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="page-wrapper pt-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="skeleton-shimmer w-full rounded-2xl mb-6" style={{ height: 400 }} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="skeleton-shimmer rounded" style={{ height: 24, width: '60%' }} />
              <div className="skeleton-shimmer rounded" style={{ height: 16, width: '80%' }} />
              <div className="skeleton-shimmer rounded" style={{ height: 200 }} />
            </div>
            <div className="space-y-4">
              <div className="skeleton-shimmer rounded" style={{ height: 36, width: '40%' }} />
              <div className="skeleton-shimmer rounded" style={{ height: 48 }} />
              <div className="skeleton-shimmer rounded" style={{ height: 48 }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="page-wrapper flex flex-col items-center justify-center px-6"
        style={{ minHeight: '80vh' }}
      >
        <h1 className="text-4xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
          404
        </h1>
        <p className="text-base mb-6" style={{ color: 'var(--color-muted)', fontWeight: 300 }}>
          Package not found
        </p>
        <Link
          to="/packages"
          className="px-5 py-2 text-sm rounded-lg flex items-center gap-2"
          style={{ border: '1px solid var(--color-accent)', color: 'var(--color-accent)' }}
        >
          <ArrowLeft size={14} /> Back to Packages
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="page-wrapper"
    >
      {/* Hero Image */}
      <div className="relative w-full overflow-hidden" style={{ maxHeight: 500, marginTop: 72 }}>
        <img
          src={pkg.image_url}
          alt={pkg.name}
          width={1280}
          height={500}
          className="w-full object-cover"
          style={{ height: 500 }}
        />
      </div>

      {/* Content */}
      <section className="py-10 px-6">
        <div className="max-w-[1280px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-6" style={{ color: 'var(--color-muted)' }}>
            <Link to="/" className="hover:underline" style={{ color: 'var(--color-accent)' }}>Home</Link>
            <span>→</span>
            <Link to="/packages" className="hover:underline" style={{ color: 'var(--color-accent)' }}>Packages</Link>
            <span>→</span>
            <span>{pkg.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="flex gap-6 mb-8" style={{ borderBottom: '1px solid var(--color-border)' }}>
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
                        layoutId="detail-tab-underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px]"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <p className="text-sm leading-relaxed mb-8" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                    {pkg.description}
                  </p>
                  {overviewItems.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                      {overviewItems.map((item, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-xl text-center"
                          style={{ backgroundColor: 'var(--color-bg-dark)', border: '1px solid var(--color-border)' }}
                        >
                          <span className="text-xs block mb-1" style={{ color: 'var(--color-muted)', fontWeight: 500 }}>
                            {item.label}
                          </span>
                          <span className="text-sm font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Places Covered */}
                  {places.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
                        <MapPin size={14} color="var(--color-accent)" />
                        Places Covered
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {places.map((place, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs rounded-full"
                            style={{
                              backgroundColor: 'var(--color-bg-dark)',
                              border: '1px solid var(--color-border)',
                              color: 'var(--color-muted)',
                              fontWeight: 400,
                            }}
                          >
                            {place}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Full package image — uncropped */}
                  {pkg.image_url && (
                    <div
                      className="rounded-2xl overflow-hidden"
                      style={{ border: '1px solid var(--color-border)' }}
                    >
                      <img
                        src={pkg.image_url}
                        alt={pkg.name}
                        className="w-full h-auto"
                        style={{ display: 'block', maxHeight: 520, objectFit: 'contain', backgroundColor: 'var(--color-bg-dark)' }}
                      />
                    </div>
                  )}
                </motion.div>
              )}

              {/* Itinerary Tab */}
              {activeTab === 'itinerary' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-1">
                  {itinerary.map((day, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-4 py-4"
                      style={{ borderBottom: i < itinerary.length - 1 ? '1px solid var(--color-border)' : 'none' }}
                    >
                      <div
                        className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: 'var(--color-accent)',
                          color: 'var(--color-off-white)',
                        }}
                      >
                        {day.day}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold mb-1">{day.title}</h4>
                        <p className="text-sm" style={{ color: 'var(--color-muted)', fontWeight: 300, lineHeight: 1.7 }}>
                          {day.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Inclusions Tab */}
              {activeTab === 'inclusions' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-base font-medium mb-4" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)' }}>
                      What's Included
                    </h4>
                    <ul className="space-y-3">
                      {included.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ fontWeight: 300 }}>
                          <Check size={15} className="mt-0.5 flex-shrink-0" color="#27ae60" />
                          {item.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-base font-medium mb-4" style={{ color: '#c0392b', fontFamily: 'var(--font-heading)' }}>
                      Not Included
                    </h4>
                    <ul className="space-y-3">
                      {notIncluded.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ fontWeight: 300 }}>
                          <Minus size={15} className="mt-0.5 flex-shrink-0" color="#c0392b" />
                          {item.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column (Sticky) */}
            <div className="lg:sticky lg:self-start" style={{ top: 100 }}>
              <div className="p-6 rounded-2xl" style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-off-white)' }}>
                <span
                  className="px-3 py-1 text-xs uppercase tracking-wider rounded-md inline-block mb-3"
                  style={{ backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-accent)', fontWeight: 600 }}
                >
                  {pkg.category}
                </span>
                <h2
                  className="text-2xl md:text-3xl mb-2"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}
                >
                  {pkg.name}
                </h2>
                <p className="text-sm mb-4" style={{ color: 'var(--color-muted)', fontWeight: 300 }}>
                  {pkg.tagline}
                </p>
                <div className="w-full h-px mb-4" style={{ backgroundColor: 'var(--color-accent)', opacity: 0.3 }} />

                {/* Duration row */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--color-muted)' }}>
                    <Clock size={14} /> {pkg.duration}
                  </span>
                </div>

                {/* Tour Dates */}
                {pkg.start_date && pkg.end_date && (
                  <div
                    className="flex items-center gap-2 text-xs p-3 rounded-lg mb-4"
                    style={{ backgroundColor: 'var(--color-bg-dark)', border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
                  >
                    <Calendar size={13} />
                    <span style={{ fontWeight: 500 }}>
                      {formatDate(pkg.start_date)} → {formatDate(pkg.end_date)}
                    </span>
                  </div>
                )}

                {/* Seats Badge */}
                {pkg.seats_available != null && (
                  <div
                    className="flex items-center gap-2 text-xs p-3 rounded-lg mb-4"
                    style={{
                      backgroundColor: pkg.seats_available <= 10 ? 'rgba(220,38,38,0.06)' : 'var(--color-bg-dark)',
                      border: `1px solid ${pkg.seats_available <= 10 ? 'rgba(220,38,38,0.2)' : 'var(--color-border)'}`,
                      color: pkg.seats_available <= 10 ? '#dc2626' : 'var(--color-muted)',
                    }}
                  >
                    <Users size={13} />
                    <span style={{ fontWeight: 500 }}>{pkg.seats_available} seats available</span>
                  </div>
                )}

                {/* Pricing Tier Selector */}
                {tiers.length > 0 && (
                  <div className="mb-5">
                    <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-muted)', fontWeight: 600 }}>Select Travel Option</p>
                    <div className="flex flex-col gap-2">
                      {tiers.map((tier) => {
                        const isSelected = selectedTier?.label === tier.label;
                        return (
                          <button
                            key={tier.label}
                            onClick={() => setSelectedTier(tier)}
                            className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-all duration-200 text-left"
                            style={{
                              fontFamily: 'var(--font-body)',
                              border: `1.5px solid ${isSelected ? 'var(--color-accent)' : 'var(--color-border)'}`,
                              backgroundColor: isSelected ? 'var(--color-accent)' : 'transparent',
                              color: isSelected ? 'var(--color-off-white)' : 'var(--color-text)',
                            }}
                          >
                            <span style={{ fontWeight: isSelected ? 600 : 400 }}>{tier.label}</span>
                            <span style={{ fontWeight: 700 }}>₹{tier.price.toLocaleString('en-IN')}</span>
                          </button>
                        );
                      })}
                    </div>
                    {pkg.booking_amount && (
                      <p className="text-xs mt-2" style={{ color: 'var(--color-muted)' }}>
                        Advance booking: <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>₹{Number(pkg.booking_amount).toLocaleString('en-IN')}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Selected Price Display */}
                {displayPrice && (
                  <div className="mb-5">
                    <span
                      className="text-3xl"
                      style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-accent)' }}
                    >
                      {displayPrice}
                    </span>
                    {selectedTier && (
                      <span className="block text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{selectedTier.label}</span>
                    )}
                  </div>
                )}

                <Link
                  to={`/contact?package=${pkg.slug}`}
                  className="w-full block text-center py-3 text-sm tracking-wide rounded-lg mb-3 transition-opacity hover:opacity-90"
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
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm tracking-wide rounded-lg transition-colors"
                  style={{
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text)',
                    fontWeight: 500,
                  }}
                >
                  <MessageCircle size={16} color="var(--color-accent)" />
                  WhatsApp
                </a>

                {/* Share Strip */}
                <div className="flex items-center gap-2 mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md transition-colors"
                    style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
                  >
                    <Copy size={12} />
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Check out ${pkg.name}: ${window.location.href}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md"
                    style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
                  >
                    <Share2 size={12} />
                    Share
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Related Packages */}
          {related.length > 0 && (
            <div className="mt-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl mb-8"
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}
              >
                You Might Also Like
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p, i) => (
                  <PackageCard key={p.id} pkg={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
