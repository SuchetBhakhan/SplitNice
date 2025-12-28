import { createContext, useContext, useReducer } from "react";

function getUpdatedPaidForUsers(state, splitOption) {
  let updatedExpense;
  let tempPaidForUsers;

  const { expenseAmount } = state;

  if (splitOption === "equally") {
    tempPaidForUsers = state.expenseAmount
      ? state.paidForUsers.map((paidForUser) => {
          return {
            ...paidForUser,
            splitByShare: Number(
              state.expenseAmount / state.paidForUsers.length
            ).toFixed(2),
          };
        })
      : state.paidForUsers;

    updatedExpense = {
      paidForUsers: tempPaidForUsers,
      spltByUnit: "₹",
    };
  }

  if (splitOption === "unequally") {
    tempPaidForUsers = state.paidForUsers.map((paidForUser) => {
      return {
        ...paidForUser,
        splitByShare: 0,
        isPaying: true,
      };
    });

    updatedExpense = {
      paidForUsers: tempPaidForUsers,
      splitByUnit: "₹",
      totalTarget: expenseAmount,
    };
  }

  if (splitOption === "percentage") {
    tempPaidForUsers = state.paidForUsers.map((paidForUser) => {
      return {
        ...paidForUser,
        splitByShare: 0,
        isPaying: true,
      };
    });

    updatedExpense = {
      paidForUsers: tempPaidForUsers,
      splitByUnit: "%",
      totalTarget: 100,
    };
  }

  return updatedExpense;
}

function reducer(state, action) {
  switch (action.type) {
    case "setPayerModal":
      return {
        ...state,
        payerModal: !state.payerModal,
      };
    case "setPaidForUsersModal":
      return {
        ...state,
        paidForUsersModal: !state.paidForUsersModal,
      };
    case "setPaidByUser":
      const { paidByUserId, paidByUserName } = action.payload;
      return {
        ...state,
        paidByUser: {
          paidByUserId,
          paidByUserName,
        },
        payerModal: !state.payerModal,
      };
    case "setSplitType":
      const { splitOption } = action.payload;

      const updatedExpense = getUpdatedPaidForUsers(state, splitOption);

      return {
        ...state,
        ...updatedExpense,
        selectedSplitType: splitOption,
      };
    case "setExpenseAmount":
      const { expenseAmount } = action.payload;

      let tempPaidForUsers;

      if (state.selectedSplitType === "equally") {
        tempPaidForUsers = state.paidForUsers.map((paidForUser) => {
          return {
            ...paidForUser,
            splitByShare: !expenseAmount
              ? 0
              : Number(expenseAmount / state.paidForUsers.length).toFixed(2),
          };
        });
      }

      // In case of other split types then tempPaidForUsers will be undefined
      tempPaidForUsers = tempPaidForUsers ?? state.paidForUsers;

      return {
        ...state,
        paidForUsers: tempPaidForUsers,
        expenseAmount: !expenseAmount ? 0 : Number(expenseAmount),
      };
    case "setPaidForUsers":
      const { watchedPaidForUsers, splitUsersLength } = action.payload;

      return {
        ...state,
        paidForUsers:
          state.selectedSplitType === "equally"
            ? watchedPaidForUsers.map((user) => {
                return {
                  ...user,
                  splitByShare: user.isPaying
                    ? Number(state.expenseAmount / splitUsersLength).toFixed(2)
                    : 0,
                };
              })
            : watchedPaidForUsers,
      };
    default:
      return state;
  }
}

const ExpenseDetailsContext = createContext();

export function ExpenseContextProvider({ children, initialState }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ExpenseDetailsContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseDetailsContext.Provider>
  );
}

export function useExpenseDetailsContext() {
  return useContext(ExpenseDetailsContext);
}

// // 👇 Debug log here
// console.log("Exports from ExpenseDetailsContext:", {
//   ExpenseContextProvider,
// });
