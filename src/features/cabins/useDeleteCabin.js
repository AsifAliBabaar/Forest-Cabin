import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deletecabin as deletecabinapi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const {
    isLoading: IsDeleting,
    mutate: deletecabin,
  } = useMutation({
    mutationFn: deletecabinapi,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"], // ✅ fixed key name
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { IsDeleting, deletecabin };
}
