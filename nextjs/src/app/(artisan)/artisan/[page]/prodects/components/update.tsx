import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useProductContext } from "../../../../../../../context/ProductContext";
import { useAuth } from "../../../../../../../hooks/auth";
import { useUpdateProduct } from "../../../../../../../hooks/prodect-hook";

const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price_per_piece: z.coerce.number(),
  min_order: z.coerce.number(),
  type: z.string(),
  child_type: z.string(),
});

export default function UpdateProduct() {
  const { user } = useAuth({ middleware: "auth" });

  const { isUpdateSheetOpen, setIsUpdateProductOpen, product } =
    useProductContext();
  const formAct = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price_per_piece: 0,
      min_order: 0,
      type: "",
      child_type: "",
    },
  });
  const updateProduct = useUpdateProduct();
  useEffect(() => {
    formAct.reset({
      name: product?.name || "",
      description: product?.description || "",
      price_per_piece: product?.price_per_piece || 0,
      min_order: product?.min_order || 0,
      type: product?.type || "",
      child_type: product?.child_type || "",
    });
  }, [formAct, product]);

  async function onSubmit(values: z.infer<typeof productSchema>) {
    if (user && user.id && product && product.id) {
      console.log(values, user?.id);
      const productId = product?.id;
      const updatedProductData: Partial<Product> = { ...values };
      updateProduct.mutate(
        { productId, updatedProductData },
        {
          onSuccess: () => {
            setIsUpdateProductOpen(false);
            toast({
              title: "Product updated Successfully",
              description: "Prodect updated Successfully",
            });
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    }
  }

  return (
    <Sheet
      open={isUpdateSheetOpen}
      onOpenChange={(open) => setIsUpdateProductOpen(open)}
    >
      <SheetContent className="w-[800px] overflow-y-auto h-screen">
        <SheetHeader>
          <SheetTitle>Update product</SheetTitle>
        </SheetHeader>
        <Form {...formAct}>
          <form onSubmit={formAct.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={formAct.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name of Product</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formAct.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formAct.control}
              name="min_order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Order</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formAct.control}
              name="price_per_piece"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price per piece</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formAct.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sugar">Sugar</SelectItem>
                      <SelectItem value="salt">Salt</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formAct.control}
              name="child_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Child type" />
                      </SelectTrigger>
                    </FormControl>

                    {formAct.watch("type") === "sugar" ? (
                    <SelectContent>
                      <SelectItem value="PASTRIES">PASTRIES</SelectItem>
                      <SelectItem value="FRENCH_PASTRIES">French pastries(viennoiseries)</SelectItem>
                      <SelectItem value="HONEY_DIPPED">Honey-dipped</SelectItem>
                      <SelectItem value="ROYAL_ICE_COATED">Royal ice-coated</SelectItem>
                      <SelectItem value="ICE_SUGAR_COATED">Ice sugar coated</SelectItem>
                      <SelectItem value="NO_BAKE">No bake</SelectItem>
                      <SelectItem value="MINI_OVEN">Mini Oven</SelectItem>
                    </SelectContent>
                  ) : (
                    <SelectContent>
                      <SelectItem value="MINI_PIZZA">Mini Pizza</SelectItem>
                      <SelectItem value="COKA">Coka</SelectItem>
                      <SelectItem value="MAEKOUDA">Maekouda</SelectItem>
                      <SelectItem value="MHADJEB">Mhadjeb</SelectItem>
                      <SelectItem value="BOUREK">Bourek</SelectItem>
                      <SelectItem value="SOUFFLE">Soufflé</SelectItem>
                      <SelectItem value="MINI_TACOS">Mini Tacos</SelectItem>
                      <SelectItem value="MINI_HAMBURGER">Mini Hamburger</SelectItem>
                      <SelectItem value="CHEESE_CONES">Cheese cones</SelectItem>
                    </SelectContent>
                  )}

                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
