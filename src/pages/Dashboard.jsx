import React, { useEffect } from "react";
import { useQueryClient, useIsFetching } from "@tanstack/react-query";

import Button from "../ui/Button";
import AddGroup from "../features/groups/AddGroup";
import SettledUp from "../ui/SettledUp";
import Spinner from "../ui/Spinner";
import UserDashboard from "../features/dashboard/UserDashboard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const groups = queryClient.getQueryData(["groups"]);
  const groupExists = queryClient.getQueryData(["groups"])?.length > 0;

  // To redirect to a particular group if group exists
  useEffect(() => {
    if (groupExists) navigate(`/groups/${groups[0].groupId}`);
  }, []);

  return !groupExists && <AddGroup />;
}
