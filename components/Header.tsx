import Image from "next/image";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`${isScrolled && 'bg-primary'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <Image
          src="https://rb.gy/ulxxee"
          width={100}
          height={50}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="navLink">Home</li>
          <li className="navLink">TV Shows</li>
          <li className="navLink">Movies</li>
          <li className="navLink">New & Popular</li>
          <li className="navLink">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <MagnifyingGlassIcon className="hidden sm:inline h-6 w-6 cursor-pointer" />
        <p className="hidden lg:inline cursor-pointer text-lg font-regular">Kids</p>
        <BellIcon className="h-6 w-6 cursor-pointer" />
        <div>
          <Link href="/account">
            <Image
              src="https://rb.gy/g1pwyx"
              height={32}
              width={32}
              alt=""
              className="cursor-pointer rounded"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
