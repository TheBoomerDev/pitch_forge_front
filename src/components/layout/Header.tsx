import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-sm z-50"  itemScope itemType="https://schema.org/WPHeader">
      <meta name="description" content="PitchForge: Your AI-powered pitch deck generator." />
      <meta property="og:title" content="PitchForge" />
      <meta property="og:description" content="PitchForge: Your AI-powered pitch deck generator." />
      <meta property="og:image" content="/og-image.png" />
      <meta property="og:type" content="website" />
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between"  itemScope itemType="https://schema.org/SiteNavigationElement">
        <Link href="/" className="text-2xl font-bold text-violet-jtc" aria-label="Go to homepage" itemProp="url" itemType="https://schema.org/URL" >
          <span itemProp="name">PitchForge</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#pricing" className="hover:text-violet-jtc" aria-label="View plans" itemProp="url" itemType="https://schema.org/URL">
            <span itemProp="name">Pricing</span>
          </Link>
          <Link href="/how_it_works" className="hover:text-violet-jtc" aria-label="View How It Works" itemProp="url" itemType="https://schema.org/URL">
            <span itemProp="name">How?</span>
          </Link>
          <Link href="/#contact" className="hover:text-violet-jtc" aria-label="View Contact" itemProp="url" itemType="https://schema.org/URL">
            <span itemProp="name">Contact</span>
          </Link>
          <Link href="/#faq" className="hover:text-violet-jtc" aria-label="View FAQ" itemProp="url" itemType="https://schema.org/URL">
            <span itemProp="name">FAQ</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" href="#wait_list"
            className="bg-tea-green text-violet-jtc hover:bg-tea-green/90"
            aria-label="I Want It"
          >
            I Want it
          </Button>
        </div>
      </nav>
    </header>
  )
}
