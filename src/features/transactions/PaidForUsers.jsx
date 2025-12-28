import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import Input from "../../ui/Input";
import { useExpenseDetailsContext } from "./ExpenseDetailsContext";
import { useRef } from "react";

const StyledPaidForUsersList = styled.ul`
  margin-top: 0.8rem;
  display: grid;
  gap: 1rem;
`;

const StyledPaidForUser = styled.div`
  ${(props) => {
    props.$ischecked &&
      css`
        opacity: 0.5;
        text-decoration: line-through;
      `;
  }}
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Unit = styled.span`
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  color: gray;
  font-size: 2rem;
  pointer-events: none;
`;

const StyledTotalTarget = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTotalTargetValue = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function PaidForUsers() {
  const { state, dispatch } = useExpenseDetailsContext();
  const {
    selectedSplitType,
    expenseAmount,
    totalTarget,
    paidForUsers,
    splitByUnit,
  } = state;

  const [targetAchieved, setTargetAchieved] = useState(totalTarget);

  const { control, register, reset, handleSubmit, setValue } = useForm({
    defaultValues: {
      paidForUsers: paidForUsers.map((user) => ({ ...user })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "paidForUsers",
  });

  const watchedPaidForUsers = useWatch({
    control,
    name: "paidForUsers",
  });

  // Whenever watched values change, please update the targetAchieved
  useEffect(() => {
    if (watchedPaidForUsers) {
      const tempTargetAchieved = watchedPaidForUsers.reduce((acc, user) => {
        if (selectedSplitType !== "equally") {
          acc += user.splitByShare || 0;
        }
        return acc;
      }, 0);
      setTargetAchieved(tempTargetAchieved);
    }
  }, [watchedPaidForUsers]);

  useEffect(() => {
    reset({ paidForUsers });
  }, [paidForUsers, reset]);

  function handleFormChanges(data) {
    const splitUsersLength = data.paidForUsers.filter((u) => u.isPaying).length;
    dispatch({
      type: "setPaidForUsers",
      payload: {
        watchedPaidForUsers: data.paidForUsers,
        splitUsersLength,
      },
    });
  }

  return (
    <>
      <div>Split {selectedSplitType}</div>
      <form onBlur={handleSubmit(handleFormChanges)}>
        <StyledPaidForUsersList>
          {/* ✅ Map only once — over `fields`, not `paidForUsers` */}
          {fields.map((field, index) => (
            <StyledPaidForUser key={field.id} $ischecked={!field.isPaying}>
              <div>
                {selectedSplitType === "equally" && (
                  <Input
                    type="checkbox"
                    {...register(`paidForUsers.${index}.isPaying`)}
                  />
                )}
                <span>{field.paidForUserName}</span>
              </div>

              <div>
                {selectedSplitType === "equally" ? (
                  <span>{`${field.splitByShare} ${splitByUnit}`}</span>
                ) : (
                  <InputWrapper>
                    <Input
                      type="number"
                      placeholder="Enter share"
                      {...register(`paidForUsers.${index}.splitByShare`, {
                        valueAsNumber: true,
                      })}
                    />
                    <Unit>{splitByUnit}</Unit>
                  </InputWrapper>
                )}
              </div>
            </StyledPaidForUser>
          ))}
          {selectedSplitType !== "equally" && (
            <StyledTotalTarget>
              <span>Total</span>
              <StyledTotalTargetValue>
                <span>{`${
                  targetAchieved ? targetAchieved : 0
                } ${splitByUnit} `}</span>
                <span style={{ color: "gray" }}>
                  {`${
                    targetAchieved ? totalTarget - targetAchieved : totalTarget
                  } ${splitByUnit}  left`}
                </span>
              </StyledTotalTargetValue>
            </StyledTotalTarget>
          )}
        </StyledPaidForUsersList>
      </form>
    </>
  );
}
