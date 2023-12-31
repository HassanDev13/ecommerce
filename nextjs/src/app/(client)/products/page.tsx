"use client";

import SearchBar from "@/app/_components/searchBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  ProductProvider,
  useProductContext,
} from "../../../../context/ProductClientContext";
import { useAllProducts } from "../../../../hooks/prodect-hook";
import { CardList } from "./components/card-list";
import { ProjectDetails } from "./components/project-details";

const Products = () => {
  const products = useAllProducts();

  return (
    <section className="flex h-full  w-screen">
      <SearchBar/>
      <div className="w-[75%] grid grid-cols-4 gap-4 p-4">
        <ProductProvider>
          {products.data?.map((product, index) => (
            <div
              key={index}
              className="border-2 border-gray-200 rounded-lg hover:border-primary"
            >
              <div className="flex flex-col justify-start items-center space-y-2">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_URL_IMAGE + product.images[0].path
                  }
                  alt="Picture of the author"
                  className="w-full rounded-lg"
                  width={100}
                  height={100}
                />
                <div className="px-4 text-left w-full">
                  <h1 className="text-lg font-bold">{product.name}</h1>
                  <p className="text-sm">{product.price_per_piece} DA</p>
                </div>

                <ButtonProduct product={product} />
              </div>
            </div>
          ))}
          <ProjectDetails />
          <CardList/>
        </ProductProvider>
      </div>
    </section>
  );
};

export default Products;

function ButtonProduct({ product }: { product: Product }) {
  const { setIsCreateProductOpen, setProduct } =
    useProductContext();
  return (
    <div className="flex  px-4 pb-4 text-left w-full">
      <Button
        className="w-full"
        onClick={() => {
          setProduct(product);
          setIsCreateProductOpen(true);
        }}
      >
        Add To Card
      </Button>
    </div>
  );
}
