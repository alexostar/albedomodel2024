'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { siteConfig } from '@/config/site';

import { Lock } from 'lucide-react';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='ghost' className='w-10 px-0 '>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle Theme</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <MobileLink
          onOpenChange={setOpen}
          href='/'
          className='flex items-center'>
          {/*<Icons.logo className='mr-2 h-4 w-4' />*/}
          <span className='font-bold'>{siteConfig.name}</span>
        </MobileLink>
        <div className='flex items-center justify-between pt-4 pl-2'>
          <MobileLink onOpenChange={setOpen} href='/blog/heimildir'>
            Heimildir
          </MobileLink>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between mt-4 pl-2 text-gray-500'>
            <p className=''>Útreikningar</p>
          </div>
          <div className='flex items-center justify-between pl-4'>
            <MobileLink
              onOpenChange={setOpen}
              href='/blog/reiknilikan-1-geislunarthvingun'>
              Geislunarþvingun
            </MobileLink>
          </div>
          <div className='flex items-center justify-between pl-4'>
            <MobileLink
              onOpenChange={setOpen}
              href='/blog/reiknilikan-2-co2igildi'>
              CO<sub>2</sub> ígildi endurskinsbreytinga
            </MobileLink>
          </div>
          <div className='flex items-center justify-between pl-4'>
            <MobileLink
              onOpenChange={setOpen}
              href='/blog/reiknilikan-3-matrix'>
              Fylki CO<sub>2</sub> brotthvarfs
            </MobileLink>
          </div>
          <div className='flex items-center justify-between mt-4 pl-2 text-gray-500'>
            <p className=''>Gögn</p>
          </div>
          <div className='flex items-center justify-between pl-4'>
            <MobileLink onOpenChange={setOpen} href='/albedo/model/matrices'>
              100x100 CO<sub>2</sub> fylki
            </MobileLink>
          </div>
          <div className='flex items-center justify-between pl-4'>
            <MobileLink
              onOpenChange={setOpen}
              href='/albedo/workarea/stations-rawdata'>
              Veðurstöðvar og snjóþekja (Grunngögn)
            </MobileLink>
          </div>
          <div className='flex items-center justify-between pl-4'>
            <MobileLink
              onOpenChange={setOpen}
              href='/albedo/workarea/carbon-stations'>
              Veðurstöðvar og kolefnisræktarverkefni
            </MobileLink>
          </div>
          <div className='flex items-center justify-between pl-4'>
            <MobileLink
              onOpenChange={setOpen}
              href='/albedo/model/stations-rf-tdee'>
              Tafla: RF og TDEE
            </MobileLink>
            {/*<Lock className='h-4 w-4' />*/}
          </div>

          {/*
          <div className='flex items-center justify-between pl-2'>
            <a
              href='https://felagar.natturuvinir.is/s/xMTLajW5sqSXLg3'
              target='_blanc'>
              Documents (External link)
            </a>
            <Lock className='h-4 w-4' />
          </div>
 */}
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={className}
      {...props}>
      {children}
    </Link>
  );
}
