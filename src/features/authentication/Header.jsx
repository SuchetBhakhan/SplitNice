import styled from "styled-components";
import Logout from "./Logout";

const StyledHeader = styled.div`
  grid-column: span 3;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
`;

export default function Header() {
  return (
    <StyledHeader>
      <Logout />
    </StyledHeader>
  );
}
