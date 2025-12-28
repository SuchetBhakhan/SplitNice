import React from "react";
import styled from "styled-components";

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-300);
  height: 100vh; /* full page height */
`;

export default function Main({ children }) {
  return <StyledMain>{children}</StyledMain>;
}
