import React from "react";
import styled from "styled-components";

const StyledRelationDesc = styled.li`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
`;

const UserText = styled.span`
  font-size: 18px;
  color: #cc740f;
`;

const RelationAmt = styled.span`
  font-size: 18px;
  color: #cc740f;
`;

export default function ExpenseRelationDesc({ user, relation, amount }) {
  return (
    <StyledRelationDesc>
      <UserText>{user}</UserText>
      <span>{relation}</span>
      <RelationAmt>{amount}</RelationAmt>
    </StyledRelationDesc>
  );
}
