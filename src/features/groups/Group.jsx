import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledGroup = styled.li``;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    font-size: 1.6rem;
    font-weight: 500;
    transition: all 0.3s;
  }

  &.active {
    color: #30a430;
  }

  &:hover,
  &:active {
    color: #30a430;
  }
`;

export default function Group({ group }) {
  const { groupId, groupName } = group;
  return (
    <StyledGroup>
      <StyledNavLink to={`/groups/${groupId}`}>{groupName}</StyledNavLink>
    </StyledGroup>
  );
}
