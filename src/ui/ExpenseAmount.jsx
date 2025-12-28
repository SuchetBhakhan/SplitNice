import styled, { css } from "styled-components";
import React from "react";

const StyledExpenseAmt = styled.span`
  ${(props) =>
    props.sameUser
      ? css`
          color: #30a430;
        `
      : css`
          color: #cc740f;
        `}
`;

export default function ExpenseAmount({ expenseAmt }) {
  return (
    <StyledExpenseAmt sameUser={user.id === paidByUserId}>
      <FaIndianRupeeSign />
      <span>{expenseAmt}</span>
    </StyledExpenseAmt>
  );
}
