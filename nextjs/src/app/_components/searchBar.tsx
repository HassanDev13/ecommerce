"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  useAllProducts,
  useAllProductsWithMutation,
} from "../../../hooks/prodect-hook";
import { useProductContext } from "../../../context/ProductClientContext";
import { Loader2Icon, LoaderIcon } from "lucide-react";
import { debounce } from "lodash";

const SearchBar = () => {
  const { products, setProducts, setPrams, setPramsArtisan } =
    useProductContext();
  const { mutate } = useAllProductsWithMutation();
  const productSchema = z.object({
    search: z.string().max(255).optional(),
    type: z.enum(["sugar", "salt"]).optional(),
    subtypeSugar: z.string().optional(),
    subtypeSalt: z.string().optional(),
    minPrice: z.coerce.number().positive().optional(),
    maxPrice: z.coerce.number().positive().optional(),
    rating: z.coerce.number().lte(5, "Must be 5 or less").optional(),
    sortBy: z.enum(["price_per_piece", "rating"]).optional(),
  });

  const artisanSchema = z.object({
    search: z.string().min(2).max(255).optional(),
    address: z.string().min(2).max(255).optional(),
    rating: z.coerce.number().lte(5, "Must be 5 or less").optional(),
  });

  const formProduct = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
  });

  const formArtisan = useForm<z.infer<typeof artisanSchema>>({
    resolver: zodResolver(artisanSchema),
  });

  const onSubmitProduct = (values: z.infer<typeof productSchema>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const prams = {
      search: values.search,
      type: values.type,
      child_type: values.subtypeSugar,
      max_price: values.maxPrice,
      min_price: values.minPrice,
      min_rating: values.rating,
      sort_by: values.sortBy,
    };
    setPrams(prams);

    // Perform actions based on form data
  };

  const onSubmitArtisan = (values: z.infer<typeof artisanSchema>) => {
    console.log("Artisan Form Values", values);
    const prams: ArtisanQueryParams = {
      address: values.address,
      business_name : values.search,
      min_rating : values.rating
    };
    setPramsArtisan(prams);
  };

  const resetProductForm = () => {
    formProduct.reset({
      search: undefined,
      type: undefined,
      subtypeSugar: undefined,
      subtypeSalt: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      rating: undefined,
      sortBy: undefined,
    });
    setPrams({});
  };

  const resetArtisanForm = () => {
    formArtisan.reset();
    setPramsArtisan({})
  };

  return (
    <aside className=" overflow-y-auto max-h-screen  w-[25%]  border-r-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
      <Accordion type="single" defaultValue="item-1" className="m-2">
        <AccordionItem value="item-1">
          <AccordionTrigger>Filter by product</AccordionTrigger>
          <AccordionContent>
            <Form {...formProduct}>
              <form
                onSubmit={formProduct.handleSubmit(onSubmitProduct)}
                className="space-y-4 p-2"
              >
                <FormField
                  control={formProduct.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Search</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter search term" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formProduct.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sugar">Sugary</SelectItem>
                            <SelectItem value="salt">Salty</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {formProduct.watch().type === "sugar" ? (
                  <FormField
                    control={formProduct.control}
                    name="subtypeSugar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SugarSubType</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pastries">pastries</SelectItem>
                              <SelectItem value="French pastries(viennoiseries)">
                                French pastries(viennoiseries)
                              </SelectItem>
                              <SelectItem value="Honey-dipped">
                                Honey-dipped
                              </SelectItem>
                              <SelectItem value="Royal ice-coated">
                                Royal ice-coated
                              </SelectItem>
                              <SelectItem value="Ice sugar coated">
                                Ice sugar coated
                              </SelectItem>
                              <SelectItem value="No bake">No bake</SelectItem>
                              <SelectItem value="Mini Oven">
                                Mini Oven
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormField
                    control={formProduct.control}
                    name="subtypeSalt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SaltSubType</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Mini Pizza">
                                Mini Pizza
                              </SelectItem>
                              <SelectItem value="Coka">Coka</SelectItem>
                              <SelectItem value="Maekouda">Maekouda</SelectItem>
                              <SelectItem value="Mhadjeb">Mhadjeb</SelectItem>
                              <SelectItem value="Bourek">Bourek</SelectItem>
                              <SelectItem value="Soufflé">Soufflé</SelectItem>
                              <SelectItem value="Mini Tacos">
                                Mini Tacos
                              </SelectItem>
                              <SelectItem value="Mini Hamburger">
                                Mini Hamburger
                              </SelectItem>
                              <SelectItem value="Cheese cones">
                                Mhadjeb
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={formProduct.control}
                  name="minPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MinPrice</FormLabel>
                      <FormControl>
                        <Input placeholder="Min" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formProduct.control}
                  name="maxPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MaxPrice</FormLabel>
                      <FormControl>
                        <Input placeholder="Max" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formProduct.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <Input placeholder="From 1 to 5 " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formProduct.control}
                  name="sortBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sort By" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="price_per_piece">
                              Price
                            </SelectItem>
                            <SelectItem value="rating">Rating</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between">
                  <Button
                    type="submit"
                    className="mt-4 font-bold hover:bg-gray-200 bg-yellow-400 "
                  >
                    {formProduct.formState.isSubmitting ? (
                      <span className="flex items-center">
                        Loading <LoaderIcon className="ml-2 animate-spin" />
                      </span>
                    ) : (
                      "Search Products"
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={resetProductForm}
                    className="mt-4 font-bold hover:bg-gray-200 bg-yellow-400 "
                  >
                    Search Reset
                  </Button>
                </div>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Filter by artisan</AccordionTrigger>
          <AccordionContent>
            <Form {...formArtisan}>
              <form
                onSubmit={formArtisan.handleSubmit(onSubmitArtisan)}
                className="space-y-4 p-2"
              >
                <FormField
                  control={formArtisan.control}
                  name="search"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Search</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter search term" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formArtisan.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Add other form fields for artisans */}
                <FormField
                  control={formArtisan.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <Input placeholder="From 1 to 5 " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                <Button type="submit"   className="mt-4 font-bold hover:bg-gray-200 bg-yellow-400 ">
                  Search Artisans
                </Button>
                <Button onClick={resetArtisanForm}  className="mt-4 font-bold hover:bg-gray-200 bg-yellow-400 ">
                  Reset Search
                </Button>
                </div>
                
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default SearchBar;
