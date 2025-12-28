import { useMutation } from "@tanstack/react-query";
import { createNewGroup } from "../../services/apiGroups";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useCreateGroup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createGroup, isLoading } = useMutation({
    mutationFn: (groupDetails) => createNewGroup(groupDetails),
    onSuccess: (data) => {
      toast.success("New Group Created");
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      navigate(`/groups/${data[0].groupId}`);
    },
    onError: (error) => {
      toast.error("Error while creating groups");
    },
  });
  return { createGroup, isLoading };
}
