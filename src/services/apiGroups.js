import supabase from "./supabase";

export async function createNewGroup(groupDetails) {
  const {
    createdByUserId,
    groupName,
    groupType,
    simplifyGroupDebts,
    groupMembers,
  } = groupDetails;

  const { data, error } = await supabase.rpc("create_new_group", {
    p_createdbyuserid: createdByUserId,
    p_groupname: groupName,
    p_grouptype: groupType,
    p_simplifygroupdebts: simplifyGroupDebts,
    p_groupmembers: groupMembers,
  });

  if (error) {
    throw new Error("Not able to create Group");
  }

  return data;
}

export async function fetchGroups(userEmail) {
  const { data, error } = await supabase.rpc("get_groups_by_member_email", {
    p_email: userEmail,
  });

  //console.log("data inside function", data);
  if (error) {
    throw new Error("Groups could not be loaded");
  }

  return data;
}

export async function fetchGroupDetails(groupId) {
  //console.log("is fetching data");
  const { data, error } = await supabase.rpc(
    "fetch_group_details_with_members",
    { p_group_id: groupId }
  );

  if (error) {
    throw new Error("Could not fetch group details");
  }

  return data;
}

// export async function createNewGroupMembers({
//   groupName,
//   groupType,
//   simplifyGroupDebts,
// }) {
//   const { data, error } = await supabase
//     .from("Groups")
//     .insert([
//       {
//         groupName,
//         groupType,
//         simplifyGroupDebts,
//       },
//     ])
//     .select();

//   return { data, error };
// }
