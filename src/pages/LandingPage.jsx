import React from "react";
import styled from "styled-components";
import Button from "../ui/Button";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Logout from "../features/authentication/Logout";

const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-grey-50);
`;

const AppHeading = styled.span`
  font-size: 2.5rem;
  font-weight: 400;
`;

const LoginNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-grey-0);
  border-top: 1px inset solid var(--color-grey-300);
  border-bottom: 1px solid var(--color-grey-300);
  padding: 1rem 2rem;
  color: #0fba4a;
  font-weight: 500;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export default function LandingPage() {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  // if (!isAuthenticated && !isLoading) navigate("/login")

  return (
    <LoginLayout>
      <LoginNav>
        <AppHeading>SplitNice</AppHeading>
        {!isAuthenticated ? (
          <ButtonsContainer>
            <Button onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/signup")}>Sign up</Button>
          </ButtonsContainer>
        ) : (
          <Logout />
        )}
      </LoginNav>

      <Outlet />
    </LoginLayout>
  );
}
