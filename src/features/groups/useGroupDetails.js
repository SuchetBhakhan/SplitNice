import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { fetchGroupDetails } from "../../services/apiGroups";

export default function useGroupDetails({ groupId, enabled = true } = {}) {
  const {
    data: groupDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["groupDetails", groupId],
    queryFn: () => fetchGroupDetails(groupId),
    //queryFn: fetchGroupDetails(groupId),
    enabled: !!groupId && enabled,
  });

  return { isLoading, error, groupDetails };
}
