import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL + "/api/orders" || "";
  const API_BASE_URL_SEND_ORDER =
  process.env.NEXT_PUBLIC_BACKEND_URL + "/api/OrderProducts" || "";
const orderService = {
  getAllOrders: async (): Promise<Order[]> => {
    const response = await axios.get(API_BASE_URL);
    return response.data.orders;
  },

  getOrderById: async (orderId: string): Promise<Order> => {
    const response = await axios.get(`${API_BASE_URL}/${orderId}`);
    return response.data.orders;
  },

  addOrder: async (newOrderData: SendOrder): Promise<SendOrder> => {
    const response = await axios.post(API_BASE_URL_SEND_ORDER, newOrderData);
    return response.data.orders;
  },

  updateOrder: async (
    orderId: string,
    updatedOrderData: Partial<Order>
  ): Promise<Order> => {
    const response = await axios.put(
      `${API_BASE_URL}/${orderId}`,
      updatedOrderData
    );
    return response.data.orders;
  },

  deleteOrder: async (orderId: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${orderId}`);
  },
};

export default orderService;
