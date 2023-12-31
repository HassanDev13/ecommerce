"use client";
import Link from "next/link";
import Cart from "/public/cart.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "../../../../hooks/auth";
import { Button } from "@/components/ui/button";
import {
  ProductProvider,
  useProductContext,
} from "../../../../context/ProductClientContext";
import { useCardContext } from "../../../../context/CardContext";

const LandPageNavBar: React.FC = () => {
  const hiddenRoutes = ["/login", "/register"];
  const pathname = usePathname();

  const { login, register, user, logout } = useAuth({ middleware: "guest" });
  return (
    <nav className="bg-yellow-400 p-4 flex justify-between items-center w-screen">
      <div>
        <p className="text-black font-bold">Brand Name</p>
      </div>

      <div className="ml-20 text-black font-bold">

        <Link className="ml-20 p-2" href="/">
          {" "}
          Home
        </Link>
        <Link className="p-2" href="/products">
          {" "}
          Products{" "}
        </Link>
        <Link className="p-2" href="/profile">
          {" "}
          Profile{" "}
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <a href="/login">
              <Button className="bg-yellow-400 text-black ml-5 rounded-lg font-bold">
                Login
              </Button>
            </a>

            <a href="/register">
              <Button className="bg-white text-black px-4 py-2 rounded-lg font-bold">
                Register
              </Button>
            </a>
          </>
        ) : (
          <>
            <a href="/logout">
              <Button
                onClick={() => logout()}
                className="bg-white text-black ml-5 rounded-lg font-bold"
              >
                logout
              </Button>
            </a>
          </>
        )}

        <CartIcon hiddenRoutes={hiddenRoutes} pathname={pathname} />
      </div>
    </nav>
  );
};

export default LandPageNavBar;
interface CartIconProps {
  hiddenRoutes: string[];
  pathname: string;
}
function CartIcon({ hiddenRoutes, pathname }: CartIconProps) {
  const { cardProducts, setCardOpen } = useCardContext();
  return (
    <div style={{ position: "relative" }}>
      {!hiddenRoutes.includes(pathname) && (
        <Button
          className="m-0 p-0"
          onClick={() => {
            setCardOpen(true);
          }}
        >
          <Image src={Cart} alt="Your Image" width={30} height={30} />
          <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full p-1">
            {cardProducts === null ? 0 : cardProducts.length}
          </span>
        </Button>
      )}
    </div>
  );
}
