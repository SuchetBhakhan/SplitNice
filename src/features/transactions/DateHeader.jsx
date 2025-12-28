import React from "react";
import styled from "styled-components";

const StyledDateHeader = styled.div`
  background-color: var(--color-grey-50);
  border-top: 1px solid var(--color-grey-300);
  border-bottom: 1px solid var(--color-grey-300);
  font-size: 1.4rem;
  padding: 0.7rem;
`;

export default function DateHeader({ month, year }) {
  return <StyledDateHeader>{month + " " + year}</StyledDateHeader>;
}
