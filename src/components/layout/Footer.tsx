import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Facebook, Twitter, Instagram } from 'lucide-react'
import ScriptsPage from './ScriptPage'

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" }
]

const quickLinks = [
  { text: "Privacy Policy", href: "/privacy" , label: "Privacy Policy"},
  { text: "Terms and Conditions", href: "/terms", label: "Terms and Conditions" },
  { text: "Cookies Policy", href: "/cookies", label: "Cookies Policy" },
  { text: "Contact", href: "/contact", label: "Contact" }
]

export default function Footer() {
  return (
    <footer className="bg-violet-jtc text-gray-800 py-12" itemScope itemType="https://schema.org/WPFooter">
        <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "PitchForge",
            "url": "https://PitchForge.com",
            "logo": "https://PitchForge.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "info@PitchForge.com",
              "contactType": "customer service"
            }
          }
        `}
      </script>
      <div className="container mx-auto px-4 text-gray-800">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div itemScope itemType="https://schema.org/SiteNavigationElement">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.text}>
                  <Link href={link.href} className="hover:text-tea-green transition-colors" aria-label={link.label} itemProp="url" itemType="https://schema.org/URL">
                    <span itemProp="name">{link.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div itemScope itemType="https://schema.org/SiteNavigationElement">
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="hover:text-tea-green transition-colors"
                  aria-label={social.label}
                  itemProp="url" itemType="https://schema.org/URL"
                >
                  <social.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-md bg-white/10 text-gray-800 placeholder:text-gray-800/60 flex-grow"
              />
              <Button className="bg-tea-green text-violet-jtc hover:bg-tea-green/90" aria-label="Subscribe to newsletter">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm">
          <p>© {new Date().getFullYear()} PitchForge. All rights reserved.</p>
        </div>
      </div>

      <ScriptsPage />
    </footer>
  )
}
