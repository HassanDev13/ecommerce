"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useOrderContext } from "../../../../../../../context/OrderContext";
import { useOrderArtisanContext } from "../../../../../../../context/OrderArtisanContext";

const getStatusColor = (status: OrderStatus) => {
  const colorMap = {
    unprocessed: "bg-gray-500",
    accepted: "bg-green-500",
    refused: "bg-red-500",
    assigned: "bg-blue-500",
    sent: "bg-yellow-500",
    delivered: "bg-purple-500",
  };

  return colorMap[status] || "bg-gray-500";
};

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "order_status",
    header: "Order status",
    cell: ({ row }) => (
      <div
        className={`capitalize w-fit font-bold p-2 text-white rounded-full ${getStatusColor(
          row.getValue("order_status")
        )}`}
      >
        {row.getValue("order_status")}
      </div>
    ),
  },
  {
    accessorKey: "Name",
    header: "consumer Name",
    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <div className="capitalize">{rowData.consumer.user.first_name}</div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone ",
    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <div className="capitalize">{rowData.consumer.user.phone_number}</div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Order date",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("created_at")}</div>
    ),
  },
  {
    accessorKey: "delivery_personnel",
    header: () => <div className="text-right">delivery Personnel</div>,
    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <div className="text-right font-medium">
          {rowData.delivery_personnel ? (
            rowData.delivery_personnel_id
          ) : (
            <span className="text-red-500">Not assigned</span>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const rowData = row.original;

      const {
        changeStatus,
        setIsAssignedOrderArtisanOpen,
        setIsShowOrderProductOpen,
        setOrderArtisan,
        isDeleteDialogOpen,
        setIsDeleteDialogOpen,
        // eslint-disable-next-line react-hooks/rules-of-hooks
      } = useOrderArtisanContext();
      switch (rowData.order_status) {
        case "unprocessed":
        case "refused":
          return (
            <div className="flex space-x-2">
              <Button
                className="w-full"
                onClick={() => {
                  setOrderArtisan(rowData);
                  setIsAssignedOrderArtisanOpen(true);
                }}
              >
                Assign
              </Button>
              <Button
                className="w-full"
                onClick={() => {
                  setOrderArtisan(rowData);
                  setIsShowOrderProductOpen(true);
                }}
              >
                Show Products
              </Button>
              <Button
                className="w-full"
                onClick={() => {
                  setOrderArtisan(rowData);
                  setIsDeleteDialogOpen(true);
                }}
              >
                Cancel Order
              </Button>
            </div>
          );
        case "accepted":
        case "assigned":
        case "sent":
          return (
            <Button
              className="w-full"
              onClick={() => changeStatus(rowData, "delivered")}
            >
              Deliver
            </Button>
          );
        case "delivered":
          return (
            <div className="flex justify-end">
              <Button
                className="w-fit"
                onClick={() => {
                  setOrderArtisan(rowData);
                  setIsShowOrderProductOpen(true);
                }}
              >
                Show Products
              </Button>
            </div>
          );
        default:
          return <></>;
      }
    },
  },
];
