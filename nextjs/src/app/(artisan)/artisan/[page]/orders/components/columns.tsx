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
    accessorKey: "id",
    accessorFn: (row) => row.consumer.id,
    header: "consumer Name",
    cell: ({ row }) => (
      
      <div className="capitalize">{row.getValue("id")}</div>
    ),
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
    accessorFn: (row) => row.delivery_personnel.id,
    header: () => <div className="text-right">delivery Personnel</div>,
    cell: ({ row }) => {

      return (
        <div className="text-right font-medium">
          {row.getValue("id")}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const rowData = row.original;
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
                const { setIsUpdateOrderOpen, setOrder } = useOrderContext();

                setOrder(rowData);
                setIsUpdateOrderOpen(true);
              }}
            >
              Update
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const { setIsDeleteDialogOpen, setOrder } = useOrderContext();
                setOrder(rowData);
                setIsDeleteDialogOpen(true);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
