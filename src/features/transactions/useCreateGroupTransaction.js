import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createExpenseTransaction } from "../../services/apiTransactions";
import { useParams } from "react-router-dom";

export default function useCreateGroupTransaction(onClose) {
  const queryClient = useQueryClient();
  const { groupId } = useParams();

  const { mutate: createExpense, isLoading } = useMutation({
    mutationFn: (expenseData) => createExpenseTransaction(expenseData),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({
        queryKey: ["groupTransactions", groupId],
      });
      queryClient.invalidateQueries({
        queryKey: ["groupBalances", groupId],
      });
      queryClient.invalidateQueries({
        queryKey: ["groupExpenseRelations", groupId],
      });
      // await Promise.all([
      //   queryClient.invalidateQueries({
      //     queryKey: ["groupTransactions", groupId],
      //   }),
      //   queryClient.invalidateQueries({
      //     queryKey: ["groupBalances", groupId],
      //   }),
      //   queryClient.invalidateQueries({
      //     queryKey: ["groupExpenseRelations", groupId],
      //   }),
      // ]);
      onClose();
      toast.success("New Transaction Created");
    },
    onError: (error) => {
      //console.log("error", error);
      toast.error("Error while creating transactions");
    },
  });

  return { createExpense, isLoading };
}
