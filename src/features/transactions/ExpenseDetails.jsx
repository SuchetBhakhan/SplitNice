import React from "react";
import ExpenseRelationDesc from "./ExpenseRelationDesc";
import styled from "styled-components";

const StyledExpenseDetails = styled.div`
  padding: 1rem;
  max-width: 80rem;
  display: flex;
  justify-content: space-between;
  background-color: var(--color-grey-0);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease;
`;

const StyledRelation = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  button {
    width: fit-content;
  }
`;

const PaidByUserRelationDesc = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-end;
`;

export default function ExpenseDetails({ transaction }) {
  const {
    month,
    day,
    expenseDescription,
    expenseAmount,
    paidByUserId,
    paidByUserName,
    paidforusers,
    transactionType,
  } = transaction;

  let displayUsers = [],
    paidByUserRelation = 0;

  const transformExpense = () => {
    paidforusers.forEach((pfu, i) => {
      //For PaidByUser
      if (pfu.paidForUserId === paidByUserId && pfu.paidForUserShare !== 0) {
        paidByUserRelation = {
          user: "and",
          rel: "owes",
          amt: pfu.paidForUserShare,
        };
      }

      //For PaidForUsers
      if (pfu.paidForUserId !== paidByUserId && pfu.paidForUserShare !== 0) {
        displayUsers.push({
          user: pfu.paidForUserName,
          rel: transactionType === "settleUp" ? "received" : "owes",
          amt: pfu.paidForUserShare,
          id: pfu.paidForUserId,
        });
      }
    });
  };

  transformExpense();

  return (
    <StyledExpenseDetails>
      <StyledRelation>
        <div>{expenseDescription}</div>
        <div>{expenseAmount}</div>
        <div>{`Added on ${month} ${day}`}</div>
      </StyledRelation>
      <StyledRelation>
        <PaidByUserRelationDesc>
          <ExpenseRelationDesc
            user={paidByUserName}
            relation="paid"
            amount={expenseAmount}
          />
          {paidByUserRelation ? (
            <ExpenseRelationDesc
              user={paidByUserRelation.user}
              relation={paidByUserRelation.rel}
              amount={paidByUserRelation.amt}
            />
          ) : null}
        </PaidByUserRelationDesc>
        {displayUsers.map((dE) => {
          return (
            <ExpenseRelationDesc
              key={dE.paidForUserId}
              user={dE.user}
              relation={dE.rel}
              amount={dE.amt}
            />
          );
        })}
      </StyledRelation>
    </StyledExpenseDetails>
  );
}
