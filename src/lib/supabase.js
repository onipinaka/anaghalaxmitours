/**
 * ──────────────────────────────────────────────────────────────
 * GOOGLE SHEETS → SUPABASE SYNC (Setup Instructions)
 * ──────────────────────────────────────────────────────────────
 *
 * The owner edits a Google Sheet with one row per package.
 * Column headers must match the Supabase table columns exactly:
 *   id, name, slug, tagline, category, duration, price, image_url,
 *   description, overview, itinerary, included, not_included,
 *   whatsapp_text, featured, active
 *
 * In Apps Script bound to that sheet, create an onChange trigger
 * that calls a syncToSupabase() function:
 *
 * function syncToSupabase() {
 *   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   const data = sheet.getDataRange().getValues();
 *   const headers = data[0];
 *   const rows = data.slice(1).map(row => {
 *     const obj = {};
 *     headers.forEach((h, i) => {
 *       if (h === 'itinerary') obj[h] = JSON.parse(row[i] || '[]');
 *       else if (h === 'featured' || h === 'active') obj[h] = row[i] === true || row[i] === 'TRUE';
 *       else obj[h] = row[i];
 *     });
 *     return obj;
 *   });
 *
 *   const SUPABASE_URL = 'YOUR_SUPABASE_URL';
 *   const SERVICE_ROLE_KEY = 'YOUR_SERVICE_ROLE_KEY';
 *
 *   UrlFetchApp.fetch(SUPABASE_URL + '/rest/v1/packages', {
 *     method: 'POST',
 *     headers: {
 *       'apikey': SERVICE_ROLE_KEY,
 *       'Authorization': 'Bearer ' + SERVICE_ROLE_KEY,
 *       'Content-Type': 'application/json',
 *       'Prefer': 'resolution=merge-duplicates'
 *     },
 *     payload: JSON.stringify(rows)
 *   });
 * }
 *
 * This means every time the owner edits and saves the sheet,
 * Supabase updates automatically within seconds, and the website
 * shows fresh data on next page load.
 * ──────────────────────────────────────────────────────────────
 */

import fallbackData from '../data/fallback.json';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
};

async function supabaseFetch(endpoint) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, { headers });
  if (!res.ok) throw new Error(`Supabase error: ${res.status}`);
  return res.json();
}

export async function getPackages() {
  try {
    return await supabaseFetch('packages?active=eq.true&order=id.asc');
  } catch {
    return { data: fallbackData, isFallback: true };
  }
}

export async function getFeaturedPackages() {
  try {
    return await supabaseFetch(
      'packages?featured=eq.true&active=eq.true&order=featured_order.asc.nullslast&limit=5'
    );
  } catch {
    return {
      data: fallbackData.filter((p) => p.featured).slice(0, 5),
      isFallback: true,
    };
  }
}

export async function getPackageBySlug(slug) {
  try {
    const data = await supabaseFetch(`packages?slug=eq.${slug}&active=eq.true`);
    return data?.[0] || null;
  } catch {
    return {
      data: fallbackData.find((p) => p.slug === slug) || null,
      isFallback: true,
    };
  }
}

export async function getPackagesByCategory(category) {
  try {
    return await supabaseFetch(`packages?category=eq.${category}&active=eq.true&order=id.asc`);
  } catch {
    return {
      data: fallbackData.filter((p) => p.category === category),
      isFallback: true,
    };
  }
}

export { fallbackData };

// ─── Gallery ──────────────────────────────────────────────────────────────────
// Fallback shown when Supabase is unreachable.
// Mirrors the original hardcoded galleryItems in Gallery.jsx.
const galleryFallback = [
  {
    id: 1,
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80',
    video_url: '',
    caption: 'Maldives — Sunset over the Indian Ocean',
    layout: '',
    active: true,
  },
  {
    id: 2,
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=600&q=80',
    video_url: '',
    caption: 'Bali — Rice terrace morning light',
    layout: 'vertical',
    active: true,
  },
  {
    id: 3,
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80',
    video_url: '',
    caption: 'India — The Taj at golden hour',
    layout: '',
    active: true,
  },
  {
    id: 4,
    type: 'video',
    src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=80',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    caption: 'Himalayas — Trek through the clouds',
    layout: '',
    active: true,
  },
  {
    id: 5,
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80',
    video_url: '',
    caption: 'Santorini — Blue domes at sunset',
    layout: 'horizontal',
    active: true,
  },
  {
    id: 6,
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=600&q=80',
    video_url: '',
    caption: 'Rajasthan — Golden sand dunes of Jaisalmer',
    layout: '',
    active: true,
  },
  {
    id: 7,
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80',
    video_url: '',
    caption: 'Japan — Sakura season in Kyoto',
    layout: 'vertical',
    active: true,
  },
  {
    id: 8,
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80',
    video_url: '',
    caption: 'Swiss Alps — Mirror lake reflections',
    layout: '',
    active: true,
  },
  {
    id: 9,
    type: 'video',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    caption: 'Maldives — Overwater villa experience',
    layout: '',
    active: true,
  },
  {
    id: 10,
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
    video_url: '',
    caption: 'Patagonia — Lake cruise through fjords',
    layout: '',
    active: true,
  },
];

export async function getGalleryItems() {
  try {
    return await supabaseFetch('gallery?active=eq.true&order=id.asc');
  } catch {
    return { data: galleryFallback, isFallback: true };
  }
}
