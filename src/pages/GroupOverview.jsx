import React from "react";
import GroupTransactions from "../features/groups/GroupTransactions";
import MainHeader from "../ui/MainHeader";
import useGroupTransactions from "../features/transactions/useGroupTransactions";
import useGroupBalances from "../features/transactions/useGroupBalances";
import useGroupExpenseRelations from "../features/transactions/useGroupExpenseRelations";
import Spinner from "../ui/Spinner";
import useGroupDetails from "../features/groups/useGroupDetails";
import { useParams } from "react-router-dom";
import BalanceTracking from "../features/transactions/BalanceTracking";
import Sidebar from "../ui/Sidebar";
import styled from "styled-components";
import Main from "../ui/Main";

const GroupOverviewContainer = styled.div`
  display: grid;
  grid-template-columns: 70% auto;
  grid-template-rows: auto;
`;

const ScrollableTransactions = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0; /* <-- critical for scroll to work in flexbox */
  padding-right: 8px; /* optional, to avoid scrollbar overlap */
`;

export default function GroupOverview() {
  //console.log("inside Group Overview");
  const { groupId } = useParams();

  // To fetch group details
  const { isLoading: isLoadingGroupDetails } = useGroupDetails({ groupId });

  // To fetch group transactions
  const { isLoading: isLoadingGroupTransactions } = useGroupTransactions({
    groupId,
  });

  // To fetch group balances
  const { isLoading: isLoadingGroupBalances } = useGroupBalances({ groupId });

  // To fetch group relations
  const { isLoading: isLoadingGroupExpenseRelation } = useGroupExpenseRelations(
    { groupId }
  );

  if (
    (groupId && isLoadingGroupTransactions) ||
    isLoadingGroupBalances ||
    isLoadingGroupExpenseRelation ||
    isLoadingGroupDetails
  )
    return <Spinner />;

  return (
    <GroupOverviewContainer>
      <Main>
        <MainHeader />
        <ScrollableTransactions>
          <GroupTransactions />
        </ScrollableTransactions>
      </Main>
      <Sidebar>
        <BalanceTracking />
      </Sidebar>
    </GroupOverviewContainer>
  );
}
