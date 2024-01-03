import { useQuery, useQueryClient, useMutation } from "react-query";
import userService from "../services/user-service";

const useAllDelivery = () => {
  return useQuery<DeliveryPersonnel[]>("products", userService.getAllDelivery);
};

export { useAllDelivery };
