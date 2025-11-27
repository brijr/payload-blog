import { Button } from '@/components/ui/button'
import { Nav } from '@/components/ds'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/public/logo.svg'

export const Header = () => {
  return (
    <Nav
      className="border-b sticky top-0 bg-accent/30 backdrop-blur-md"
      containerClassName="flex justify-between items-center gap-4"
    >
      <Link href="/" className="flex gap-3 items-center">
        <Image src={Logo} width={14} alt="Blog" className="invert dark:invert-0" />
        <h3 className="sm:text-lg">Blog</h3>
      </Link>
      <div className="flex gap-2">
        <Button asChild variant="ghost">
          <Link href="/blog">Blog</Link>
        </Button>
      </div>
    </Nav>
  )
}
