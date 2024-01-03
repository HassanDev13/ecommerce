import { useQuery, useQueryClient, useMutation } from "react-query";
import productService from "../services/prodect-service";

const useAllProducts = () => {
  return useQuery<Product[]>("products", productService.getAllProducts);
};

const useProductById = (productId: string) => {
  return useQuery<Product>(["products", productId], () =>
    productService.getProductById(productId)
  );
};

const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (InsertProduct: InsertProduct) => {
      return productService.addProduct(InsertProduct);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );
};
const useAddRating = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (sendRating: SendRating) => {
      return productService.addRating(sendRating);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("ratings");
      },
    }
  );
};
const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      productId,
      updatedProductData,
    }: {
      productId: string;
      updatedProductData: Partial<Product>;
    }) => {
      return productService.updateProduct(productId, updatedProductData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );
};

const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (productId: string) => {
      return productService.deleteProduct(productId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );
};

const useUploadImages = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: { productId: string; images: FileList }) => {
      const { productId, images } = data;
      return await productService.uploadImages(productId, images);
    },
    {
      onSuccess: () => {
        // Invalidate the "products" query on success
        queryClient.invalidateQueries("products");
      },
      onError: (error) => {
        // Handle errors here
        console.error("Error uploading images:", error);
      },
    }
  );
};

export {
  useCreateProduct,
  useUpdateProduct,
  useProductById,
  useAllProducts,
  useDeleteProduct,
  useUploadImages,
  useAddRating,
};
