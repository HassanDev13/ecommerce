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
  enum SugarChildType {
    PASTRIES = "pastries",
    FRENCH_PASTRIES = "French pastries(viennoiseries)",
    HONEY_DIPPED = "Honey-dipped",
    ROYAL_ICE_COATED = "Royal ice-coated",
    ICE_SUGAR_COATED = "Ice sugar coated",
    NO_BAKE = "No bake",
    MINI_OVEN = "Mini Oven",
  }

  enum SaltChildType {
    MINI_PIZZA = "Mini Pizza",
    COKA = "Coka",
    MAEKOUDA = "Maekouda",
    MHADJEB = "Mhadjeb",
    BOUREK = "Bourek",
    SOUFFLE = "Soufflé",
    MINI_TACOS = "Mini Tacos",
    MINI_HAMBURGER = "Mini Hamburger",
    CHEESE_CONES = "Cheese cones",
  }
  const productSchema = z.object({
    search: z.string().max(255).optional(),
    type: z.enum(["sugar", "salt"]).optional(),
    child_type: z
      .string()
      .refine((value): value is SugarChildType | SaltChildType => {
        return (
          Object.values(SugarChildType).includes(value as SugarChildType) ||
          Object.values(SaltChildType).includes(value as SaltChildType)
        );
      }).optional(),
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
      child_type: values.child_type,
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
      business_name: values.search,
      min_rating: values.rating,
    };
    setPramsArtisan(prams);
  };

  const resetProductForm = () => {
    formProduct.reset({
      search: undefined,
      type: undefined,
      child_type: undefined,
   
      minPrice: undefined,
      maxPrice: undefined,
      rating: undefined,
      sortBy: undefined,
    });
    setPrams({});
  };

  const resetArtisanForm = () => {
    formArtisan.reset({});
    setPramsArtisan({});
  };

  return (
    <aside className="  overflow-y-auto h-full w-[30%]  ">
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
                    name="child_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SugarSubType</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Child type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(SugarChildType).map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormField
                    control={formProduct.control}
                    name="child_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SaltSubType</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Child type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(SaltChildType).map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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

                <div className="flex justify-start space-x-2">
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
                <div className="flex justify-start space-x-2">
                  <Button
                    type="submit"
                    className="mt-4 font-bold hover:bg-gray-200 bg-yellow-400 "
                  >
                    Search Artisans
                  </Button>
                  <Button
                    onClick={resetArtisanForm}
                    className="mt-4 font-bold hover:bg-gray-200 bg-yellow-400 "
                  >
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
