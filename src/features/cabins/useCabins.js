import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  // const x = useQuery({
  //   queryKey: ["cabin"],
  //   queryFn: getCabins,
  // });
  // console.log(x);

  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"], //we will see it inside react query dev tools
    queryFn: getCabins, //responsible for actually querying-for fetching the data from the API-**needs to return a promise
  });
  return { isLoading, cabins, error };
}
