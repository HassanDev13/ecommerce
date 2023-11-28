// components/Navbar.tsx
import Link from 'next/link';

const LandPageNavBar: React.FC = () => {
  return (
    <nav className="bg-yellow-400 p-4 flex justify-between items-center">

      <div>
         <p className="text-black font-semibold">Brand Name</p>
      </div>

      <div className="text-center text-black font-bold">
            <Link className='ml-20 p-2' href="/"> Home</Link>
            <Link className='p-2 ' href="#"> Products </Link>
            <Link className='p-2' href="#"> Artisans </Link>
            <Link className='p-2' href="#"> Profile </Link>
      </div>

      <div className="flex items-center space-x-4">
        <button className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold">Login</button>
        <button className="bg-white text-black px-4 py-2 rounded-full font-semibold">Register</button>
      </div>
    </nav>
  );
};

export default LandPageNavBar;
