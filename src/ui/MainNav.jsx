import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa6";
import AddUserContainer from "./AddUserContainer";
import GroupsList from "../features/groups/GroupsList";
import FriendsList from "../features/friends/FriendsList";

const StyledMainNav = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    background-color: var(--color-grey-50);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    /* background-color: var(--color-grey-50); */
    border-radius: var(--border-radius-sm);
  }
`;

const NavHeading = styled.li`
  display: flex;
  align-items: center;
  padding: 1.2rem 2.4rem;
  justify-content: space-between;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-300);
`;

export default function MainNav() {
  const navigate = useNavigate();
  return (
    <StyledMainNav>
      <NavList>
        <NavHeading>
          <span>GROUPS</span>
          <AddUserContainer
            onClick={() => navigate("/groups/new", { replace: true })}
          >
            <FaPlus />
            <span>Add</span>
          </AddUserContainer>
        </NavHeading>
        <GroupsList />
      </NavList>
    </StyledMainNav>
  );
}
