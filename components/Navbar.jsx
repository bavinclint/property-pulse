'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import profileDefault from '@/assets/images/profile.png';
import dropdown from '@/assets/images/dropdown.svg';
import menu from '@/assets/images/menu.svg';
import closeMenu from '@/assets/images/close-menu.svg';
import { FaGoogle } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import UnreadMessageCount from './UnreadMessageCount';

const Navbar = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);
  // const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    setAuthProviders();

    // NOTE: close mobile menu if the viewport size is changed
    window.addEventListener('resize', () => {
      setIsMobileMenuOpen(false);
    });
  }, []);

  // NOTE: the aria-expanded attribute value should change with state for
  // correct a11y

  const handleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className='fixed z-50 top-0 w-full navbar-default mx-auto pt-2 px-4'>
      {/* Flex container */}
      <div className='relative flex items-center justify-between'>
        <div
          onClick={handleMenu}
          className='absolute inset-y-0 left-0 px-2 flex items-center xl:hidden'
        >
          {/* Mobile menu button */}
          <div className='relative inline-flex items-center justify-center'>
            {isMobileMenuOpen == true ? (
              <Image className='block w-8' src={closeMenu} alt='' />
            ) : (
              <Image className='block w-8' src={menu} alt='' />
            )}
          </div>
        </div>
        {/* Logo */}
        <div className='flex flex-1 items-center justify-center xl:items-stretch xl:justify-start'>
          <div className='flex flex-shrink-0 items-center'>
            {/* <img src="img/logo.png" alt="" /> */}
            <Link
              className='font-lora text-black text-[1.8rem] hover:text-main font-semibold'
              href='/'
            >
              Livern
            </Link>
          </div>
        </div>
        {/* Menu Items */}
        <div className='xl:flex hidden pr-28 tracking-[0.04em] text-[1rem] text-black space-x-6 font-semibold'>
          <Link
            className={`${
              pathname === '/' ? 'after:scale-x-100' : ''
            } nav-link`}
            href='/'
          >
            Home
          </Link>
          <Link
            className={`${
              pathname === '/about' ? 'after:scale-x-100' : ''
            } nav-link`}
            href='/about'
          >
            About
          </Link>
          <Link
            className={`${
              pathname === '/services' ? 'after:scale-x-100' : ''
            } nav-link`}
            href='/services'
          >
            Services
          </Link>
          <Link
            className={`${
              pathname === '/properties' ? 'after:scale-x-100' : ''
            } nav-link`}
            href='/properties'
          >
            Properties
          </Link>
          <Link
            className={`${
              pathname === '/blog' ? 'after:scale-x-100' : ''
            } nav-link`}
            href='/blog'
          >
            Blog
          </Link>
          <div
            className={`${
              pathname === '' ? 'after:scale-x-100' : ''
            } nav-link dropdown group`}
          >
            <div className='flex'>
              <Link href=''>Development</Link>
              <Image className='w-6' src={dropdown} alt='' />
            </div>
            <div
              id='user-menu'
              className='hidden group-hover:block absolute z-10 rounded-md shadow-[0_2px_rgba(17,16,15,0.1),0_2px_10px_rgba(20,19,18,0.1)] border-l-0 bg-white border-t-4 border-t-main border-solid mt-1'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='user-menu-button'
              tabIndex={-1}
            >
              <Link
                href='/profile'
                className='dropdown-item'
                role='menuitem'
                tabIndex={-1}
                id='user-menu-item-0'
              >
                Property Single
              </Link>
              <Link
                href='/properties/saved'
                className='dropdown-item'
                role='menuitem'
                tabIndex={-1}
                id='user-menu-item-2'
              >
                Blog Single
              </Link>
              <Link
                href='/properties/saved'
                className='dropdown-item'
                role='menuitem'
                tabIndex={-1}
                id='user-menu-item-2'
              >
                Agents Grid
              </Link>
              <Link
                href='/properties/saved'
                className='dropdown-item'
                role='menuitem'
                tabIndex={-1}
                id='user-menu-item-2'
              >
                Agent Single
              </Link>
            </div>
          </div>
          {session && (
            <Link
              className={`${
                pathname === '/properties/add' ? 'after:scale-x-100' : ''
              } nav-link`}
              href='/properties/add'
            >
              Add Property
            </Link>
          )}
          <Link
            className={`${
              pathname === '/contact' ? 'after:scale-x-100' : ''
            } nav-link`}
            href='/contact'
          >
            Contact
          </Link>

          <Link className='pt-2 ' href='/About'>
            <IoSearch size={20} />
          </Link>
        </div>
        <Link className='px-2 xl:hidden' href='/About'>
          <IoSearch size={20} />
        </Link>

        {/* Right Side Menu (Logged Out) */}
        {!session && (
          <div className='hidden xl:block'>
            <div className='flex items-center'>
              {providers &&
                Object.values(providers).map((provider, index) => (
                  <button
                    onClick={() => signIn(provider.id)}
                    key={index}
                    className='flex items-center font-lora font-semibold tracking-[0.04em] text-white bg-minorSecond hover:bg-mainSecond hover:text-white rounded-md px-2 py-1'
                  >
                    <FaGoogle className='text-white mr-2' />
                    <span>Login or Register</span>
                  </button>
                ))}
            </div>
          </div>
        )}
        {/* Right Side Menu (Logged In) */}
        {session && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0'>
            <Link href='/messages' className='relative group'>
              <button
                type='button'
                className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
              >
                <span className='absolute -inset-1.5' />
                <span className='sr-only'>View notifications</span>
                <svg
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
                  />
                </svg>
              </button>
              <UnreadMessageCount session={session} />
            </Link>
            {/* Profile dropdown button */}
            <div className='relative ml-3'>
              <div>
                <button
                  type='button'
                  className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                  id='user-menu-button'
                  aria-expanded='false'
                  aria-haspopup='true'
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                >
                  <span className='absolute -inset-1.5' />
                  <span className='sr-only'>Open user menu</span>
                  <Image
                    className='h-8 w-8 rounded-full'
                    src={profileDefault}
                    alt=''
                  />
                </button>
              </div>
              {/* Profile dropdown */}
              {isProfileMenuOpen && (
                <div
                  id='user-menu'
                  className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-[0_2px_rgba(17,16,15,0.1),0_2px_10px_rgba(20,19,18,0.1)] border-l-0 border-t-4 border-t-main border-solid'
                  role='menu'
                  aria-orientation='vertical'
                  aria-labelledby='user-menu-button'
                  tabIndex={-1}
                >
                  <Link
                    href='/profile'
                    className='dropdown-item'
                    role='menuitem'
                    tabIndex={-1}
                    id='user-menu-item-0'
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                    }}
                  >
                    Your Profile
                  </Link>
                  <Link
                    href='/properties/saved'
                    className='dropdown-item'
                    role='menuitem'
                    tabIndex={-1}
                    id='user-menu-item-2'
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                    }}
                  >
                    Saved Properties
                  </Link>
                  <Link
                    href=''
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      signOut();
                    }}
                    className='dropdown-item'
                    role='menuitem'
                    tabIndex={-1}
                    id='user-menu-item-2'
                  >
                    Sign Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      {isMobileMenuOpen && (
        <div className='xl:hidden bg-white' id='mobile-menu'>
          <div className='space-y-1 px-2 pb-3 pt-2'>
            <Link
              href='/'
              className={`${
                pathname === '/' ? 'after:scale-x-100' : ''
              } nav-link text-black block py-2 text-base font-semibold`}
            >
              Home
            </Link>
            <Link
              href='/About'
              className={`${
                pathname === '/About' ? 'hover:after:scale-x-100' : ''
              } nav-link text-black block py-2 text-base font-semibold`}
            >
              About
            </Link>
            <Link
              href='/Services'
              className={`${
                pathname === '/Services' ? 'hover:after:scale-x-100' : ''
              } nav-link text-black block py-2 text-base font-semibold`}
            >
              Services
            </Link>
            <Link
              href='/properties'
              className={`${
                pathname === '/properties' ? 'after:scale-x-100' : ''
              } nav-link text-black block py-2 text-base font-semibold`}
            >
              Properties
            </Link>
            <div
              className={`${
                pathname === '' ? 'after:scale-x-100' : ''
              } nav-link text-black block py-2 text-base font-semibold dropdown group`}
            >
              <div
                className='flex'
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                <Link href=''>Development</Link>
                <Image className='w-6' src={dropdown} alt='' />
              </div>
              {isDropdownOpen && (
                <div
                  id='user-menu'
                  className='absolute z-10 rounded-md shadow-[0_2px_rgba(17,16,15,0.1),0_2px_10px_rgba(20,19,18,0.1)] border-t-0 bg-white border-l-4 border-l-main border-solid ml-1'
                  role='menu'
                  aria-orientation='vertical'
                  aria-labelledby='user-menu-button'
                  tabIndex={-1}
                >
                  <Link
                    href='/profile'
                    className='dropdown-item'
                    role='menuitem'
                    tabIndex={-1}
                    id='user-menu-item-0'
                  >
                    Property Single
                  </Link>
                  <Link
                    href='/properties/saved'
                    className='dropdown-item'
                    role='menuitem'
                    tabIndex={-1}
                    id='user-menu-item-2'
                  >
                    Blog Single
                  </Link>
                  <Link
                    href='/properties/saved'
                    className='dropdown-item'
                    role='menuitem'
                    tabIndex={-1}
                    id='user-menu-item-2'
                  >
                    Agents Grid
                  </Link>
                  <Link
                    href='/properties/saved'
                    className='dropdown-item'
                    role='menuitem'
                    tabIndex={-1}
                    id='user-menu-item-2'
                  >
                    Agent Single
                  </Link>
                </div>
              )}
            </div>

            {session && (
              <Link
                href='/properties/add'
                className={`${
                  pathname === '/properties/add'
                    ? 'hover:after:scale-x-100'
                    : ''
                } nav-link text-black block py-2 text-base font-semibold`}
              >
                Add Property
              </Link>
            )}
            <Link
              href='/Contact'
              className={`${
                pathname === '/Contact' ? 'hover:after:scale-x-100' : ''
              } nav-link text-black block py-2 text-base font-semibold`}
            >
              Contact
            </Link>
            {!session &&
              providers &&
              Object.values(providers).map((provider, index) => (
                <button
                  onClick={() => signIn(provider.id)}
                  key={index}
                  className='flex items-center text-white bg-mainSecond hover:bg-minorSecond hover:text-gray-800 rounded-md px-3 py-2 my-4 font-semibold'
                >
                  <FaGoogle className='text-white mr-2' />
                  <span>Login or Register</span>
                </button>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
