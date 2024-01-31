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
import { ProjectDetails } from "./components/project-details";
import { date } from "zod";
import { useAllArtisans } from "../../../../hooks/user-hook";
import Rating from "../profile/rating";
import { ArtisanDetails } from "./components/artisan-details";

const Products = () => {
  return (
    <section className="flex min-h-screen w-[auto]">
      <SearchBar />
      <ResultSection />
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

const ResultSection = () => {
  return (
    <div className=" p-4 w-full  flex flex-col space-y-2">
      <h1 className="text-xxl font-bold">Artisans</h1>
      <Artisans />

      <h1 className="text-xxl font-bold">Products</h1>
      <Products />
    </div>
  );

  function Products() {
    const { prams } = useProductContext();
    const { data: allProducts, isLoading } = useAllProducts(prams);

    return (
      <div className="w-full h-fit grid grid-cols-5 gap-4">
        {allProducts?.map((product, index) => (
          <div
            key={index}
            className="border-2 border-gray-200 rounded-lg hover:border-primary"
          >
            <div className="flex flex-col justify-start items-center space-y-2">
              <Image
                src={process.env.NEXT_PUBLIC_URL_IMAGE + product.images[0].path}
                alt="Picture of the author"
                className="w-full rounded-lg"
                width={100}
                height={100}
              />
              <div className="px-4 text-left w-full">
                <h1 className="text-lg font-bold">{product.name}</h1>
                <p className="text-sm">{product.price_per_piece} DA</p>
                <div className="flex space-x-1">
                  <Rating
                    initialValue={product?.averageRating}
                    desabled={true}
                  />
                  <p>({product?.ratings.length})</p>
                </div>
              </div>

              <ButtonProduct product={product} />
            </div>
          </div>
        ))}
        <ProjectDetails />
        <ArtisanDetails/>
      </div>
    );
  }

  function Artisans() {
    const { pramsArtisan, setIsSheetArtisanDetailsOpen , setArtisan } = useProductContext();
    const { data: allArtisans } = useAllArtisans(pramsArtisan);

    return (
      <div className="w-full h-fit grid grid-cols-5 gap-4">
        {allArtisans?.map((artisan, index) => (
          <div
            key={index}
            className="border-2 border-gray-200 rounded-lg hover:border-primary"
          >
            <div className="flex flex-col justify-start items-start space-y-2">
              <div className="p-4 text-left w-full space-y-2 ite">
                <h1 className="text-lg font-bold">{artisan.business_name}</h1>
                <div className="flex space-x-1">
                  <Rating
                    initialValue={artisan.average_rating ?? 0}
                    desabled={true}
                  />
                  <p>({artisan.ratings.length ?? 0})</p>
                </div>

                <Button
                  className="w-full"
                  onClick={() => {
                    setArtisan(artisan)
                    setIsSheetArtisanDetailsOpen(true);
                  }}
                >
                  Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};