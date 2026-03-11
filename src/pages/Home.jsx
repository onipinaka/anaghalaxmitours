import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Compass, Users, Headphones, BadgeDollarSign } from 'lucide-react';
import StatsBar from '../components/ui/StatsBar';
import PackageCard from '../components/ui/PackageCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import PackageDetailModal from '../components/ui/PackageDetailModal';
import ReviewCarousel from '../components/ui/ReviewCarousel';
import Gallery from '../components/ui/Gallery';
import { getFeaturedPackages } from '../lib/supabase';

const heroWords = ['Roam Free.', 'Live Fully.', 'Return', 'Whole.'];   


const marqueeDestinations = 'Bali · Rajasthan · Santorini · Swiss Alps · Maldives · Kyoto · Patagonia · ';

const whyChooseUs = [
  {
    icon: Compass,
    title: 'Fully Personalised',
    desc: 'Every itinerary is handcrafted around your preferences, pace, and passions — no cookie-cutter trips.',
  },
  {
    icon: Users,
    title: 'Local Expertise',
    desc: 'Our on-ground partners are locals who share hidden gems, secret trails, and authentic experiences.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: "From pre-departure jitters to mid-trip changes, we're a WhatsApp message away at any hour.",
  },
  {
    icon: BadgeDollarSign,
    title: 'Transparent Pricing',
    desc: 'What you see is what you pay. No hidden fees, no surprise charges — just honest, upfront pricing.',
  },
];

const GrainOverlay = () => (
  <div className="grain-overlay">
    <svg>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  </div>
);

// Full-bleed hero card for the large bento slot
function BentoHeroCard({ pkg, onViewDetails }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className="group relative rounded-2xl overflow-hidden w-full h-full cursor-pointer"
      style={{ border: '1px solid var(--color-border)' }}
      onClick={onViewDetails}
    >
      {/* Full-bleed image */}
      <img
        src={pkg.image_url}
        alt={pkg.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Dark gradient overlay — bottom-up */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(0deg, rgba(20,15,10,0.88) 0%, rgba(20,15,10,0.35) 50%, transparent 100%)' }}
      />
      {/* Top badges */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
        <span
          className="px-3 py-1 text-xs uppercase tracking-wider rounded-md"
          style={{
            backgroundColor: 'rgba(245,240,232,0.88)',
            color: 'var(--color-accent)',
            fontWeight: 600,
            backdropFilter: 'blur(4px)',
          }}
        >
          {pkg.category}
        </span>
        <span
          className="px-3 py-1 text-xs rounded-md flex items-center gap-1"
          style={{
            backgroundColor: 'rgba(245,240,232,0.88)',
            color: 'var(--color-muted)',
            fontWeight: 500,
            backdropFilter: 'blur(4px)',
          }}
        >
          {pkg.duration}
        </span>
      </div>
      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
        <p className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
          Featured
        </p>
        <h3
          className="text-3xl md:text-4xl mb-2 text-white"
          style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontWeight: 600, lineHeight: 1.2 }}
        >
          {pkg.name}
        </h3>
        <p className="text-sm mb-5 text-white/70" style={{ fontWeight: 300, maxWidth: 420 }}>
          {pkg.tagline}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-xl text-white" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
            {pkg.price}
          </span>
          <Link
            to={`/packages/${pkg.slug}`}
            onClick={e => e.stopPropagation()}
            className="px-5 py-2 text-xs tracking-wide rounded-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-off-white)', fontWeight: 500 }}
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [modalPkg, setModalPkg] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getFeaturedPackages();
      if (result?.isFallback) {
        setFeatured(result.data);
        setIsFallback(true);
      } else if (Array.isArray(result)) {
        setFeatured(result);
      } else {
        setFeatured([]);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="page-wrapper"
    >
      {/* ═══ HERO ═══ */}
      <section
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{
          minHeight: '100dvh',
          background: 'linear-gradient(135deg, #F5F0E8 60%, #EDE3D0 100%)',
        }}
      >
        <GrainOverlay />

        {/* Decorative circle */}
        <div
          className="absolute -top-32 -right-32 rounded-full"
          style={{
            width: 600,
            height: 600,
            background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
            opacity: 0.08,
            filter: 'blur(80px)',
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Hero Heading */}
          <h1 className="mb-6">
            {heroWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
                className="inline-block mr-3 md:mr-4"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  fontSize: 'clamp(40px, 8vw, 96px)',
                  color: 'var(--color-text)',
                  lineHeight: 1.1,
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Sub-heading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-base md:text-lg mb-8"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'var(--color-muted)' }}
          >
            Curated journeys crafted for the curious soul
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/packages"
              className="px-7 py-3 text-sm tracking-wide rounded-lg transition-opacity duration-300 hover:opacity-90"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-off-white)',
              }}
            >
              Explore Packages
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3 text-sm tracking-wide rounded-lg transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                color: 'var(--color-accent)',
                border: '1px solid var(--color-accent)',
              }}
            >
              Talk to Us
            </Link>
          </motion.div>
        </div>

        {/* Marquee Strip */}
        <div className="absolute bottom-16 left-0 right-0 overflow-hidden">
          <div className="marquee-track">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className="text-sm uppercase tracking-[0.3em] whitespace-nowrap px-2"
                style={{ color: 'var(--color-border)', fontFamily: 'var(--font-body)', fontWeight: 400 }}
              >
                {marqueeDestinations}
              </span>
            ))}
          </div>
        </div>

        {/* Bouncing Chevron */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bounce-chevron">
          <ChevronDown size={24} color="var(--color-muted)" />
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <StatsBar />

      {/* ═══ FEATURED PACKAGES ═══ */}
      <section className="py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl mb-3 relative inline-block"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}
            >
              Curated Escapes
              <motion.span
                className="absolute -bottom-2 left-0 h-[2px] w-full"
                style={{ backgroundColor: 'var(--color-accent)' }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
            </h2>
            <p className="text-sm mt-4" style={{ color: 'var(--color-muted)', fontWeight: 300 }}>
              Handpicked journeys for every kind of traveler
            </p>
          </motion.div>

          {isFallback && (
            <div
              className="mb-6 p-3 rounded-lg text-center text-xs"
              style={{ backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-muted)', border: '1px solid var(--color-border)' }}
            >
              Showing cached data. Live updates will appear once connected to the server.
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              style={{ gridTemplateRows: 'auto auto' }}>
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: '420px 360px auto',
              }}
            >
              {/* Bali — large hero: 2 cols wide × 2 rows tall */}
              {featured[0] && (
                <div style={{ gridColumn: '1 / 3', gridRow: '1 / 3' }}>
                  <BentoHeroCard pkg={featured[0]} onViewDetails={() => setModalPkg(featured[0])} />
                </div>
              )}

              {/* Rajasthan — top-right */}
              {featured[1] && (
                <div className="h-full" style={{ gridColumn: '3 / 4', gridRow: '1 / 2' }}>
                  <PackageCard pkg={featured[1]} index={1} fillHeight onViewDetails={() => setModalPkg(featured[1])} />
                </div>
              )}

              {/* Maldives — bottom-right, same column as Rajasthan */}
              {featured[2] && (
                <div className="h-full" style={{ gridColumn: '3 / 4', gridRow: '2 / 3' }}>
                  <PackageCard pkg={featured[2]} index={2} fillHeight onViewDetails={() => setModalPkg(featured[2])} />
                </div>
              )}

              {/* Santorini */}
              {featured[3] && (
                <div style={{ gridColumn: '1 / 2', gridRow: '3 / 4' }}>
                  <PackageCard pkg={featured[3]} index={3} onViewDetails={() => setModalPkg(featured[3])} />
                </div>
              )}

              {/* Japan */}
              {featured[4] && (
                <div style={{ gridColumn: '2 / 3', gridRow: '3 / 4' }}>
                  <PackageCard pkg={featured[4]} index={4} onViewDetails={() => setModalPkg(featured[4])} />
                </div>
              )}

              {/* Custom Trip CTA — spans full width in row 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="rounded-2xl overflow-hidden relative"
                style={{
                  gridColumn: '3 / 4',
                  gridRow: '3 / 4',
                  border: '1px solid var(--color-border)',
                  background: 'linear-gradient(135deg, var(--color-bg-dark) 0%, var(--color-off-white) 100%)',
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] z-10"
                  style={{ background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)' }}
                />
                <div className="p-7 flex flex-col justify-center h-full">
                  <span
                    className="text-xs uppercase tracking-[0.25em] block mb-3"
                    style={{ color: 'var(--color-accent)', fontWeight: 600 }}
                  >
                    Something Custom?
                  </span>
                  <h3
                    className="text-2xl mb-3"
                    style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontWeight: 600, lineHeight: 1.25 }}
                  >
                    We'll build it for you.
                  </h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-muted)', fontWeight: 300 }}>
                    Got a destination, occasion, or dream that doesn't fit a brochure? We'll design it from scratch.
                  </p>
                  <Link
                    to="/contact"
                    className="px-5 py-2.5 text-sm tracking-wide rounded-lg transition-opacity hover:opacity-90 self-start"
                    style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-off-white)', fontWeight: 500 }}
                  >
                    Plan My Custom Trip
                  </Link>
                </div>
              </motion.div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-10"
          >
            <Link
              to="/packages"
              className="text-sm inline-flex items-center gap-1 transition-colors duration-300"
              style={{ color: 'var(--color-accent)', fontWeight: 500 }}
            >
              View All Packages →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--color-bg-dark)' }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
              Why Choose Us
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-muted)', fontWeight: 300 }}>
              What makes Anaghalaxmi Tours different
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-off-white)',
                  border: '1px solid transparent',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
              >
                <item.icon size={28} color="var(--color-accent)" className="mb-4" />
                <h3
                  className="text-lg mb-2"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)', fontWeight: 300 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section className="py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
              Voices from the Road
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-muted)', fontWeight: 300 }}>
              Stories from travelers who trusted us with their journeys
            </p>
          </motion.div>
          <ReviewCarousel />
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--color-bg-dark)' }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
              Moments from the Road
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-muted)', fontWeight: 300 }}>
              Real snapshots and stories from our travelers around the world
            </p>
          </motion.div>
          <Gallery />
        </div>
      </section>

      {/* ═══ ABOUT TEASER ═══ */}
      <section id="about" className="py-20 px-6" style={{ backgroundColor: 'var(--color-bg-dark)' }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Image */}
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
              <img
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80"
                alt="Travel landscape"
                loading="lazy"
                width={600}
                height={750}
                className="w-full object-cover"
                style={{ height: 450 }}
              />
            </div>

            {/* Text */}
            <div>
              <h2
                className="text-3xl md:text-4xl mb-6"
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}
              >
                Our Story
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text)', fontWeight: 300 }}>
                Anaghalaxmi Tours was born from a simple belief: the best journeys don't come from brochures — they come from conversations. We started as two friends with a shared wanderlust and a Google Sheet full of dream destinations.
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text)', fontWeight: 300 }}>
                Eight years later, we've grown into a team of passionate travel designers who spend more time in airports than offices. Every package we create is a piece of our own travel DNA — tested, lived, and loved before it ever reaches you.
              </p>

              {/* Pullquote */}
              <blockquote
                className="pl-5 py-2 mb-6"
                style={{
                  borderLeft: '3px solid var(--color-accent)',
                  fontFamily: 'var(--font-heading)',
                  fontStyle: 'italic',
                  fontSize: '18px',
                  color: 'var(--color-text)',
                  lineHeight: 1.6,
                }}
              >
                "We don't sell trips. We design the moments that become your favorite memories."
              </blockquote>

              <Link
                to="/about"
                className="text-sm inline-flex items-center gap-1 transition-colors duration-300"
                style={{ color: 'var(--color-accent)', fontWeight: 500 }}
              >
                Our Story →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <PackageDetailModal
        pkg={modalPkg}
        isOpen={!!modalPkg}
        onClose={() => setModalPkg(null)}
      />
    </motion.div>
  );
}
