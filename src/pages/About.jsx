import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Compass, Heart, Globe, Award } from 'lucide-react';

const team = [
  {
    name: 'Aryan Mehta',
    role: 'Founder & Lead Planner',
    bio: 'A reformed software engineer who traded his laptop for a backpack in 2016. Aryan has personally visited 34 countries and believes every trip should leave you slightly different from who you arrived.',
    emoji: '✈️',
  },
  {
    name: 'Nisha Kapoor',
    role: 'Co-founder & Experience Designer',
    bio: "Former luxury hotel manager with a nose for the hidden — hidden restaurants, hidden beaches, hidden moments between the tourist stops. Nisha designs the parts of your trip you'll remember forever.",
    emoji: '🌿',
  },
  {
    name: 'Rohan Das',
    role: 'Head of Operations',
    bio: 'The man who makes sure your airport transfer is on time even when your flight lands two hours late. Rohan\'s attention to detail is the silent magic behind every seamless journey.',
    emoji: '📍',
  },
];

const values = [
  {
    icon: Compass,
    title: 'Curiosity',
    desc: 'We design for the traveler who wants to understand a place, not just photograph it.',
  },
  {
    icon: Heart,
    title: 'Care',
    desc: 'We treat your money, your time, and your trust as if they were our own.',
  },
  {
    icon: Globe,
    title: 'Authenticity',
    desc: 'No inflated reviews or fake ratings. Our recommendations are places we\'ve actually loved.',
  },
  {
    icon: Award,
    title: 'Excellence',
    desc: 'Every package we create is tested, revised, and refined before it goes live.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6 },
};

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="page-wrapper"
      style={{ paddingTop: 72 }}
    >
      {/* ═══ HERO ═══ */}
      <section
        className="relative px-6 py-20 md:py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #F5F0E8 60%, #EDE3D0 100%)' }}
      >
        {/* Decorative glow */}
        <div
          className="absolute -bottom-32 -left-32 rounded-full pointer-events-none"
          style={{
            width: 500,
            height: 500,
            background: 'radial-gradient(circle, var(--color-accent), transparent 70%)',
            opacity: 0.06,
            filter: 'blur(60px)',
          }}
        />
        <div className="max-w-[1280px] mx-auto relative z-10">
          <motion.div {...fadeUp} className="flex items-center gap-2 text-xs mb-8" style={{ color: 'var(--color-muted)' }}>
            <Link to="/" style={{ color: 'var(--color-accent)' }} className="hover:underline">Home</Link>
            <span>→</span>
            <span>About</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="mb-5"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  fontSize: 'clamp(36px, 5vw, 72px)',
                  lineHeight: 1.15,
                  color: 'var(--color-text)',
                }}
              >
                We are Anaghalaxmi Tours.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-base mb-6 leading-relaxed"
                style={{ color: 'var(--color-muted)', fontWeight: 300, maxWidth: 500 }}
              >
                A small, fiercely passionate travel studio that believes the best journeys are the ones that catch you off guard — the ones you didn't plan for, but can't stop talking about.
              </motion.p>
              <motion.blockquote
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="pl-5 py-1"
                style={{
                  borderLeft: '3px solid var(--color-accent)',
                  fontFamily: 'var(--font-heading)',
                  fontStyle: 'italic',
                  fontSize: '20px',
                  color: 'var(--color-text)',
                  lineHeight: 1.5,
                }}
              >
                "Every journey begins with a feeling."
              </motion.blockquote>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=700&q=80"
                alt="Team at a travel destination"
                className="w-full object-cover"
                style={{ height: 400 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ OUR STORY ═══ */}
      <section className="py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
              Our Story
            </h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'var(--color-muted)', fontWeight: 300 }}>
              <p>
                Anaghalaxmi Tours started in 2016 as a passionate side project — two friends who kept getting asked "how did you plan that trip?" decided to turn their obsession into a business.
              </p>
              <p>
                We started with 3 packages and a single WhatsApp number. Today, we design 200+ journeys a year across 48 destinations, but the approach hasn't changed: deeply personal, rigorously researched, beautifully executed.
              </p>
              <p>
                We don't work with bus-load tourism operators. Every hotel, restaurant, guide, and experience we recommend has been personally vetted by our team. If we wouldn't do it ourselves, we won't send you there.
              </p>
            </div>
          </motion.div>

          {/* Story Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { year: '2016', label: 'Founded', desc: 'Two friends, one spreadsheet, and a dream to make travel feel personal again.' },
              { year: '2019', label: 'Expanded', desc: 'Grew to 8 destinations and 50+ trips. Opened our first physical studio presence.' },
              { year: '2024', label: 'Today', desc: 'Over 1,200 travelers, 48 destinations, and a team of 9 passionate explorers.' },
            ].map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="p-6 rounded-2xl"
                style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-off-white)' }}
              >
                <span
                  className="text-4xl block mb-2"
                  style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--color-accent)' }}
                >
                  {item.year}
                </span>
                <span className="text-xs uppercase tracking-widest block mb-2" style={{ color: 'var(--color-muted)' }}>
                  {item.label}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)', fontWeight: 300 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="py-20 px-6" style={{ backgroundColor: 'var(--color-bg-dark)' }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
              What We Believe In
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-muted)', fontWeight: 300 }}>
              The principles that guide every journey we design
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl text-center"
                style={{ backgroundColor: 'var(--color-off-white)', border: '1px solid var(--color-border)' }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4"
                  style={{ backgroundColor: 'var(--color-bg-dark)' }}
                >
                  <v.icon size={22} color="var(--color-accent)" />
                </div>
                <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)', fontWeight: 300 }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section className="py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
              The People Behind Your Journeys
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-muted)', fontWeight: 300 }}>
              Small team. Big hearts. Endless passport stamps.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="p-6 rounded-2xl"
                style={{
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-off-white)',
                }}
              >
                <div
                  className="w-16 h-16 flex items-center justify-center text-3xl rounded-full mb-5"
                  style={{ backgroundColor: 'var(--color-bg-dark)' }}
                >
                  {person.emoji}
                </div>
                <h3 className="text-lg mb-0.5" style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
                  {person.name}
                </h3>
                <span className="text-xs uppercase tracking-wider block mb-4" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                  {person.role}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)', fontWeight: 300 }}>
                  {person.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
