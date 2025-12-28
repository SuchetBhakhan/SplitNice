import React from "react";
import styled from "styled-components";
import { useExpenseDetailsContext } from "./ExpenseDetailsContext";

const PayerList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 0.8rem;
`;

const PayerListMember = styled.li`
  cursor: pointer;
  padding: 0.6rem;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  &:hover {
    //background-color: var(--color-grey-50);
  }
`;

export default function SelectPayer({ state, dispatch, setUserType }) {
  //const { state, dispatch } = useExpenseDetailsContext();
  const { groupMembers } = state;

  return (
    <PayerList>
      {groupMembers.map((groupMember) => (
        <PayerListMember
          key={groupMember.userId}
          onClick={() =>
            setUserType === "selectPayer"
              ? dispatch({
                  type: "setPaidByUser",
                  payload: {
                    paidByUserName: groupMember.groupMemberName,
                    paidByUserId: groupMember.userId,
                  },
                })
              : dispatch({
                  type: "setPaidForUser",
                  payload: {
                    paidForUserName: groupMember.groupMemberName,
                    paidForUserId: groupMember.userId,
                  },
                })
          }
        >
          {groupMember.groupMemberName}
        </PayerListMember>
      ))}
    </PayerList>
  );
}
