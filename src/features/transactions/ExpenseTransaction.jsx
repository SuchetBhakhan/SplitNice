import React from "react";
import styled, { css } from "styled-components";
import { TbNotes } from "react-icons/tb";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

const StyledExpenseTransaction = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 80rem;
  padding: 1rem;
`;

const StyledExpenseDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTransactionLeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledExpenseRightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledExpenseAmt = styled.span`
  ${(props) =>
    props.$sameUser
      ? css`
          color: #30a430;
        `
      : css`
          color: #cc740f;
        `}
`;

const StyledNotInvolved = styled.span`
  color: #aaa;
`;

export default function ExpenseTransaction({ transaction }) {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  const {
    month,
    day,
    expenseDescription,
    expenseAmount,
    paidByUserId,
    paidByUserName,
    paidforusers,
  } = transaction;

  const displayMon = month.slice(0, 3);

  const loggedInUserInvolved = paidforusers.find(
    (pfu) => pfu.paidForUserId === user.id
  );

  const isInvolved =
    paidByUserId === user.id || loggedInUserInvolved.paidForUserShare;

  const loggedInUserShare = loggedInUserInvolved.paidForUserShare;

  const paidByUserShare = paidforusers.reduce((acc, pfu) => {
    if (pfu.paidForUserId !== paidByUserId) {
      acc = acc + pfu.paidForUserShare;
    }
    return acc;
  }, 0);

  return (
    <StyledExpenseTransaction>
      <StyledTransactionLeftContainer>
        <StyledExpenseDate>
          <span>{displayMon}</span>
          <span>{day}</span>
        </StyledExpenseDate>
        <TbNotes size={44} />
        <span>{expenseDescription}</span>
      </StyledTransactionLeftContainer>
      {isInvolved ? (
        <StyledExpenseRightContainer>
          <StyledExpenseDate>
            {
              <span>
                {user.id === paidByUserId ? "you" : paidByUserName} paid
              </span>
            }
            <span>
              <FaIndianRupeeSign />
              <span>{expenseAmount}</span>
            </span>
          </StyledExpenseDate>
          <StyledExpenseDate>
            {
              <span>
                {user.id === paidByUserId
                  ? "you lent"
                  : `${paidByUserName} lent you`}
              </span>
            }
            <StyledExpenseAmt $sameUser={user.id === paidByUserId}>
              <FaIndianRupeeSign />
              <span>
                {user.id === paidByUserId ? paidByUserShare : loggedInUserShare}
              </span>
            </StyledExpenseAmt>
          </StyledExpenseDate>
        </StyledExpenseRightContainer>
      ) : (
        <StyledNotInvolved>not involved</StyledNotInvolved>
      )}
    </StyledExpenseTransaction>
  );
}
