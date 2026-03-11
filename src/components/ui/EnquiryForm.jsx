/**
 * ──────────────────────────────────────────────────────────────
 * GOOGLE APPS SCRIPT — Paste this into your Apps Script editor
 * ──────────────────────────────────────────────────────────────
 *
 * function doPost(e) {
 *   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   const data = JSON.parse(e.postData.contents);
 *   sheet.appendRow([
 *     data.timestamp, data.source, data.name, data.email,
 *     data.phone, data.package, data.date, data.travelers,
 *     data.budget, data.hearAbout, data.message
 *   ]);
 *   return ContentService.createTextOutput('OK');
 * }
 *
 * Deploy as Web App with "Anyone" access. Copy the URL below.
 * ──────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { usePackages } from '../../hooks/usePackages';

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

const budgetOptions = ['Under ₹30k', '₹30k–₹60k', '₹60k–₹1L', 'Above ₹1L'];
const hearAboutOptions = ['Google Search', 'Instagram', 'Friend/Family', 'Travel Blog', 'Other'];

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  package: '',
  date: '',
  travelers: '',
  budget: '',
  hearAbout: '',
  message: '',
};

export default function EnquiryForm({ source = 'Contact Page' }) {
  const [searchParams] = useSearchParams();
  const { packages } = usePackages();
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState(null); // 'success' | 'error'

  useEffect(() => {
    const pkgSlug = searchParams.get('package');
    if (pkgSlug) {
      setForm((prev) => ({ ...prev, package: pkgSlug }));
    }
  }, [searchParams]);

  const validate = (field, value) => {
    const errs = { ...errors };
    if (field === 'name' && !value.trim()) errs.name = 'Full name is required';
    else if (field === 'name') delete errs.name;

    if (field === 'email') {
      if (!value.trim()) errs.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errs.email = 'Enter a valid email';
      else delete errs.email;
    }

    if (field === 'phone') {
      if (!value.trim()) errs.phone = 'Phone number is required';
      else if (!/^[\d\s+\-()]{8,15}$/.test(value)) errs.phone = 'Enter a valid phone number';
      else delete errs.phone;
    }

    setErrors(errs);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    validate(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString(),
          source,
        }),
      });
      setSubmitState('success');
      setTimeout(() => {
        setSubmitState(null);
        setForm(initialFormState);
      }, 3000);
    } catch {
      setSubmitState('error');
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {submitState === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <motion.svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              className="mb-4"
            >
              <circle cx="32" cy="32" r="30" stroke="var(--color-accent)" strokeWidth="2" />
              <motion.path
                d="M20 32 L28 40 L44 24"
                stroke="var(--color-accent)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
            </motion.svg>
            <h3
              className="text-xl mb-2"
              style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}
            >
              Thank You!
            </h3>
            <p className="text-sm" style={{ color: 'var(--color-muted)', fontWeight: 300 }}>
              We'll reach out within 24 hours ✦
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {submitState === 'error' && (
              <div
                className="p-3 rounded-lg flex items-center justify-between text-sm"
                style={{ backgroundColor: '#fdeaea', border: '1px solid #c0392b', color: '#c0392b' }}
              >
                <span>Something went wrong. Please try again.</span>
                <button
                  type="button"
                  onClick={() => setSubmitState(null)}
                  className="underline text-xs"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Name */}
            <div className="float-label">
              <input
                type="text"
                name="name"
                placeholder=" "
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.name ? 'error-input' : ''}
              />
              <label>Full Name *</label>
              {errors.name && <p className="error-msg">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="float-label">
              <input
                type="email"
                name="email"
                placeholder=" "
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email ? 'error-input' : ''}
              />
              <label>Email *</label>
              {errors.email && <p className="error-msg">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="float-label">
              <input
                type="tel"
                name="phone"
                placeholder=" "
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.phone ? 'error-input' : ''}
              />
              <label>Phone *</label>
              {errors.phone && <p className="error-msg">{errors.phone}</p>}
            </div>

            {/* Package Dropdown */}
            <div className="float-label">
              <select
                name="package"
                value={form.package}
                onChange={handleChange}
                required
              >
                <option value="">Select a package</option>
                {packages.map((pkg) => (
                  <option key={pkg.slug} value={pkg.slug}>{pkg.name}</option>
                ))}
                <option value="custom">✦ Custom / Something Else</option>
              </select>
              <label>Package</label>
            </div>

            {/* Date + Travelers */}
            <div className="grid grid-cols-2 gap-4">
              <div className="float-label">
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  min={today}
                  placeholder=" "
                />
                <label>Travel Date</label>
              </div>
              <div className="float-label">
                <input
                  type="number"
                  name="travelers"
                  placeholder=" "
                  min="1"
                  max="20"
                  value={form.travelers}
                  onChange={handleChange}
                />
                <label>Travelers</label>
              </div>
            </div>

            {/* Budget + Hear */}
            <div className="grid grid-cols-2 gap-4">
              <div className="float-label">
                <select name="budget" value={form.budget} onChange={handleChange} required>
                  <option value="">Budget</option>
                  {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                <label>Budget Range</label>
              </div>
              <div className="float-label">
                <select name="hearAbout" value={form.hearAbout} onChange={handleChange} required>
                  <option value="">How did you hear?</option>
                  {hearAboutOptions.map((h) => <option key={h} value={h}>{h}</option>)}
                </select>
                <label>Heard About Us</label>
              </div>
            </div>

            {/* Message */}
            <div className="float-label">
              <textarea
                name="message"
                rows={4}
                placeholder=" "
                value={form.message}
                onChange={handleChange}
                style={{ resize: 'none' }}
              />
              <label>Message</label>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={submitting}
              className="relative w-full py-3 text-sm tracking-wide rounded-lg overflow-hidden"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                color: 'var(--color-off-white)',
                backgroundColor: 'var(--color-accent)',
                opacity: submitting ? 0.7 : 1,
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {submitting ? 'Sending...' : 'Send Enquiry'}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
