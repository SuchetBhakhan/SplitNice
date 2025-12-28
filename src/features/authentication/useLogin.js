import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAuth } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAuth({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {},
  });

  return { login, isLoading };
}
