import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  //we use queryClient to use invalidatingQuery
  const queryClient = useQueryClient();
  //to do mutation we use useMutation
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    //mutate is a callback function that we can connect with the button and it call a mutationFN
    mutationFn: deleteCabinApi, //mutationFN is a fun reactQuery will call
    //onSuccess accepts a function and tell react query what to do as
    //soon as the mutation was successful
    //Here we want to re-fetch the data by invalidating the cache
    //we can do invalidating manually from react query dev tools

    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({
        //queryKey here we specify exactly the same "queryKey" that we have there in our dev tools
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message), //the message error from services apiCabins
  });
  return { isDeleting, deleteCabin };
}
