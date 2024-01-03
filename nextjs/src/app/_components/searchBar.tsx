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

const SearchBar = () => {
  const productSchema = z.object({
    search: z.string().min(2).max(255).optional(),
    type: z.enum(["Sugary", "Salty"]).optional(),
    subtypeSugar: z
      .enum([
        "pastries",
        "French pastries(viennoiseries)",
        "Honey-dipped",
        "Royal ice-coated",
        "Ice sugar coated",
        "No bake",
        "Mini Oven",
      ])
      .optional(),
    subtypeSalt: z
      .enum([
        "Mini Pizza",
        "Coka",
        "Maekouda",
        "Mhadjeb",
        "Bourek",
        "Soufflé",
        "Mini Tacos",
        "Mini Hamburger",
        "Cheese cones",
      ])
      .optional(),
    minPrice: z.coerce.number().positive().optional(),
    maxPrice: z.coerce.number().positive().optional(),
    rating: z.coerce.number().lte(5, "Must be 5 or less").optional(),
    sortBy: z.enum(["price", "rating"]).optional(),
  });

  const artisanSchema = z.object({
    search: z.string().min(2).max(255).optional(),
    address: z.string().min(2).max(255).optional(),
    rating: z.coerce.number().lte(5, "Must be 5 or less").optional(),
  });

  const formProduct = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      type: "Sugary",
    },
  });

  const formArtisan = useForm<z.infer<typeof artisanSchema>>({
    resolver: zodResolver(artisanSchema),
  });

  const onSubmitProduct = (values: z.infer<typeof productSchema>) => {
    console.log("Product Form Values", values);
    // Perform actions based on form data
  };

  const onSubmitArtisan = (values: z.infer<typeof artisanSchema>) => {
    console.log("Artisan Form Values", values);
    // Perform actions based on form data
  };

  return (
    <aside className=" overflow-y-auto max-h-screen  w-[25%]  border-r-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
      <Accordion type="single" defaultValue="item-1" className="m-2">
        <AccordionItem value="item-1" >
          <AccordionTrigger>Filter by product</AccordionTrigger>
          <AccordionContent>
            <Form {...formProduct}>
              <form onSubmit={formProduct.handleSubmit(onSubmitProduct)} className="space-y-4 p-2">
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
                            <SelectItem value="Sugary">Sugary</SelectItem>
                            <SelectItem value="Salty">Salty</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {formProduct.watch().type === "Sugary" ? (
                  <FormField
                    control={formProduct.control}
                    name="subtypeSugar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SubType</FormLabel>
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
                    name="subtypeSugar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SubType</FormLabel>
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
                            <SelectItem value="Price">Price</SelectItem>
                            <SelectItem value="Rating">Rating</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="mt-4 font-bold g-yellow-700">
                  Search Products
                </Button>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Filter by artisan</AccordionTrigger>
          <AccordionContent>
            <Form {...formArtisan}>
              <form onSubmit={formArtisan.handleSubmit(onSubmitArtisan)} className="space-y-4 p-2">
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

                <Button type="submit" className="mt-4 font-bold">
                  Search Artisans
                </Button>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default SearchBar;
