export function createExpenseRelationsMap(groupExpenseRelations) {
  // console.log("Need to create a new map ", groupExpenseRelations);

  const tempMap = new Map();

  // for (const {
  //   userOneId,
  //   userTwoId,
  //   relationBalance,
  // } of groupExpenseRelations) {
  //   const [idA, idB] = [userOneId, userTwoId].sort();

  //   if (!tempMap.has(idA)) {
  //     tempMap.set(idA, new Map());
  //   }

  //   tempMap.get(idA).set(idB, 0);
  // }

  //console.log("After creating a new map ", tempMap);
  // Initialize from your array
  for (const {
    userOneId,
    userTwoId,
    relationBalance,
  } of groupExpenseRelations) {
    if (!tempMap.has(userOneId)) {
      tempMap.set(userOneId, new Map());
    }
    tempMap.get(userOneId).set(userTwoId, 0);
  }

  return tempMap;
}

export function calcPaidForUsers(
  paidForUsers,
  selectedSplitType,
  expenseAmount
) {
  let totalPaidForShare = 0;
  let tempPaidForUsers;

  if (selectedSplitType === "equally" || selectedSplitType === "unequally") {
    tempPaidForUsers = paidForUsers.map((pfu) => {
      totalPaidForShare += pfu.splitByShare;
      return {
        ...pfu,
        paidForUserShare: pfu.splitByShare,
      };
    });
  }

  if (selectedSplitType === "percentage") {
    totalPaidForShare =
      totalPaidForShare + (pfu.splitByShare * expenseAmount) / 100;
    tempPaidForUsers = paidForUsers.map((pfu) => {
      return {
        ...pfu,
        paidForUserShare: (pfu.splitByShare * expenseAmount) / 100,
      };
    });
  }

  return [tempPaidForUsers, totalPaidForShare];
}

export function calcUpdatedBalanceMap(
  groupBalancesMap,
  finalPaidForUsers,
  transactionType,
  paidByUser,
  expenseAmount
) {
  if (transactionType === "addExpense") {
    finalPaidForUsers.map((fpfu) => {
      if (fpfu.paidForUserId === paidByUser.paidByUserId) {
        groupBalancesMap.set(
          fpfu.paidForUserId,
          (groupBalancesMap.get(fpfu.paidForUserId) ?? 0) +
            Number(expenseAmount) -
            fpfu.paidForUserShare
        );
      } else {
        groupBalancesMap.set(
          fpfu.paidForUserId,
          (groupBalancesMap.get(fpfu.paidForUserId) ?? 0) -
            fpfu.paidForUserShare
        );
      }
    });
  }

  if (transactionType === "settleUp") {
    const { paidByUserId } = paidByUser;
    const [{ paidForUserId }] = finalPaidForUsers;

    groupBalancesMap.set(
      paidForUserId,
      (groupBalancesMap.get(paidForUserId) ?? 0) - Number(expenseAmount)
    );

    groupBalancesMap.set(
      paidByUserId,
      (groupBalancesMap.get(paidByUserId) ?? 0) + Number(expenseAmount)
    );
  }
}

function updateRelation(map, id1, id2, transactionAmt) {
  const absAmt = Math.abs(transactionAmt);
  const rel1 = map.get(id1);
  const rel2 = map.get(id2);

  if (rel1?.has(id2)) {
    rel1.set(id2, absAmt);
  } else if (rel2?.has(id1)) {
    rel2.set(id1, -absAmt);
  }
}

export function simplifyDebts(groupBalancesMap, groupExpenseRelationsMap) {
  // Convert to array, sort, then rebuild the map
  const groupBalances = new Map(
    Array.from(groupBalancesMap.entries()).sort(([idA, balA], [idB, balB]) => {
      if (balA >= 0 && balB >= 0) {
        // both positive → descending
        return balB - balA;
      } else if (balA < 0 && balB < 0) {
        // both negative → ascending
        return balA - balB;
      } else {
        // positives first
        return balA >= 0 ? -1 : 1;
      }
    })
  );

  // Convert the sorted group balances map to array
  const entries = [...groupBalances.entries()];

  const groupBalancesLen = entries.length;

  // Update Expense Relations Logic
  for (let i = 0; i < groupBalancesLen; i++) {
    let [id1, bal1] = entries[i];
    if (bal1 <= 0) break;
    for (let j = i + 1; j < groupBalancesLen; j++) {
      let [id2, bal2] = entries[j];

      if (bal1 !== 0 && bal2 < 0) {
        let transactionAmt;
        let temp1 = bal1;
        let temp2 = bal2;
        let temptotal = temp1 + temp2;

        bal1 = temptotal <= 0 ? 0 : temptotal;
        bal2 = bal1 > 0 ? 0 : temptotal;

        entries[i][1] = bal1;
        entries[j][1] = bal2;

        transactionAmt = Math.abs(temp2) - Math.abs(bal2);

        updateRelation(groupExpenseRelationsMap, id1, id2, transactionAmt);
      }
    }
  }
}

export function createExpenseData(
  paidForUsers,
  selectedSplitType,
  transactionType,
  paidByUser,
  expenseAmount,
  groupBalancesMap,
  groupExpenseRelationsMap
) {
  //To Calculate paidFor users amount from splitByShare based on selected split Type

  const [finalPaidForUsers, totalPaidForShare] =
    transactionType === "addExpense"
      ? calcPaidForUsers(paidForUsers, selectedSplitType, expenseAmount)
      : [paidForUsers, expenseAmount];

  //To calculate updated Balance value on adding new transaction
  calcUpdatedBalanceMap(
    groupBalancesMap,
    finalPaidForUsers,
    transactionType,
    paidByUser,
    expenseAmount
  );

  //Simplify Debts Logic
  simplifyDebts(groupBalancesMap, groupExpenseRelationsMap);

  return [finalPaidForUsers, totalPaidForShare];
}
