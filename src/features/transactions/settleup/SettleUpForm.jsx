import React from "react";
import styled from "styled-components";
import { useSettleUpDetailsContext } from "./SettleUpContextProvider";
import Modal from "../../../ui/Modal";
import SelectPayer from "../SelectPayer";
import { useQueryClient } from "@tanstack/react-query";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import {
  createExpenseData,
  createExpenseRelationsMap,
} from "../utils/helperFunctions";
import { useParams } from "react-router-dom";
import useCreateGroupTransaction from "../useCreateGroupTransaction";

const StyledText = styled.span`
  padding: 0.2rem 1.2rem;
  border-radius: var(--border-radius-lg);
  background-color: var(--color-grey-50);
  border: dashed;
  color: var(--color-green-100);
  cursor: pointer;
`;

const ExpenseDescText = styled.span`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const StyledSettleUp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
`;

export default function SettleUpForm({ onClose }) {
  const { state, dispatch } = useSettleUpDetailsContext();

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  // Fetch Initial Balance and Expense Relations before adding new expense
  const { groupId } = useParams();
  const groupBalances = queryClient.getQueryData(["groupBalances", groupId]);
  const groupExpenseRelations = queryClient.getQueryData([
    "groupExpenseRelations",
    groupId,
  ]);

  const { createExpense } = useCreateGroupTransaction(onClose);

  const { payerModal, recipientModal, paidByUser, paidForUser, expenseAmount } =
    state;

  const { paidByUserId, paidByUserName } = paidByUser;
  const { paidForUserId, paidForUserName } = paidForUser;

  function onSelectPayer() {
    dispatch({ type: "setPayerModal" });
  }

  function onSelectRecipient() {
    dispatch({ type: "setRecipientModal" });
  }

  function handleExpenseAmount(e) {
    dispatch({ type: "setExpenseAmount", payload: e.target.value });
  }

  function onSave() {
    if (!expenseAmount) return;

    //console.log("Inside save function", state);

    // To creata a group balance map
    const groupBalancesMap = new Map(
      groupBalances.map((gB) => [gB.userId, gB.userBalance])
    );

    // To create a group Expense map
    const groupExpenseRelationsMap = createExpenseRelationsMap(
      groupExpenseRelations
    );

    const paidForUsers = [
      {
        ...paidForUser,
        paidForUserShare: Number(expenseAmount),
      },
    ];
    const selectedSplitType = "unequally";
    const today = new Date().toISOString();
    const transactionType = "settleUp";

    const [finalPaidForUsers, totalPaidForShare] = createExpenseData(
      paidForUsers,
      selectedSplitType,
      transactionType,
      paidByUser,
      expenseAmount,
      groupBalancesMap,
      groupExpenseRelationsMap
    );

    // Objects to send as RPC function parameters
    const expenseTransaction = {
      expenseAmount,
      expenseDescription: "Settle Up Transaction",
      expenseDate: today,
      groupId,
      splitType: selectedSplitType,
      paidByUserId: paidByUserId,
      paidByUserName: paidByUserName,
      transactionType,
    };

    const groupBalancesUpdates = Array.from(
      groupBalancesMap,
      ([userId, balance]) => ({
        userId,
        userBalance: balance,
        groupId,
      })
    );

    const groupExpenseRelationsUpdates = [];

    for (const [userOneId, innerMap] of groupExpenseRelationsMap.entries()) {
      for (const [userTwoId, relationBalance] of innerMap.entries()) {
        groupExpenseRelationsUpdates.push({
          userOneId,
          userTwoId,
          relationBalance,
          groupId,
        });
      }
    }

    // Call Supabase RPC function to update values in backend

    // console.log("expenseTransaction", expenseTransaction);
    // console.log("finalPaidForUsers", finalPaidForUsers);
    // console.log("groupBalancesUpdates", groupBalancesUpdates);
    // console.log("groupExpenseRelationsUpdates", groupExpenseRelationsUpdates);

    createExpense({
      expenseTransaction,
      finalPaidForUsers,
      groupBalancesUpdates,
      groupExpenseRelationsUpdates,
    });
  }

  return (
    <StyledSettleUp>
      <div>Record a cash payment</div>
      <ExpenseDescText>
        <StyledText onClick={onSelectPayer}>
          {user.id === paidByUserId ? "You" : paidByUserName}
        </StyledText>
        <span>paid</span>
        <StyledText onClick={onSelectRecipient}>
          {user.id === paidForUserId ? "You" : paidForUserName}
        </StyledText>
      </ExpenseDescText>
      <Input
        value={expenseAmount}
        onChange={handleExpenseAmount}
        placeholder="Enter Amount"
      />
      <Button onClick={onSave}>Save</Button>
      {payerModal && (
        <Modal onClose={onSelectPayer} modalTitle={"Choose Payer"}>
          <SelectPayer
            state={state}
            dispatch={dispatch}
            setUserType="selectPayer"
          />
        </Modal>
      )}

      {recipientModal && (
        <Modal onClose={onSelectRecipient} modalTitle={"Choose a Recipient"}>
          <SelectPayer
            state={state}
            dispatch={dispatch}
            setUserType="selectRecipient"
          />
        </Modal>
      )}
    </StyledSettleUp>
  );
}
