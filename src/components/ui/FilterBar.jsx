import { Search } from 'lucide-react';

const categories = ['All', 'Adventure', 'Honeymoon', 'Cultural', 'Beach', 'Mountains'];
const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-low', label: 'Price: Low–High' },
  { value: 'price-high', label: 'Price: High–Low' },
  { value: 'duration', label: 'Duration' },
];

export default function FilterBar({ activeCategory, onCategoryChange, sortBy, onSortChange, searchQuery, onSearchChange }) {
  return (
    <div
      className="sticky top-[72px] z-30 py-4"
      style={{
        backgroundColor: 'rgba(245,240,232,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 flex-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className="px-4 py-1.5 text-xs tracking-wide rounded-full transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  backgroundColor: activeCategory === cat ? 'var(--color-accent)' : 'transparent',
                  color: activeCategory === cat ? 'var(--color-off-white)' : 'var(--color-muted)',
                  border: activeCategory === cat ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort + Search */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-2 text-xs rounded-lg outline-none"
              style={{
                fontFamily: 'var(--font-body)',
                backgroundColor: 'var(--color-off-white)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <div className="relative flex-1 md:w-48">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" color="var(--color-muted)" />
              <input
                type="text"
                placeholder="Search packages..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs rounded-lg outline-none"
                style={{
                  fontFamily: 'var(--font-body)',
                  backgroundColor: 'var(--color-off-white)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
