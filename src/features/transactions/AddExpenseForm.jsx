import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import ExpenseDetailsSelection from "./ExpenseDetailsSelection";
import { useExpenseDetailsContext } from "./ExpenseDetailsContext";
import {
  calcPaidForUsers,
  calcUpdatedBalanceMap,
  createExpenseData,
  createExpenseRelationsMap,
  simplifyDebts,
} from "./utils/helperFunctions";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import styled from "styled-components";
import useCreateGroupTransaction from "./useCreateGroupTransaction";
import { ButtonContainer } from "../../ui/ButtonContainer";

export default function AddExpenseForm({ onClose }) {
  //console.log("inside AddExpenseForm");
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString();

  // Fetch Initial Balance and Expense Relations before adding new expense
  const { groupId } = useParams();
  const queryClient = useQueryClient();
  const groupBalances = queryClient.getQueryData(["groupBalances", groupId]);
  const groupExpenseRelations = queryClient.getQueryData([
    "groupExpenseRelations",
    groupId,
  ]);

  // To creata a group balance map
  const groupBalancesMap = new Map(
    groupBalances.map((gB) => [gB.userId, gB.userBalance])
  );

  // To create a group Expense map
  const groupExpenseRelationsMap = createExpenseRelationsMap(
    groupExpenseRelations
  );

  const { state, dispatch } = useExpenseDetailsContext();

  const { createExpense } = useCreateGroupTransaction(onClose);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      createdAt: today.split("T")[0],
    },
  });

  // const expenseAmount = watch("expenseAmount");

  const expenseAmount = useWatch({
    control,
    name: "expenseAmount",
  });

  // Update expenseAmount State whenever ExpenseAmount field updates
  useEffect(() => {
    if (expenseAmount !== null && expenseAmount !== undefined)
      dispatch({ type: "setExpenseAmount", payload: { expenseAmount } });
  }, [expenseAmount]);

  // Add new Transaction
  function handleAddExpense(expenseDetails) {
    const { paidForUsers, selectedSplitType, paidByUser, totalTraget } = state;

    const { expenseAmount } = expenseDetails;

    const transactionType = "addExpense";

    const [finalPaidForUsers, totalPaidForShare] = createExpenseData(
      paidForUsers,
      selectedSplitType,
      transactionType,
      paidByUser,
      expenseAmount,
      groupBalancesMap,
      groupExpenseRelationsMap
    );

    //Total Amount Validation
    if (totalPaidForShare > expenseAmount) {
      setError("expenseAmount", {
        type: "manual",
        message:
          "Total Split Amount between users cannot exceed expense amount",
      });
    }
    // Objects to send as RPC function parameters
    const expenseTransaction = {
      expenseAmount: expenseDetails.expenseAmount,
      expenseDescription: expenseDetails.expenseDescription,
      expenseDate: today,
      groupId: groupId,
      splitType: state.selectedSplitType,
      paidByUserId: state.paidByUser.paidByUserId,
      paidByUserName: state.paidByUser.paidByUserName,
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

    createExpense({
      expenseTransaction,
      finalPaidForUsers,
      groupBalancesUpdates,
      groupExpenseRelationsUpdates,
    });
  }

  return (
    <Form onSubmit={handleSubmit(handleAddExpense)}>
      <FormRow label="Enter Amount">
        <Input
          type="number"
          onKeyDown={(e) => {
            if (["e", "E", "+", "-"].includes(e.key)) {
              e.preventDefault();
            }
          }}
          id="expenseAmount"
          {...register("expenseAmount", {
            valueAsNumber: true,
            required: "Amount is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Only numbers are allowed",
            },
          })}
        />
        {errors.expenseAmount && (
          <span className="errorMessage">{errors.expenseAmount.message}</span>
        )}
      </FormRow>
      <FormRow label="Enter Description">
        <Input
          id="expenseDescription"
          {...register("expenseDescription", {
            required: "Description is required",
          })}
        />
        {errors.expenseDescription && (
          <span className="errorMessage">
            {errors.expenseDescription.message}
          </span>
        )}
      </FormRow>
      <FormRow>
        <ExpenseDetailsSelection />
      </FormRow>
      <FormRow label="Select Date">
        <Input type="date" id="createdAt" {...register("createdAt")} />
      </FormRow>
      <ButtonContainer>
        <Button>Save</Button>
      </ButtonContainer>
    </Form>
  );
}
