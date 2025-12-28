import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useSignUp() {
  const navigate = useNavigate();

  const { mutate: signUpUser, isLoading } = useMutation({
    mutationFn: (userData) => signup(userData),
    onSuccess: (data) => {
      navigate("/login", { replace: true });
      toast.success("User added successfully");
    },
    onError: (error) => {},
  });

  return { signUpUser, isLoading };
}
