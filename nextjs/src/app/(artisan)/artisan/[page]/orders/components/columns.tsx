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
      <div className="capitalize">{row.getValue("order_status")}</div>
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
            rowData.delivery_personnel.id
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
        setIsAssignedOrderArtisanOpen,
        setIsShowOrderProductOpen,
        setOrderArtisan,
        isDeleteDialogOpen,
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
                setIsAssignedOrderArtisanOpen(true);
              }}
            >
              Assigned
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setOrderArtisan(rowData);
                setIsShowOrderProductOpen(true);
              }}
            >
              Show Products
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setOrderArtisan(rowData);
                setIsDeleteDialogOpen(true);
              }}
            >
              Cancel Order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
