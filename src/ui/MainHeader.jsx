import styled from "styled-components";
import Heading from "./Heading";
import Button from "./Button";
import { useLocation, useParams } from "react-router-dom";
import useGroupDetails from "../features/groups/useGroupDetails";
import { useState } from "react";
import Modal from "./Modal";
import AddExpense from "../features/transactions/AddExpense";
import SettleUp from "../features/transactions/settleup/SettleUp";

const StyledMainHeader = styled.div`
  display: flex;
  padding: 1.4rem 2.8rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-grey-300);
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function MainHeader() {
  const [isOpenAddExpense, setIsOpenAddExpense] = useState(false);
  const [openSettleUp, setOpenSettleUp] = useState(false);

  function handleOpenAddExpense() {
    setIsOpenAddExpense((prev) => !prev);
  }

  function handleOpenSettleUp() {
    setOpenSettleUp((prev) => !prev);
  }

  return (
    <StyledMainHeader>
      <Heading as="h2"></Heading>
      <ButtonsContainer>
        <Button onClick={handleOpenAddExpense}>Add an Expense</Button>
        <Button onClick={handleOpenSettleUp}>Settle Up</Button>
      </ButtonsContainer>
      {isOpenAddExpense && (
        <Modal onClose={handleOpenAddExpense} modalTitle="Add an expense">
          <AddExpense onClose={handleOpenAddExpense} />
        </Modal>
      )}

      {openSettleUp && (
        <Modal onClose={handleOpenSettleUp} modalTitle="Settle Up">
          <SettleUp onClose={handleOpenSettleUp} />
        </Modal>
      )}
    </StyledMainHeader>
  );
}
