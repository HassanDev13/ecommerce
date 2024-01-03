import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL + "/api/products" || "";

const API_BASE_URL_RATING =
  process.env.NEXT_PUBLIC_BACKEND_URL + "/api/ratings" || "";
const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await axios.get(API_BASE_URL);
    return response.data.products;
  },

  getProductById: async (productId: string): Promise<Product> => {
    const response = await axios.get(`${API_BASE_URL}/${productId}`);
    return response.data.products;
  },

  addProduct: async (newProductData: InsertProduct): Promise<Product> => {
    const response = await axios.post(API_BASE_URL, newProductData);
    return response.data.products;
  },

  updateProduct: async (
    productId: string,
    updatedProductData: Partial<Product>
  ): Promise<Product> => {
    const response = await axios.put(
      `${API_BASE_URL}/${productId}`,
      updatedProductData
    );
    return response.data.products;
  },
  addRating: async (rating: SendRating): Promise<void> => {
  

    await axios.post(`${API_BASE_URL_RATING}`, rating, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type for form data
      },
    });
  },
  deleteProduct: async (productId: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${productId}`);
  },

  uploadImages: async (productId: string, images: FileList): Promise<void> => {
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append(`images[${i}]`, images[i]);
    }

    await axios.post(
      `${API_BASE_URL}/upload?productId=${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for form data
        },
      }
    );
  },
  
};

export default productService;
