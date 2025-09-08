import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingapi } from "../../services/apiBookings";

export function UseDeleteBooking(){
    const queryClient = useQueryClient();
    const { isLoading: IsDeleting, mutate:deletebooking } = useMutation({
      mutationFn: deleteBookingapi,
      onSuccess: () => {
        toast.success("Booking Succefully Deleted")
        queryClient.invalidateQueries({
          querykey: ["bookings"]
        });
      },
      onError: (err) => toast.error(err.message)
    })

    return{IsDeleting,deletebooking}
}