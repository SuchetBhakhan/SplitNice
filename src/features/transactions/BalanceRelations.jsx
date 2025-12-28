import React from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import styled, { css } from "styled-components";

const StyledRelationList = styled.ul`
  padding-top: 1rem;
  list-style-type: disc; /* adds bullet points */
`;

const StyledRelationText = styled.li`
  display: flex;
  gap: 0.8rem;
  padding-bottom: 0.8rem;

  &::marker {
    color: #4f46e5;
  }
`;
const StyledExpenseAmt = styled.span`
  ${(props) =>
    props.$isOwing
      ? css`
          color: #cc740f;
        `
      : css`
          color: #30a430;
        `}
  display:flex;
  align-items: center;
`;

export default function BalanceRelations({ selectedExpenseRelations }) {
  //console.log("selected", selectedExpenseRelations);
  return (
    <div>
      <StyledRelationList>
        {selectedExpenseRelations.map((eR) => (
          <StyledRelationText>
            <span>{eR.owesUserName} owes</span>
            <StyledExpenseAmt $isOwing={eR.owesToUserId !== eR.selectedUser}>
              ₹{eR.relationBalance}
            </StyledExpenseAmt>
            <span>to {eR.owesToUserName}</span>
          </StyledRelationText>
        ))}
      </StyledRelationList>
    </div>
  );
}
