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
import { useOrderArtisanContext } from "../../../../../context/OrderArtisanContext";
import { toast } from "@/components/ui/use-toast";

const getStatusColor = (status : OrderStatus) => {
  const colorMap = {
    unprocessed: 'bg-gray-500',
    accepted: 'bg-green-500',
    refused: 'bg-red-500',
    assigned: 'bg-blue-500',
    sent: 'bg-yellow-500',
    delivered: 'bg-purple-500',
  };

  return colorMap[status] || 'bg-gray-500';
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
    accessorKey: "name",
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
    accessorKey: 'order_status',
    header: 'Order status',
    cell: ({ row }) => (
      <div
        className={`capitalize w-fit font-bold p-2 text-white rounded-full ${getStatusColor(
          row.getValue('order_status')
        )}`}
      >
        {row.getValue('order_status')}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const rowData = row.original;

      const {
        setIsShowOrderProductOpen,
        setOrderArtisan,
        changeStatus,
        setIsDeleteDialogOpen,
        // eslint-disable-next-line react-hooks/rules-of-hooks
      } = useOrderArtisanContext();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                setOrderArtisan(rowData);
                setIsShowOrderProductOpen(true);
              }}
            >
              Show Products
            </DropdownMenuItem>

            {
              // eslint-disable-next-line no-nested-ternary
              rowData.order_status === "accepted" ? (
                <DropdownMenuItem
                  onClick={() => {
                    changeStatus(rowData, "sent");
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  Sent
                </DropdownMenuItem>
              ) : rowData.order_status === "sent" ? (
                <DropdownMenuItem
                onClick={() => {
                  changeStatus(rowData, "delivered");
                  setIsDeleteDialogOpen(true);
                }}
              >
                Delivered
              </DropdownMenuItem>
              
              ) : rowData.order_status === "refused" ||  rowData.order_status === "delivered" ? (
                <></>
              ) : (
                <>
                  <DropdownMenuItem
                    onClick={() => {
                      changeStatus(rowData, "refused");
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    Refused
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      changeStatus(rowData, "accepted");
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    Accepted
                  </DropdownMenuItem>
                </>
              )
            }
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
