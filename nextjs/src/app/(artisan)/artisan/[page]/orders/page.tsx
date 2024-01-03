import { OrderArtisanProvider } from "../../../../../../context/OrderArtisanContext";
import { OrderProvider } from "../../../../../../context/OrderContext";
import { useAllOrders } from "../../../../../../hooks/order-hook";
import Assigned from "./components/assigned";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import DeleteOrder from "./components/delete";
import ShowOrderProduct from "./components/showProduct";
import UpdateOrder from "./components/showProduct";

export default function Orders() {
  const { data: orders, isLoading, isError } = useAllOrders();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <OrderArtisanProvider>
        <div className="h-screen w-full">
          <DataTable data={orders!} columns={columns} />
          <Assigned />
          <ShowOrderProduct />
          <DeleteOrder/>
        </div>
      </OrderArtisanProvider>
    </>
  );
}
