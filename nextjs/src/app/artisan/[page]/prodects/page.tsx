import { DataTable } from '@/app/artisan/[page]/prodects/components/data-table'
import { ProductProvider } from '@/app/context/ProductContext'
import { useAllProducts } from '@/app/hooks/prodect-hook'
import { Toaster } from "@/components/ui/toaster"
import { columns } from './components/columns'
import CreateProduct from './components/create'
import DeleteProduct from './components/delete'
import UpdateProduct from './components/update'
export default function Products() {

  const { data: products, isLoading, isError } = useAllProducts();

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
          <DataTable data={products!} columns={columns} />
          <CreateProduct />
          <UpdateProduct />
          <DeleteProduct />
       
        </div>
      </ProductProvider>
    </>
  )
}
