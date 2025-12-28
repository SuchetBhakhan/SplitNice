import React from "react";
import styled from "styled-components";
import CreateGroupForm from "../features/groups/CreateGroupForm";

const StyledCreateNewGroup = styled.div`
  background-color: var(--color-grey-50);
  flex: 1;
`;

export default function CreateNewGroup() {
  return (
    <StyledCreateNewGroup>
      <CreateGroupForm />
    </StyledCreateNewGroup>
  );
}
