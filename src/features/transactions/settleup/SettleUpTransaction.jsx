import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components";
import { StyledExpenseDesc } from "../../../ui/StyledExpenseDesc";
import ExpenseDetails from "../ExpenseDetails";

const StyledExpenseDate = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledSettleUp = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 80rem;
  padding: 1rem;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledNotInvolved = styled.span`
  color: #aaa;
`;
export default function SettleUpTransaction({ transaction }) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  const [showExpenseDetails, setShowExpenseDetails] = useState(false);

  const getShowExpense = () => {
    setShowExpenseDetails(!showExpenseDetails);
  };

  const {
    month,
    day,
    expenseAmount,
    paidByUserId,
    paidByUserName,
    paidforusers,
  } = transaction;

  let displayMon,
    displayPaidByUser,
    displayPaidForUser,
    expenseDescription,
    expenseRelation,
    isInvolved;

  function prepareDisplayData() {
    // get transaction month
    displayMon = month.slice(0, 3);

    //prepare expenseDescription
    displayPaidByUser = paidByUserId === user.id ? "You" : paidByUserName;
    displayPaidForUser =
      paidforusers[0].paidForUserId === user.id
        ? "You"
        : paidforusers[0].paidForUserName;

    expenseDescription = `${displayPaidByUser} paid ${displayPaidForUser} ₹${expenseAmount}`;

    // prepare expenseRelation for loggedIn user
    if (displayPaidByUser === "You") expenseRelation = "you paid";
    if (displayPaidForUser === "You") expenseRelation = "you recieved";

    // Find whether loggedIn user involved in transaction or not
    const loggedInUserInvolved = paidforusers.find(
      (pfu) => pfu.paidForUserId === user.id
    );

    isInvolved = paidByUserId === user.id || loggedInUserInvolved;
  }

  prepareDisplayData();

  return (
    <>
      <StyledSettleUp>
        <LeftContainer>
          <StyledExpenseDate>
            <span>{displayMon}</span>
            <span>{day}</span>
          </StyledExpenseDate>
          <StyledExpenseDesc onClick={getShowExpense}>
            {expenseDescription}
          </StyledExpenseDesc>
        </LeftContainer>
        <div>
          {isInvolved ? (
            <>
              <span>{expenseRelation}</span>
              <span> ₹{expenseAmount}</span>
            </>
          ) : (
            <StyledNotInvolved>not involved</StyledNotInvolved>
          )}
        </div>
      </StyledSettleUp>
      {showExpenseDetails && <ExpenseDetails transaction={transaction} />}
    </>
  );
}
