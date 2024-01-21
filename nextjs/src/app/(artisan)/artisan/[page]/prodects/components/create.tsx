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
  SheetTitle
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useProductContext } from "../../../../../../../context/ProductContext";
import { useAuth } from "../../../../../../../hooks/auth";
import {
  useCreateProduct,
  useUploadImages,
} from "../../../../../../../hooks/prodect-hook";


export default function CreateProduct() {
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
  name: z.string(),
  description: z.string(),
  price_per_piece: z.coerce.number(),
  min_order: z.coerce.number().min(1),
  type: z.enum(["sugar", "salt"]),
 child_type: z.string().refine((value): value is SugarChildType | SaltChildType => {
    return Object.values(SugarChildType).includes(value as SugarChildType) || Object.values(SaltChildType).includes(value as SaltChildType);
  }),

  });

  const [selectedImages, setSelectedImages] = useState<FileList>();
  const { user } = useAuth({ middleware: "auth" });
  const createProduct = useCreateProduct();
  const uploadImages = useUploadImages();
  const { isCreateSheetOpen, setIsCreateProductOpen } = useProductContext();
  const formAct = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price_per_piece: 0,
      min_order: 0,
      type: "sugar",
      child_type: SugarChildType.PASTRIES,
    },
  });
    console.log("Type Value:", formAct.watch().type);

  

 const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;
  if (!files) return;

  // Restrict to a maximum of 5 images
  if (files.length > 5) {
    toast({
      title: "Too many images",
      description: "Please select up to 5 images only.",
    });
    return;
  }

  setSelectedImages(files);
};

  async function onSubmit(values: z.infer<typeof productSchema>) {
    if (user && user.id) {
      console.log(values, user.id);
      console.log("Selected Images:", selectedImages);

      const formdata: InsertProduct = { ...values, user_id: user.id };
      createProduct.mutate(formdata, {
        onSuccess: (data) => {
          setIsCreateProductOpen(false);
          if (!selectedImages) {
            toast({
              title: "No Images uploaded",
              description: "Please Select images to upload",
            });
            return;
          }
          uploadImages.mutate(
            { productId: String(data.id), images: selectedImages },
            {
              onSuccess: () => {
                toast({
                  title: "Images uploaded Successfully",
                  description: "Images uploaded Successfully",
                });
                 window.location.reload();

              },
              onError: (error) => {
                console.log(error);
              },
            }
          );
          toast({
            title: "Product created Successfully",
            description: "Prodect created Successfully",
          });
          
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  }

  return (
   
      <Sheet
        open={isCreateSheetOpen}
        onOpenChange={(open) => setIsCreateProductOpen(open)}
      >
        
        <SheetContent className="w-[800px] overflow-y-auto h-screen">
          <SheetHeader>
            <SheetTitle>Create new product</SheetTitle>
          </SheetHeader>
          <Form {...formAct}>
    
            <form
              onSubmit={formAct.handleSubmit(onSubmit)}
              className="space-y-4"
            >
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
                        placeholder="Provide a description of the product"
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
                        <SelectItem value="sugar">Sugary</SelectItem>
                        <SelectItem value="salt">Salty</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

             {formAct.watch().type === "sugar" ? (
      <FormField
        control={formAct.control}
        name="child_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SugarSubType</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        control={formAct.control}
        name="child_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>SaltSubType</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              {/* Image upload field */}
              <FormItem>
                <FormLabel>Upload Images</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
  
  );
}
