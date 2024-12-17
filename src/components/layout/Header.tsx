import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-violet-jtc">
          PitchAI
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/planes" className="hover:text-violet-jtc">Plans</Link>
          <Link href="/casos-exito" className="hover:text-violet-jtc">Success Stories</Link>
          <Link href="/blog" className="hover:text-violet-jtc">Blog</Link>
          <Link href="/faq" className="hover:text-violet-jtc">FAQ</Link>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost"
            className="bg-tea-green text-violet-jtc hover:bg-tea-green/90"
          >
            Try for Free
          </Button>
        </div>
      </nav>
    </header>
  )
}
