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
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useProductContext } from "../../../../../../../context/ProductContext";
import Image from "next/image";
import Rating from "@/app/(client)/profile/rating";

export const columns: ColumnDef<Product>[] = [
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
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "images",
    accessorFn: (row) => row.images,
    header: "Images",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.original.images.length > 0 ? (
          <Image
            className="rounded-md"
            height={100}
            width={100}
            alt="image"
            src={
              process.env.NEXT_PUBLIC_URL_IMAGE +
            
              row.original.images[0].path
            }
          />
        ) : (
          "No Image"
        )}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
  },
  {
    accessorKey: "price_per_piece",
    header: "Price Per Piece",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("price_per_piece")}</div>

      
    ),
  },
    {
    accessorKey: "averageRating",
    header: "averageRating",
    cell: ({ row }) => {
      const averageRating = row.original.averageRating;
      console.log("Row Data:", row.original); // Log the entire row
      console.log("Average Rating:", averageRating);

      // Check if averageRating is defined and display the Rating component
      return (
        <div className="flex space-x-1">
          <Rating initialValue={averageRating || 0} desabled={true} />
        </div>
      );
    },
  },


  {
    accessorKey: "min_order",
    header: () => <div className="text-right">Min order</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("min_order"));
      return <div className="text-right font-medium">{amount}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { setIsUpdateProductOpen, setProduct, setIsDeleteDialogOpen , setIsSheetProductOrdersOpen} =
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useProductContext();
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
                setProduct(rowData);
                setIsSheetProductOrdersOpen(true);
              }}
            >
              show orders
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setProduct(rowData);
                setIsUpdateProductOpen(true);
              }}
            >
              Update
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setProduct(rowData);
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
