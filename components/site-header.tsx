import { MainNav } from './main-nav';
import { MobileNav } from './mobile-nav';
import { ModeToggle } from './mode-toggle';
import UserDropDown from './user-dropdown';

export function SiteHeader() {
  return (
    <header className='z-4000 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 max-w-screen-2xl items-center'>
        <div className='flex flex-1 items-center justify-start'>
          <MobileNav />
          <MainNav />
        </div>
        <div className='flex flex-1 items-center justify-end '>
          <nav className='flex items-center space-x-2'>
            <UserDropDown />
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
