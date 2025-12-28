import styled from "styled-components";
import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";
import Button from "../ui/Button";

const SignupLayout = styled.div`
  flex: 1;
  background-color: var(--color-grey-50);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

export default function Signup() {
  return (
    <SignupLayout>
      <Heading as="h2">Sign up</Heading>
      <SignupForm />
    </SignupLayout>
  );
}
