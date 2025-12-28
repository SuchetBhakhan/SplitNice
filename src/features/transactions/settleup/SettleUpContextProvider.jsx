import React, { createContext, useContext, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "setPayerModal":
      return {
        ...state,
        payerModal: !state.payerModal,
      };
    case "setRecipientModal":
      return {
        ...state,
        recipientModal: !state.recipientModal,
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
    case "setPaidForUser":
      const { paidForUserId, paidForUserName } = action.payload;
      return {
        ...state,
        paidForUser: {
          paidForUserId,
          paidForUserName,
        },
        recipientModal: !state.recipientModal,
      };
    case "setExpenseAmount":
      return {
        ...state,
        expenseAmount: action.payload,
      };

    default:
      return state;
  }
}

const SettleUpDetailsContext = createContext();

export default function SettleUpContextProvider({ children, initialState }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SettleUpDetailsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettleUpDetailsContext.Provider>
  );
}

export function useSettleUpDetailsContext() {
  return useContext(SettleUpDetailsContext);
}
