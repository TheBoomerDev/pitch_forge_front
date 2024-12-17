import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Facebook, Twitter, Instagram } from 'lucide-react'

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" }
]

const quickLinks = [
  { text: "Privacy Policy", href: "#" },
  { text: "Terms and Conditions", href: "#" },
  { text: "Contact", href: "#" }
]

export default function Footer() {
  return (
    <footer className="bg-violet-jtc text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.text}>
                  <Link href={link.href} className="hover:text-tea-green transition-colors">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="hover:text-tea-green transition-colors"
                  aria-label={social.label}
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
                className="px-4 py-2 rounded-md bg-white/10 text-white placeholder:text-white/60 flex-grow"
              />
              <Button className="bg-tea-green text-violet-jtc hover:bg-tea-green/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm">
          <p>© {new Date().getFullYear()} PitchAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
