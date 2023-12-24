import { OrderProvider } from "../../../../../../context/OrderContext";
import { useAllOrders } from "../../../../../../hooks/order-hook";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

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
      <OrderProvider>
        <div className="h-screen w-full">
        <DataTable data={orders!} columns={columns} />
        </div>
      </OrderProvider>
    </>
  );
}
