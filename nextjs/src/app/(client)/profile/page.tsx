"use client";
import Image from "next/image";
import { useAllOrders } from "../../../../hooks/order-hook";
import { Button } from "@/components/ui/button";
import { formatDateString } from "@/lib/dateFormate";
import ProfileEdit from "@/app/_components/profile_edit";
import {
  ProfileProvider,
  useProfileContext,
} from "../../../../context/profileContext";
import { RatingSheet } from "./rating-sheet";
import { cn } from "@/lib/utils";
import { OrderProvider } from "../../../../context/OrderContext";

const Profile = () => {
  const orders = useAllOrders();
  return (
    <div className="flex min-h-screen w-full">
      <ProfileEdit />
      <div className="flex-[75%]  h-full ">
        <h1 className="text-lg font-bold   p-6">Orders</h1>
        {orders.data?.map((order, index) => (
          <div
            key={index}
            className="flex flex-col justify-start items-start align-baseline space-y-2  p-6"
          >
            <div className="flex justify-between items-center w-full space-y-6 ">
              <div className="flex justify-evenly items-center space-x-4">
                <h1 className="text-lg bg-green-300 rounded-full p-2">
                  {order.order_status}
                </h1>
                <h1 className="text-lg font-bold">Order #{order.id}</h1>
              </div>
              <h1 className="text-lg font-bold">
                {formatDateString(order.created_at)}
              </h1>
            </div>

            <div className="flex  justify-start  space-x-4 overflow-x-auto ">
              {order.products.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-start items-center space-y-2  "
                >
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_URL_IMAGE + product.images[0].path
                    }
                    alt="Picture of the author"
                    className="w-full rounded-lg"
                    width={200}
                    height={200}
                  />
                  <div className="text-left w-full">
                    <h1 className="text-lg font-bold">{product.name}</h1>
                    <h1 className="text-sm">{product.price_per_piece} DA</h1>
                  </div>

                  <ButtonProduct product={product} order={order} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <ProfileProvider>
      <OrderProvider>
        <Profile />
        <RatingSheet />
      </OrderProvider>
    </ProfileProvider>
  );
};

export default Page;

function ButtonProduct({ product, order }: { product: Product; order: Order }) {
  const { setIsRateOpen, setProduct } = useProfileContext();
  return (
    <div className={cn("flex   pb-4 text-left w-full")}>
      <Button
        //disabled={order.order_status=="unprocessed"}
        className="w-full"
        onClick={() => {
          setProduct(product);
          setIsRateOpen(true);
        }}
      >
        Review
      </Button>
    </div>
  );
}
