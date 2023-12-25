"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  const productSchema = z.object({
    search: z.string().min(2).max(255).optional(),
    type: z.enum(["Sugary", "Salty"]).optional(),
    subtypeSugar: z.enum(['pastries', 'French pastries(viennoiseries)', 'Honey-dipped', 'Royal ice-coated', 'Ice sugar coated', 'No bake', 'Mini Oven']).optional(),
    subtypeSalt: z.enum(['Mini Pizza', 'Coka', 'Maekouda', 'Mhadjeb', 'Bourek', 'Soufflé', 'Mini Tacos', 'Mini Hamburger', 'Cheese cones']).optional(),
    minPrice: z.coerce.number().positive().optional(),
    maxPrice: z.coerce.number().positive().optional(),
    rating: z.coerce.number().lte(5, 'Must be 5 or less').optional(),
    sortBy: z.enum(["price", "rating"]).optional(),
  });

  const artisanSchema = z.object({
    search: z.string().min(2).max(255).optional(),
    address: z.string().min(2).max(255).optional(),
    rating: z.coerce.number().lte(5, 'Must be 5 or less').optional(),
  });

  const formProduct = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues : {
      type : "Sugary" ,
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
  const [sectionOneVisible, setSectionOneVisible] = useState(false);
  const [sectionTwoVisible, setSectionTwoVisible] = useState(false);

  return (
    <aside className="flex-1 overflow-y-auto h-screen w-[20%] bg-amber-400 p-4 ">
      <div className="text-5xl font-semibold  text-center border-b-2 border-b-black ">
          <h1 >Search</h1>
      </div>


      <div className="mt-[10%]">
        {/* Product Search Form */}
        <div>
          <button onClick={() => setSectionOneVisible(!sectionOneVisible)} 
          className="flex items-center p-2 space-x-3 rounded-md cursor-pointer">
              {sectionOneVisible ?
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15%" height="15%"><g id="_01_align_center" data-name="01 align center"><path d="M12,15.5a1.993,1.993,0,0,1-1.414-.585L5.293,9.621,6.707,8.207,12,13.5l5.293-5.293,1.414,1.414-5.293,5.293A1.993,1.993,0,0,1,12,15.5Z" /></g></svg> :
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="7%" height="7%"><g id="_01_align_center" data-name="01 align center"><path d="M7.412,24,6,22.588l9.881-9.881a1,1,0,0,0,0-1.414L6.017,1.431,7.431.017l9.862,9.862a3,3,0,0,1,0,4.242Z" /></g></svg>
              }
              <span className="text-md font-bold">Products</span>
            </button>
                {sectionOneVisible &&
                  <Form {...formProduct}>
          <form onSubmit={formProduct.handleSubmit(onSubmitProduct)}>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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

            {/* Add other form fields for products */}
            
            {formProduct.watch().type ==="Sugary" ?
              <FormField
                control={formProduct.control}
                name="subtypeSugar"
                render={({ field }) => (
                <FormItem>
                  <FormLabel>SubType</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pastries">pastries</SelectItem>
                        <SelectItem value="French pastries(viennoiseries)">French pastries(viennoiseries)</SelectItem>
                        <SelectItem value="Honey-dipped">Honey-dipped</SelectItem>
                        <SelectItem value="Royal ice-coated">Royal ice-coated</SelectItem>
                        <SelectItem value="Ice sugar coated">Ice sugar coated</SelectItem>
                        <SelectItem value="No bake">No bake</SelectItem>
                        <SelectItem value="Mini Oven">Mini Oven</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              :

            <FormField
                control={formProduct.control}
                name="subtypeSugar"
                render={({ field }) => (
                <FormItem>
                  <FormLabel>SubType</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mini Pizza">Mini Pizza</SelectItem>
                        <SelectItem value="Coka">Coka</SelectItem>
                        <SelectItem value="Maekouda">Maekouda</SelectItem>
                        <SelectItem value="Mhadjeb">Mhadjeb</SelectItem>
                        <SelectItem value="Bourek">Bourek</SelectItem>
                        <SelectItem value="Soufflé">Soufflé</SelectItem>
                        <SelectItem value="Mini Tacos">Mini Tacos</SelectItem>
                        <SelectItem value="Mini Hamburger">Mini Hamburger</SelectItem>
                       <SelectItem value="Cheese cones">Mhadjeb</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            }

            
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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


            <Button type="submit" className="mt-4 font-bold g-yellow-700">Search Products</Button>
          </form>
        </Form>
                }
        </div>
        





        {/* Artisan Search Form */}
        <div>
          <button onClick={() => setSectionTwoVisible(!sectionTwoVisible)} className="flex items-center p-2 space-x-3 rounded-md cursor-pointer">
              {sectionTwoVisible ?
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15%" height="15%"><g id="_01_align_center" data-name="01 align center"><path d="M12,15.5a1.993,1.993,0,0,1-1.414-.585L5.293,9.621,6.707,8.207,12,13.5l5.293-5.293,1.414,1.414-5.293,5.293A1.993,1.993,0,0,1,12,15.5Z" /></g></svg> :
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="7%" height="7%"><g id="_01_align_center" data-name="01 align center"><path d="M7.412,24,6,22.588l9.881-9.881a1,1,0,0,0,0-1.414L6.017,1.431,7.431.017l9.862,9.862a3,3,0,0,1,0,4.242Z" /></g></svg>
              }
              <span className="text-md font-bold">Artisans</span>
            </button>
            {sectionTwoVisible &&
              <Form {...formArtisan}>
          <form onSubmit={formArtisan.handleSubmit(onSubmitArtisan)}>
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

            <Button type="submit" className="mt-4 font-bold">Search Artisans</Button>
          </form>
        </Form>
            }
        </div>
        
      </div>
    </aside>
  );
};

export default SearchBar;

