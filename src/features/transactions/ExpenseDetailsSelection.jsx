import React, { useEffect } from "react";
import styled from "styled-components";
import { css } from "styled-components";
import SelectPaidForUsers from "./SelectPaidForUsers";
import SelectPayer from "./SelectPayer";
import Modal from "../../ui/Modal";

import { useExpenseDetailsContext } from "./ExpenseDetailsContext";

const StyledText = styled.span`
  padding: 0.8rem;
  border-radius: var(--border-radius-lg);

  ${(props) =>
    props.$isdisabled
      ? css`
          background-color: var(--color-grey-disabled-bg);
          border: dashed var(--color-grey-disabled-border);
          color: var(--color-grey-disabled-text);
          cursor: not-allowed;
          pointer-events: none;
          opacity: 0.7;
        `
      : css`
          background-color: var(--color-grey-50);
          border: dashed;
          color: var(--color-green-100);
          cursor: pointer;
        `}
`;

const StyledExpenseData = styled.div`
  text-align: center;
  grid-column: span 3;
  margin: 1rem 0rem;
`;

export default function ExpenseDetailsSelection() {
  const { state, dispatch } = useExpenseDetailsContext();

  const {
    paidByUser,
    loggedInUser,
    selectedSplitType,
    payerModal,
    paidForUsersModal,
    expenseAmount,
    paidForUsers,
  } = state;

  function onSelectPayer() {
    dispatch({ type: "setPayerModal" });
  }

  function onSelectPaidFor() {
    dispatch({ type: "setPaidForUsersModal" });
  }

  return (
    <>
      <StyledExpenseData>
        Paid by &nbsp;
        <StyledText onClick={onSelectPayer}>
          {paidByUser.paidByUserId === loggedInUser.id
            ? "You"
            : paidByUser.paidByUserName}
        </StyledText>
        &nbsp; and split &nbsp;
        <StyledText onClick={onSelectPaidFor} $isdisabled={!expenseAmount}>
          {selectedSplitType}
        </StyledText>
      </StyledExpenseData>

      {payerModal ? (
        <Modal onClose={onSelectPayer} modalTitle="Select Payer">
          <SelectPayer
            state={state}
            dispatch={dispatch}
            setUserType="selectPayer"
          />
        </Modal>
      ) : (
        paidForUsersModal && (
          <Modal onClose={onSelectPaidFor} modalTitle="Choose Split Options">
            <SelectPaidForUsers />
          </Modal>
        )
      )}
    </>
  );
}
