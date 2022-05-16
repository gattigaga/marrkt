import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

type Response = void;

const postSignOut = async (): Promise<Response> => {
  await axios.post("/api/auth/signout");
};

const useSignOutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(postSignOut, {
    onMutate: async () => {
      await queryClient.cancelQueries("me");

      queryClient.setQueryData("me", null);
    },
  });
};

export default useSignOutMutation;
