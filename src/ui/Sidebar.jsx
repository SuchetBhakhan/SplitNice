import styled from "styled-components";
import SideMenu from "../features/general/SideMenu";

const StyledSidebar = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
`;

export default function Sidebar({ children }) {
  return <StyledSidebar>{children}</StyledSidebar>;
}
