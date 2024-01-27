import { Toaster } from "@/components/ui/toaster";
import { columns } from "./components/columns";
import CreateProduct from "./components/create";
import DeleteProduct from "./components/delete";
import UpdateProduct from "./components/update";
import { useAllProducts } from "../../../../../../hooks/prodect-hook";
import { ProductProvider } from "../../../../../../context/ProductContext";
import { DataTable } from "./components/data-table";
import { useArtisanById } from "../../../../../../hooks/user-hook";
import { useAuth } from "../../../../../../hooks/auth";
import { ProjectDetails } from "@/app/(client)/products/components/project-details";
import { ProjectOrderDetails } from "./components/prodect-order";

export default function Products() {
  const { logout, user } = useAuth({ middleware: "auth" });

  const {
    data: products,
    isLoading,
    isError,
} = useArtisanById(Number(user?.artisan?.id || 0)); // Provide a default value (0 in this case)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <ProductProvider>
        <div className="h-screen w-full">
         
          <DataTable data={products?.user.products ?? []} columns={columns} />
          <CreateProduct />
          <UpdateProduct />
          <DeleteProduct />
          <ProjectDetails/>
          <ProjectOrderDetails/>
        </div>
      </ProductProvider>
    </>
  );
}
