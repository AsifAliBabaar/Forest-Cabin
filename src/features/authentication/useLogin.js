import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const query = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      query.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
      console.log(user);
    },
    onError: (err) => {
      ("Error", err);
      toast.error("Provided email or Password is Incorrect!!");
    },
  });

  return { login, isLoading };
}
