import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { fetchGroups } from "../../services/apiGroups";

export default function useGroups() {
  const queryClient = useQueryClient();
  const userEmail = queryClient.getQueryData(["user"])?.email;

  const { data, error, isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: () => fetchGroups(userEmail),
  });

  return { isLoading, data, error };
}
