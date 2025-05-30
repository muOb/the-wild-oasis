import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["Booking"],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  return { isLoading, booking, error };
}
