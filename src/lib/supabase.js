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
