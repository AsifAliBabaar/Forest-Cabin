import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const {
    mutate: EditCabin,
    isLoading: isEditing,
  } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin has been successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"], // ✅ fixed query key name
      });
    },
    onError: () => toast.error("Cabin could not be edited"),
  });

  return { EditCabin, isEditing };
}
