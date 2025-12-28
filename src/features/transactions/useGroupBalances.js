import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchGroupBalances } from "../../services/apiTransactions";

export default function useGroupBalances(options = {}) {
  const { groupId } = useParams();

  //console.log("Group Balances Refetch", groupId);

  const {
    data: groupBalances,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["groupBalances", groupId],
    queryFn: () => fetchGroupBalances(groupId),
    enabled: (options.enabled ?? true) && !!groupId,
    onSuccess: (data) => {
      //console.log("✅ Query succeeded, data:", data);
    },
  });

  return { groupBalances, isLoading, error };
}
