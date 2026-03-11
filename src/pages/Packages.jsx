import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePackages } from '../hooks/usePackages';
import PackageCard from '../components/ui/PackageCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import FilterBar from '../components/ui/FilterBar';
import EnquiryForm from '../components/ui/EnquiryForm';

const heroWords = ['All', 'Packages'];

function parsePrice(priceStr) {
  return parseInt(String(priceStr).replace(/[^0-9]/g, ''), 10) || 0;
}

function parseDuration(durStr) {
  return parseInt(String(durStr).replace(/[^0-9]/g, ''), 10) || 0;
}

export default function Packages() {
  const { packages, loading, isFallback, showBanner, dismissBanner } = usePackages();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let result = [...packages];

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortBy === 'duration') {
      result.sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration));
    }

    return result;
  }, [packages, activeCategory, sortBy, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="page-wrapper"
    >
      {/* Page Hero */}
      <section
        className="flex flex-col items-center justify-center px-6"
        style={{
          minHeight: '45vh',
          background: 'linear-gradient(135deg, #F5F0E8 60%, #EDE3D0 100%)',
          paddingTop: 100,
        }}
      >
        <h1 className="mb-3">
          {heroWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
              className="inline-block mr-3"
              style={{
                fontFamily: 'var(--font-heading)',
                fontStyle: 'italic',
                fontWeight: 600,
                fontSize: 'clamp(36px, 6vw, 64px)',
                color: 'var(--color-text)',
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 text-sm"
          style={{ color: 'var(--color-muted)', fontWeight: 300 }}
        >
          <Link to="/" className="hover:underline" style={{ color: 'var(--color-accent)' }}>
            Home
          </Link>
          <span>→</span>
          <span>Packages</span>
        </motion.div>
      </section>

      {/* Fallback Banner */}
      {showBanner && (
        <div
          className="py-2 px-6 text-center text-xs flex items-center justify-center gap-2"
          style={{ backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-muted)', borderBottom: '1px solid var(--color-border)' }}
        >
          <span>Showing cached data — live updates will appear once connected.</span>
          <button onClick={dismissBanner} className="underline">Dismiss</button>
        </div>
      )}

      {/* Filter Bar */}
      <FilterBar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Packages Grid */}
      <section className="py-12 px-6">
        <div className="max-w-[1280px] mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-lg mb-2" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
                No packages found
              </p>
              <p className="text-sm mb-6" style={{ color: 'var(--color-muted)', fontWeight: 300 }}>
                Try adjusting your filters or search term
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                  setSortBy('default');
                }}
                className="px-5 py-2 text-sm rounded-lg"
                style={{ border: '1px solid var(--color-accent)', color: 'var(--color-accent)' }}
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((pkg, i) => (
                <PackageCard key={pkg.id} pkg={pkg} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ CUSTOM TRIP ENQUIRY ═══ */}
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--color-bg-dark)' }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left — CTA */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="text-xs uppercase tracking-[0.25em] block mb-4"
                style={{ color: 'var(--color-accent)', fontWeight: 600 }}
              >
                Custom Journeys
              </span>
              <h2
                className="text-3xl md:text-5xl mb-6"
                style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontWeight: 600, lineHeight: 1.2 }}
              >
                Can't find exactly what you're looking for?
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-muted)', fontWeight: 300 }}>
                That's our favourite kind of challenge. Tell us where you dream of going, who's coming along, and what feeling you want to carry home — we'll craft the rest from scratch.
              </p>
              <ul className="space-y-3">
                {[
                  'Completely bespoke itinerary, built around you',
                  'No standard packages — every day curated',
                  'Access to experiences not listed on our site',
                  'Dedicated planner from first call to last flight',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm" style={{ fontWeight: 300 }}>
                    <span style={{ color: 'var(--color-accent)', fontSize: 18, lineHeight: 1 }}>✦</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="p-6 md:p-8 rounded-2xl"
              style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-off-white)' }}
            >
              <h3 className="text-xl mb-1" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
                Tell Us About Your Dream Trip
              </h3>
              <p className="text-xs mb-6" style={{ color: 'var(--color-muted)' }}>
                We respond within 24 hours with a personalised itinerary outline.
              </p>
              <EnquiryForm source="Packages Page — Custom Trip" />
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
