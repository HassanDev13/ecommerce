import axios from "axios";

const API_BASE_URL_DB =
  process.env.NEXT_PUBLIC_BACKEND_URL + "/api/deliveryPersonnels" || "";
 
const userService = {
  getAllDelivery: async (): Promise<DeliveryPersonnel[]> => {
    const response = await axios.get(API_BASE_URL_DB);
    return response.data.orders;
  },
  

  
};

export default userService;
