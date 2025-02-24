import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const {
    isLoading,
    data: user,
    fetchStatus,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  // console.log(fetchStatus);
  return {
    isLoading,
    user,
    isAuthenticated: user?.role === "authenticated",
    fetchStatus,
  }; //isAuthenticated from queryKey
}
