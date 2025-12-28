import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ExpenseContextProvider } from "./ExpenseDetailsContext";
import AddExpenseForm from "./AddExpenseForm";

export default function AddExpense({ onClose }) {
  //console.log("inside Add Expense");

  //Extracting UserData using Query Key
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  //Extracting GroupMembers using Query key
  const { groupId } = useParams();
  const groupDetails = queryClient.getQueryData(["groupDetails", groupId]);
  const { groupMembers } = groupDetails?.[0];

  // Initial State for State Management
  const initialState = {
    payerModal: false,
    paidForUsersModal: false,
    expenseAmount: 0,
    paidByUser: {
      paidByUserId: user.id,
      paidByUserName: user.user_metadata.fullName,
    },
    paidForUsers: groupMembers.map((groupMember) => ({
      paidForUserId: groupMember.userId,
      paidForUserName: groupMember.groupMemberName,
      paidForUserShare: 0,
      isPaying: true,
      splitByShare: null,
    })),
    selectedSplitType: "equally",
    selectedUsers: groupMembers.map((groupMember) => groupMember.userId),
    splitOptions: ["equally", "unequally", "percentage"],
    loggedInUser: user,
    groupMembers,
    totalTarget: null,
    splitByUnit: "₹",
  };

  return (
    <ExpenseContextProvider initialState={initialState}>
      <AddExpenseForm onClose={onClose} />
    </ExpenseContextProvider>
  );
}
