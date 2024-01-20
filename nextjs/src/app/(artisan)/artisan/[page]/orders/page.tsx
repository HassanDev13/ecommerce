import { useEffect } from "react";
import {
  OrderArtisanProvider,
  useOrderArtisanContext,
} from "../../../../../../context/OrderArtisanContext";
import { OrderProvider } from "../../../../../../context/OrderContext";
import { useAllOrders } from "../../../../../../hooks/order-hook";
import { useAllDelivery } from "../../../../../../hooks/user-hook";
import Assigned from "./components/assigned";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import DeleteOrder from "./components/delete";
import ShowOrderProduct from "./components/showProduct";

function Orders() {
  const { data: orders, isLoading, isError } = useAllOrders();
  const { data: Delivery , isLoading : isLoadingD } = useAllDelivery();
  const { setDelivery } = useOrderArtisanContext();

  if(!isLoadingD){
    console.log(Delivery);
  }
  useEffect(() => {
    if (Delivery) {
      setDelivery(Delivery);
      console.log(Delivery);
    }
  }, [Delivery, setDelivery]);
 
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      
        <div className="h-screen w-full">
          <DataTable data={orders!} columns={columns} />
          <Assigned />
          <ShowOrderProduct />
          <DeleteOrder />
        </div>
       
    </>
  );
}

export default  function Page() {
  return (
    <OrderArtisanProvider>
        <Orders />
    </OrderArtisanProvider>
  );
};
