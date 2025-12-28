import React from "react";
import { useExpenseDetailsContext } from "./ExpenseDetailsContext";
import styled from "styled-components";

const StyledSplitOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-radius: 0.2rem;
  place-items: center;
  cursor: pointer;
  margin: 0.8rem 0rem;
`;

const StyledSplitOption = styled.div`
  background-color: var(--color-grey-50);
  padding: 0.5rem;
`;

export default function SplitOptions() {
  //console.log("inside SplitOption");
  const { state, dispatch } = useExpenseDetailsContext();
  const { splitOptions } = state;
  return (
    <StyledSplitOptions>
      {splitOptions.map((splitOption) => (
        <StyledSplitOption
          key={splitOption}
          onClick={() =>
            dispatch({ type: "setSplitType", payload: { splitOption } })
          }
        >
          {splitOption}
        </StyledSplitOption>
      ))}
    </StyledSplitOptions>
  );
}
