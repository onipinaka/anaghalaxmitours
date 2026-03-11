import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import EnquiryForm from '../components/ui/EnquiryForm';

const watermarkText = 'Bali · Santorini · Kyoto · Maldives · Rajasthan · Alps · Patagonia · ';

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="page-wrapper"
      style={{ paddingTop: 72 }}
    >
      <section className="py-16 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="relative overflow-hidden">
              {/* Watermark */}
              <div
                className="absolute inset-0 flex flex-wrap gap-4 text-4xl font-bold pointer-events-none select-none"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-accent)',
                  opacity: 0.04,
                  lineHeight: 1.4,
                  wordBreak: 'break-all',
                }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i}>{watermarkText}</span>
                ))}
              </div>

              <div className="relative z-10">
                <motion.blockquote
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-12"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(28px, 4vw, 42px)',
                    fontWeight: 500,
                    color: 'var(--color-text)',
                    lineHeight: 1.3,
                  }}
                >
                  "Let's turn your dream trip into a departure date."
                </motion.blockquote>

                <div className="space-y-5">
                  <motion.a
                    href="tel:+918600669991"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="flex items-center gap-4 group"
                  >
                    <div
                      className="w-11 h-11 flex items-center justify-center rounded-full transition-colors duration-300"
                      style={{ border: '1px solid var(--color-border)' }}
                    >
                      <Phone size={18} color="var(--color-accent)" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest block" style={{ color: 'var(--color-muted)' }}>
                        Phone
                      </span>
                      <span className="text-sm font-medium group-hover:underline">+91 86006 69991</span>
                    </div>
                  </motion.a>

                  <motion.a
                    href="mailto:anaghalaxmitours21@gmail.com"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex items-center gap-4 group"
                  >
                    <div
                      className="w-11 h-11 flex items-center justify-center rounded-full transition-colors duration-300"
                      style={{ border: '1px solid var(--color-border)' }}
                    >
                      <Mail size={18} color="var(--color-accent)" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest block" style={{ color: 'var(--color-muted)' }}>
                        Email
                      </span>
                      <span className="text-sm font-medium group-hover:underline">anaghalaxmitours21@gmail.com</span>
                    </div>
                  </motion.a>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <div
                      className="w-11 h-11 flex items-center justify-center rounded-full"
                      style={{ border: '1px solid var(--color-border)' }}
                    >
                      <MapPin size={18} color="var(--color-accent)" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest block" style={{ color: 'var(--color-muted)' }}>
                        City
                      </span>
                      <span className="text-sm font-medium">Chimanya Ganapathi Chowk, Sadashiv Peth, Pune, Maharashtra 411030</span>
                    </div>
                  </motion.div>
                </div>

                {/* WhatsApp CTA */}
                <motion.a
                  href="https://wa.me/918600669991"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm tracking-wide transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: '#25D366',
                    color: '#fff',
                    fontWeight: 500,
                  }}
                >
                  <MessageCircle size={18} fill="#fff" />
                  Chat on WhatsApp
                </motion.a>
              </div>
            </div>

            {/* Right Column — Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="p-6 md:p-8 rounded-2xl"
              style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-off-white)' }}
            >
              <h2
                className="text-2xl mb-6"
                style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}
              >
                Send Us an Enquiry
              </h2>
              <EnquiryForm source="Contact Page" />
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
