import React from "react";
import { useParams } from "react-router-dom";
import { QueryClient, useQuery } from "@tanstack/react-query";
import DateHeader from "../transactions/DateHeader";
import ExpenseTransaction from "../transactions/ExpenseTransaction";
import SettleUpTransaction from "../transactions/settleup/SettleUpTransaction";
import useGroupTransactions from "../transactions/useGroupTransactions";

export default function GroupTransactions() {
  const { groupId } = useParams();

  const { data: groupTransactions } = useQuery({
    queryKey: ["groupTransactions", groupId],
    queryFn: () => Promise.resolve(), // ✅ dummy fn to silence warning
    enabled: false, // ✅ don’t fetch, just read + stay reactive
  });

  let initialTransactionDate = {
    month: "",
    year: "",
  };

  // Calculate DisplayTransactions
  const displayTransactions = groupTransactions.map((transaction) => {
    const date = new Date(transaction.createdAt);
    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", { month: "long" });
    const day = String(date.getDate()).padStart(2, "0");

    if (
      initialTransactionDate.month !== month ||
      initialTransactionDate.year !== year
    ) {
      initialTransactionDate.month = month;
      initialTransactionDate.year = year;
      return {
        ...transaction,
        day,
        month,
        year,
        displayType: "monthChangeTransaction",
      };
    } else {
      return {
        ...transaction,
        day,
        month,
        year,
        displayType: "expenseTransaction",
      };
    }
  });

  return (
    <>
      {displayTransactions.map((dT) => (
        <React.Fragment key={dT.id}>
          {dT.displayType === "monthChangeTransaction" && (
            <DateHeader month={dT.month} year={dT.year} />
          )}

          {dT.transactionType === "addExpense" ? (
            <ExpenseTransaction transaction={dT} />
          ) : (
            <SettleUpTransaction transaction={dT} />
          )}
        </React.Fragment>
      ))}
    </>
  );
}
