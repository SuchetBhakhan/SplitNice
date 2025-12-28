import React from "react";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";

import useGroups from "./useGroups";
import Group from "./Group";
import Spinner from "../../ui/Spinner";

const StyledGroupsList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 1.2rem 2.4rem;
  gap: 1rem;
`;

export default function GroupsList() {
  const queryClient = useQueryClient();
  const groupsList = queryClient.getQueryData(["groups"]);

  // const { isLoading, data, error } = useGroups();
  // const groupsList = data;

  // if (isLoading) return <Spinner />;

  return (
    <StyledGroupsList>
      {groupsList?.map((group) => (
        <Group key={group.groupId} group={group} />
      ))}
    </StyledGroupsList>
  );
}
