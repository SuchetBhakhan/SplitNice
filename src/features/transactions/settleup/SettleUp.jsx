import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import SettleUpForm from "./SettleUpForm";
import SettleUpContextProvider from "./SettleUpContextProvider";

export default function SettleUp({ onClose }) {
  //Extracting UserData using Query Key
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  //Extracting GroupMembers using Query key
  const { groupId } = useParams();
  const groupDetails = queryClient.getQueryData(["groupDetails", groupId]);
  const { groupMembers } = groupDetails?.[0];

  const initialState = {
    payerModal: false,
    recipientModal: false,
    paidByUser: {
      paidByUserId: user.id,
      paidByUserName: user.user_metadata.fullName,
    },
    paidForUser: {
      paidForUserId: groupMembers[0].userId,
      paidForUserName: groupMembers[0].groupMemberName,
    },

    expenseAmount: 0,
    groupMembers,
  };

  return (
    <SettleUpContextProvider initialState={initialState}>
      <SettleUpForm onClose={onClose} />
    </SettleUpContextProvider>
  );
}
