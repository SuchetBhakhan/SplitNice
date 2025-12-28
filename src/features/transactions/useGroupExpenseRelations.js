import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchGroupExpenseRelations } from "../../services/apiTransactions";

export default function useGroupExpenseRelations(options = {}) {
  const { groupId } = useParams();

  //console.log("Group Expense Relations Refetch", groupId);

  const {
    data: groupExpenseRelations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["groupExpenseRelations", groupId],
    queryFn: () => fetchGroupExpenseRelations(groupId),
    enabled: (options.enabled ?? true) && !!groupId,
  });

  return { groupExpenseRelations, isLoading, error };
}
