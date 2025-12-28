import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import BalanceRelations from "./BalanceRelations";
import Modal from "../../ui/Modal";

const BalanceHeading = styled.div`
  padding: 1.2rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-300);
`;

const StyledBalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;

  &:hover {
    cursor: pointer;
    background-color: var(--color-grey-50);
  }
`;

const StyledUserBalance = styled.span`
  ${(props) =>
    props.$userOwes
      ? css`
          color: #cc740f;
        `
      : css`
          color: #30a430;
        `}
`;

const UsersListContainer = styled.div`
  padding: 1rem;
`;

export default function BalanceTracking() {
  const { groupId } = useParams();

  const [balanceRelationsModal, setBalanceRelationModal] = useState(false);

  const [selectedExpenseRelations, setSelectedExpenseRelations] =
    useState(null);

  const { data: groupBalances } = useQuery({
    queryKey: ["groupBalances", groupId],
    queryFn: () => Promise.resolve(), // ✅ dummy fn
    enabled: false, // ✅ don’t fetch, just read + stay reactive
  });

  const { data: groupExpenseRelations } = useQuery({
    queryKey: ["groupExpenseRelations", groupId],
    queryFn: () => Promise.resolve(), // ✅ dummy fn
    enabled: false, // ✅ don’t fetch, just read + stay reactive
  });

  // To set the Balance Relations for the selected User in the sidebar
  const handleBalanceRelationsModal = (gB) => {
    //console.log("groupExpenseRelations", groupExpenseRelations, gB);
    let tempExpenseRelations = [...groupExpenseRelations];
    const expenseRelations = tempExpenseRelations
      .filter(
        (ger) =>
          (ger.userOneId === gB.userId || ger.userTwoId === gB.userId) &&
          ger.relationBalance
      )
      .map((ger) => {
        const {
          userOneId,
          userTwoId,
          userOneName,
          userTwoName,
          relationBalance,
        } = ger;

        if (relationBalance > 0) {
          return {
            owesUserId: userTwoId,
            owesUserName: userTwoName,
            owesToUserId: userOneId,
            owesToUserName: userOneName,
            selectedUser: gB.userId,
            relationBalance,
          };
        }

        if (relationBalance < 0) {
          return {
            owesUserId: userOneId,
            owesUserName: userOneName,
            owesToUserId: userTwoId,
            owesToUserName: userTwoName,
            selectedUser: gB.userId,
            relationBalance: Math.abs(relationBalance),
          };
        }
      });

    setSelectedExpenseRelations(expenseRelations);

    setBalanceRelationModal((prev) => !prev);
  };

  return (
    groupBalances && (
      <div>
        <BalanceHeading>GROUP BALANCES</BalanceHeading>
        <UsersListContainer>
          {groupBalances?.map((gB) => (
            <StyledBalanceContainer
              key={gB.userId}
              onClick={() => handleBalanceRelationsModal(gB)}
            >
              <span>{gB.profileName}</span>
              <StyledUserBalance $userOwes={gB.userBalance < 0}>
                <span>
                  {gB.userBalance
                    ? gB.userBalance < 0
                      ? `owes`
                      : "gets back"
                    : "settled up"}
                </span>
                <span>
                  {gB.userBalance ? ` ₹ ${Math.abs(gB.userBalance)}` : ""}
                </span>
              </StyledUserBalance>
            </StyledBalanceContainer>
          ))}
        </UsersListContainer>
        {balanceRelationsModal && (
          <Modal
            onClose={handleBalanceRelationsModal}
            modalTitle="Suggested Repayments"
          >
            <BalanceRelations
              selectedExpenseRelations={selectedExpenseRelations}
            />
          </Modal>
        )}
      </div>
    )
  );
}
