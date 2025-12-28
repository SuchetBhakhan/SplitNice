import styled from "styled-components";
import Heading from "../ui/Heading";
import LoginForm from "../features/authentication/LoginForm";

const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  //min-height: 88vh;
`;

function Login() {
  return (
    <LoginContainer>
      <Heading as="h2">Log in to your account</Heading>
      <LoginForm />
      {/* <Button onClick={() => navigate("/signup")}>Sign up Now</Button> */}
    </LoginContainer>
  );
}

export default Login;
