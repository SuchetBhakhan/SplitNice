import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchGroupTransactions } from "../../services/apiTransactions";

export default function useGroupTransactions(options = {}) {
  const { groupId } = useParams();

  //console.log("Group Transactions Refetch", groupId);

  const {
    data: groupTransactions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["groupTransactions", groupId],
    queryFn: () => fetchGroupTransactions(groupId),
    enabled: (options.enabled ?? true) && !!groupId,
  });

  return { groupTransactions, isLoading, error };
}
