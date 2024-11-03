'use client';

import { siteConfig } from '@/config/site';
import { Icons } from './icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function MainNav() {
  const pathname = usePathname();
  return (
    <nav className='flex items-center space-x-4 lg:space-x-6'>
      <Link href='/' className='mr-6 font-bold tracking-widest'>
        <p className='text-primary'>
          Skógrækt <span className='text-foreground'>og endurskin</span>
        </p>
      </Link>
      <Link
        href='/blog'
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary hidden ',
          pathname === '/blog' ? 'text-foreground' : 'text-foreground/60 '
        )}>
        Blog
      </Link>
      <Link
        href='/about'
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary hidden ',
          pathname === '/about' ? 'text-foreground' : 'text-foreground/60 '
        )}>
        About
      </Link>
    </nav>
  );
}
