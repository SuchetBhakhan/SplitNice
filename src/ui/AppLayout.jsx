import { Outlet } from "react-router-dom";
import styled from "styled-components";

import useGroups from "../features/groups/useGroups";
import MainNav from "./MainNav";
import Spinner from "./Spinner";

const StyledAppLayout = styled.div`
  /* min-height: 88vh; */
  flex: 1;
  display: grid;
  grid-template-columns: auto 80%;
  grid-template-rows: 1fr;
`;

export default function AppLayout() {
  const { isLoading: isLoadingGroups } = useGroups();

  if (isLoadingGroups) return <Spinner />;

  return (
    <StyledAppLayout>
      <MainNav />
      <Outlet />
    </StyledAppLayout>
  );
}
