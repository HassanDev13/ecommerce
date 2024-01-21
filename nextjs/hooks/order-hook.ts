import { useQuery, useQueryClient, useMutation } from "react-query";
import orderService from "../services/order-service";

const useAllOrders = () => {
  return useQuery<Order[]>("orders", orderService.getAllOrders);
};

const useOrderById = (orderId: string) => {
  return useQuery<Order>(["orders", orderId], () =>
    orderService.getOrderById(orderId)
  );
};

const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (newOrderData: SendOrder) => {
      return orderService.addOrder(newOrderData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("orders");
      },
    }
  );
};

const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      orderId,
      updatedOrderData,
    }: {
      orderId: string;
      updatedOrderData: Partial<Order>;
    }) => {
      return orderService.updateOrder(orderId, updatedOrderData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("orders");
      },
    }
  );
};

const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (orderId: string) => {
      return orderService.deleteOrder(orderId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("orders");
      },
    }
  );
};
const useAssignOrderToDeliveryPerson = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      orderId,
      deliveryPersonnelId,
      orderStatus
    }: {
      orderId: string;
      deliveryPersonnelId: string;
      orderStatus : OrderStatus;
    }) => {
      return orderService.assignOrderToDeliveryPerson(
        orderId,
        deliveryPersonnelId,
        orderStatus
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("orders");
      },
    }
  );
};

const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ orderId, orderStatus }: { orderId: string; orderStatus: string }) => {
      console.log("orderId", orderId , "orderStatus", orderStatus);
      return orderService.updateStatus(orderId, orderStatus);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("orders");
      },
    }
  );
};
export {
  useCreateOrder,
  useUpdateOrder,
  useOrderById,
  useAllOrders,
  useDeleteOrder,
  useUpdateStatus,
  useAssignOrderToDeliveryPerson,
};
