import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useState } from "react";
import { useLogin } from "./useLogin";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading } = useLogin();

  function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) return;

    login({ email, password });
  }

  return (
    <Form style={{ minWidth: "40rem" }} onSubmit={handleLogin}>
      <FormRowVertical label="Email address" error={""}>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormRowVertical>
      <FormRowVertical label="Password" error={""}>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button>Login</Button>
      </FormRowVertical>
    </Form>
  );
}
