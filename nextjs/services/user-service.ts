import axios from "./axios";


const API_BASE_URL_DB =
  process.env.NEXT_PUBLIC_BACKEND_URL + "/api/deliveryPersonnels" || "";
const API_BASE_URL_AR =
  process.env.NEXT_PUBLIC_BACKEND_URL + "/api/artisans" || "";
const API_BASE_URL_USER =
  process.env.NEXT_PUBLIC_BACKEND_URL + "/api/users" || "";
const userService = {
  getDeliveryById: async (id: number): Promise<DeliveryPersonnel> => {
    const response = await axios.get(`${API_BASE_URL_DB}/${id}`);
    return response.data.deliveryPersonnel;
  },
  getArtisanById: async (id: number): Promise<Artisan> => {
    const response = await axios.get(`${API_BASE_URL_AR}/${id}`);
    return response.data.artisan;
  },
  getAllDelivery: async (): Promise<DeliveryPersonnel[]> => {
    const response = await axios.get(API_BASE_URL_DB);
    return response.data.deliveryPersonnels;
  },

  getAllArtisan: async (
    params: ArtisanQueryParams = {}
  ): Promise<Artisan[]> => {
    const response = await axios.get(API_BASE_URL_AR, { params });
    return response.data.artisans;
  },

  updateProfile: async (
    id: number,
    profileInfo: UpdateUserInfo = {}
  ): Promise<User[]> => {
    const response = await axios.put(`${API_BASE_URL_USER}/${id}`, profileInfo);
    return response.data.users;
  },
};

export default userService;
