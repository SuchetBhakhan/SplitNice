import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignUp from "./useSignup";

export default function SignupForm() {
  //initialize the form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // watch the password field so we can compare
  const password = watch("password");

  //Get Mutation function
  const { signUpUser, isLoading } = useSignUp();

  function handleSignUp(userData) {
    signUpUser(userData);
  }

  return (
    <Form onSubmit={handleSubmit(handleSignUp)}>
      <FormRow label="Full Name">
        <Input {...register("fullName", { required: "Field is required" })} />
        {errors.fullName && (
          <span className="errorMessage">{errors.fullName.message}</span>
        )}
      </FormRow>
      <FormRow label="Email address">
        <Input
          {...register("email", {
            required: "Field is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
        />
        {errors.email && (
          <span className="errorMessage">{errors.email.message}</span>
        )}
      </FormRow>
      <FormRow label="Phone number">
        <Input
          {...register("phoneNumber", {
            required: "Field is required",
            pattern: {
              value: /^[6-9]\d{9}$/, // starts with 6-9 and must be exactly 10 digits
              message: "Enter a valid 10-digit phone number",
            },
          })}
        />
        {errors.phoneNumber && (
          <span className="errorMessage">{errors.phoneNumber.message}</span>
        )}
      </FormRow>
      <FormRow label="Password">
        <Input
          type="password"
          {...register("password", {
            required: "Field is required",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: "Please set valid password",
            },
          })}
        />
        {errors.password && (
          <span className="errorMessage">{errors.password.message}</span>
        )}
      </FormRow>
      <FormRow label="Confirm Password">
        <Input
          type="password"
          {...register("confirmPassword", {
            required: "Field is required",
            validate: (value) => value === password || "password do not match",
          })}
        />
        {errors.confirmPassword && (
          <span className="errorMessage">{errors.confirmPassword.message}</span>
        )}
      </FormRow>
      <FormRow>
        <Button>Done</Button>
      </FormRow>
    </Form>
  );
}
