import { useCountUp } from '../../hooks/useCountUp';
import { motion } from 'framer-motion';

const stats = [
  { end: 1200, suffix: '+', label: 'Happy Travelers' },
  { end: 48, suffix: '', label: 'Destinations' },
  { end: 8, suffix: '', label: 'Years of Experience' },
  { end: 100, suffix: '%', label: 'Tailored Trips' },
];

function StatItem({ end, suffix, label }) {
  const { count, ref } = useCountUp(end);
  return (
    <div ref={ref} className="flex flex-col items-center text-center py-6 px-4">
      <span
        className="text-3xl md:text-4xl mb-1"
        style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--color-text)' }}
      >
        {count}{suffix}
      </span>
      <span
        className="text-xs uppercase tracking-widest"
        style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)', fontWeight: 400 }}
      >
        {label}
      </span>
    </div>
  );
}

export default function StatsBar() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className="w-full"
      style={{ backgroundColor: 'var(--color-bg-dark)' }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex"
              style={{
                borderRight: i < stats.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              <StatItem {...stat} />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
