"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/auth";
import { useDeliveryById } from "../../../../hooks/user-hook";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { OrderArtisanProvider } from "../../../../context/OrderArtisanContext";
import ShowOrderProduct from "@/app/(artisan)/artisan/[page]/orders/components/showProduct";

export default function Page() {
  const { logout, user } = useAuth({ middleware: "auth" });

  const { data, isLoading } = useDeliveryById(
    Number(user?.delivery_personnel.id)
  );

  if (!user || isLoading) return <div>Loading...</div>;

  return (
    <div>
      <OrderArtisanProvider>
        <DataTable data={data && data.orders ? data.orders.slice().reverse() : []} columns={columns} />
        <ShowOrderProduct />
      </OrderArtisanProvider>
    </div>
  );
}
