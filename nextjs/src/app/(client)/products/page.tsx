"use client";

import SearchBar from "@/app/_components/searchBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  ProductProvider,
  useProductContext,
} from "../../../../context/ProductClientContext";
import {
  useAllProducts,
  useAllProductsWithMutation,
} from "../../../../hooks/prodect-hook";
import { CardList } from "./components/card-list";
import { ProjectDetails } from "./components/project-details";
import { date } from "zod";
import { useAllOrders } from "../../../../hooks/order-hook";
import { useAllArtisans } from "../../../../hooks/user-hook";

const Products = () => {
  const { prams, filterOn, setFilterOn } = useProductContext();
  const { data: allProducts, isLoading, refetch } = useAllProducts(prams);
  const {data : allArtisans} = useAllArtisans();
  const { mutate } = useAllProductsWithMutation(prams);

  if (isLoading)
    return <div className="min-h-screen  w-screen">Loading...</div>;

  if (filterOn) {
    setFilterOn(false);
    console.log("CLICKED");
    console.log(prams);
    mutate(prams, {
      onSuccess: (data) => {
        console.log("SUCCESS");
        console.log(data);
      },
      onError: (error) => {
        console.log("ERROR");
        console.log(error);
      },
    });
  }

  return (
    <section className="flex min-h-screen  w-screen">
      <SearchBar />
      <div className=" p-4 w-full  flex flex-col space-y-2">
        <h1 className="text-xxl font-bold">Products</h1>
        <div className="w-full h-fit grid grid-cols-5 gap-4">
          {allProducts?.map((product, index) => (
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
        </div>
        <h1>Artisans</h1>
        <div className="w-full h-fit grid grid-cols-5 gap-4">
          {allArtisans?.map((artisan, index) => (
            <div
              key={index}
              className="border-2 border-gray-200 rounded-lg hover:border-primary"
            >
              <div className="flex flex-col justify-start items-center space-y-2">
               
                <div className="p-4 text-left w-full">
                  <h1 className="text-lg font-bold">{artisan.business_name}</h1>
                  <p className="text-sm">{artisan.description}</p>
                </div>

              </div>
            </div>
          ))}
      </div>
      </div>
       
    </section>
  );
};

export default Products;

function ButtonProduct({ product }: { product: Product }) {
  const { setIsCreateProductOpen, setProduct } = useProductContext();
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
