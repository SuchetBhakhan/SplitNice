import supabase from "./supabase";

export async function fetchGroupTransactions(groupId) {
  const { data, error } = await supabase.rpc("fetch_group_transactions", {
    p_group_id: groupId,
  });

  if (error) {
    throw new Error("Could not fetch group transactions");
  }

  return data;
}

export async function fetchGroupBalances(groupId) {
  const { data, error } = await supabase.rpc(
    "fetch_user_balances_by_group_with_profiles",
    {
      p_group_id: groupId,
    }
  );

  if (error) {
    throw new Error("Could not fetch group balances");
  }

  return data;
}

export async function fetchGroupExpenseRelations(groupId) {
  //console.log("fetching group expense relations");
  const { data, error } = await supabase.rpc("fetch_group_relations", {
    p_group_id: groupId,
  });

  if (error) {
    throw new Error("Could not fetch group Expense Relations");
  }

  return data;
}

export async function createExpenseTransaction(expenseData) {
  const {
    expenseTransaction,
    finalPaidForUsers,
    groupBalancesUpdates,
    groupExpenseRelationsUpdates,
  } = expenseData;

  const { data, error } = await supabase.rpc("insert_expense_transaction", {
    p_expensetransaction: expenseTransaction,
    p_paidforusers: finalPaidForUsers,
    p_groupbalancesupdates: groupBalancesUpdates,
    p_groupexpenserelationsupdates: groupExpenseRelationsUpdates,
  });

  if (error) {
    throw new Error("Could not isnert group Expense");
  }

  return data;
}
