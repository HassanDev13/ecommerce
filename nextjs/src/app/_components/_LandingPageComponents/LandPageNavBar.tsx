'use client'
import Link from 'next/link';
import Cart from "/public/cart.svg";
import Image from 'next/image';
import { usePathname  } from 'next/navigation';

const LandPageNavBar: React.FC = () => {
  const hiddenRoutes = ['/login', '/register'];
  const pathname = usePathname()


  return (
    <nav className="bg-yellow-400 p-4 flex justify-between items-center">

      <div>
        <p className="text-black font-bold">Brand Name</p>
      </div>

      <div className="ml-20 text-black font-bold">
        <Link className='ml-20 p-2' href="/"> Home</Link>
        <Link className='p-2' href="#"> Products </Link>
        <Link className='p-2' href="#"> Artisans </Link>
        <Link className='p-2' href="#"> Profile </Link>
      </div>

      <div className="flex items-center space-x-4">
        <a href="/login">
          <button className="bg-yellow-400 text-black ml-5 rounded-lg font-bold">Login</button>
        </a>

        <a href="/register">
          <button className="bg-white text-black px-4 py-2 rounded-lg font-bold">Register</button>
        </a>

        <div>
          {!hiddenRoutes.includes(pathname) && (
            <a href="#">
              <Image src={Cart} alt="Your Image" width={30} height={30} />
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LandPageNavBar;
