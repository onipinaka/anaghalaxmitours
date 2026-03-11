import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-footer)', borderTop: '1px solid var(--color-accent)' }}>
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <span
              className="text-2xl tracking-wide block mb-3"
              style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', color: 'var(--color-off-white)' }}
            >
              Anaghalaxmi Tours
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
              Every journey begins with a feeling. We craft travel experiences that move your soul and expand your world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-sm uppercase tracking-widest mb-4"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-body)', fontWeight: 600 }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Packages', path: '/packages' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors duration-300 hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className="text-sm uppercase tracking-widest mb-4"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-body)', fontWeight: 600 }}
            >
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
              <li>
                <a href="tel:+918600669991" className="hover:text-white transition-colors">+91 86006 69991</a>
              </li>
              <li>
                <a href="mailto:anaghalaxmitours21@gmail.com" className="hover:text-white transition-colors">anaghalaxmitours21@gmail.com</a>
              </li>
              <li>Chimanya Ganapathi Chowk, Sadashiv Peth, Pune, Maharashtra 411030</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4
              className="text-sm uppercase tracking-widest mb-4"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-body)', fontWeight: 600 }}
            >
              Follow Us
            </h4>
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-300"
                style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-300"
                style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-300"
                style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                aria-label="YouTube"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)' }}
        >
          <span>© {new Date().getFullYear()} Anaghalaxmi Tours. All rights reserved.</span>
          
        </div>
      </div>
    </footer>
  );
}
