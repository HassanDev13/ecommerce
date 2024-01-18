import { useQuery, useQueryClient, useMutation } from "react-query";
import userService from "../services/user-service";

const useAllDelivery = () => {
  return useQuery<DeliveryPersonnel[]>("artisans", userService.getAllDelivery);
};

const useDeliveryById = (params: number) => {
  return useQuery<DeliveryPersonnel>(
    "delivery",
    () => userService.getDeliveryById(params),
    {
      enabled: !!params,
    }
  );
};
const useArtisanById = (params: number) => {
  return useQuery<Artisan>(
    "artisan",
    () => userService.getArtisanById(params),
    {
      enabled: !!params,
    }
  );
};
const useAllArtisans = (params: ArtisanQueryParams = {}) => {
  return useQuery<Artisan[]>("artisans", () =>
    userService.getAllArtisan(params)
  );
};
const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, profileInfo }: { id: number; profileInfo: UpdateUserInfo }) => {
      return userService.updateProfile(id, profileInfo);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
};

export {
  useAllDelivery,
  useAllArtisans,
  useUpdateProfile,
  useDeliveryById,
  useArtisanById,
};
