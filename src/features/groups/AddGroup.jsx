import React from "react";
import styled from "styled-components";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1.5rem;
  flex: 1;

  & p {
    color: var(--color-grey-500);
    text-align: center;
  }
`;

const AddGroupBtn = styled.button`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  width: 30rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  border: none;
`;

export default function AddGroup() {
  const navigate = useNavigate();
  return (
    <AddGroupContainer>
      <p>
        You have not added any groups. <br /> Please create one.
      </p>
      <AddGroupBtn onClick={() => navigate("/groups/new")}>
        <FaUserPlus />
        Start a new group
      </AddGroupBtn>
    </AddGroupContainer>
  );
}
