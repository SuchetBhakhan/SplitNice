import React, { useState } from "react";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { FaPlus } from "react-icons/fa";

import Input from "../../ui/Input";
import Heading from "../../ui/Heading";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import ToggleSwitch from "../../ui/ToggleSwitch";
import useCreateGroup from "./useCreateGroup";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ButtonContainer } from "../../ui/ButtonContainer";

const StyledCreateGroupForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  padding-top: 4rem;
`;

const AddGroupMemberFields = styled.a`
  display: flex;
  align-items: center;
  margin: 1rem 0rem;
`;

const BackIcon = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
  cursor: pointer;
`;

export default function CreateGroupForm() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      groupName: "",
      groupMembers: [
        { groupMemberName: "", groupMemberEmail: "" },
        { groupMemberName: "", groupMemberEmail: "" },
        { groupMemberName: "", groupMemberEmail: "" },
      ],
      groupType: "Home",
      simplifyGroupDebts: true,
    },
  });

  const navigate = useNavigate();
  //To add dynamic fields and make them controlled elements
  const { fields, append, remove } = useFieldArray({
    control,
    name: "groupMembers", // array key
  });

  const { createGroup, isLoading } = useCreateGroup();
  const queryClient = useQueryClient();
  const loggedInUser = queryClient.getQueryData(["user"]);
  const {
    user_metadata: { fullName },
    email,
  } = loggedInUser;

  function handleCreateGroup(groupDetails) {
    const { groupName, groupType, simplifyGroupDebts } = groupDetails;
    //Filter empty groupMembers
    let vaildGroupMembers = groupDetails.groupMembers.filter((groupMember) => {
      return (
        groupMember.groupMemberName.trim() !== "" &&
        groupMember.groupMemberEmail.trim() !== ""
      );
    });

    // Add loggedIn user details
    vaildGroupMembers = [
      ...vaildGroupMembers,
      {
        groupMemberName: fullName,
        groupMemberEmail: email,
      },
    ];

    createGroup({
      groupName,
      groupType,
      simplifyGroupDebts,
      createdByUserId: loggedInUser.id,
      groupMembers: vaildGroupMembers,
    });
  }

  return (
    <>
      <BackIcon onClick={() => navigate("/dashboard")}>
        <IoArrowBack size={20} />
        Go Back
      </BackIcon>
      <StyledCreateGroupForm>
        <Heading as="h2">Start a new group</Heading>
        <Form onSubmit={handleSubmit(handleCreateGroup)}>
          <FormRow label="Group Name">
            <Input
              id="groupName"
              {...register("groupName", { required: "Field is required" })}
            />
            {errors.groupName && (
              <span className="errorMessage">{errors.groupName.message}</span>
            )}
          </FormRow>
          <Heading
            as="h3"
            style={{ padding: "1.5rem 0rem", textAlign: "center" }}
          >
            Add group members
          </Heading>
          <FormRow>
            <Input value={fullName} disabled />
            <Input value={email} disabled />
          </FormRow>
          {fields.map((field, index) => (
            <FormRow key={field.id}>
              <Input
                {...register(`groupMembers.${index}.groupMemberName`)}
                placeholder="Name"
              />
              <Input
                {...register(`groupMembers.${index}.groupMemberEmail`)}
                placeholder="Email"
              />
            </FormRow>
          ))}

          <AddGroupMemberFields
            role="button"
            href="#"
            onClick={() =>
              append({ groupMemberName: "", groupMemberEmail: "" })
            }
          >
            <FaPlus /> <span>Add a person</span>
          </AddGroupMemberFields>

          <FormRow label="Group Type">
            <Select {...register("groupType")}>
              <option>Home</option>
            </Select>
          </FormRow>

          <FormRow label="Simplify Group Debts">
            <Controller
              name="simplifyGroupDebts"
              control={control}
              render={({ field }) => (
                <ToggleSwitch value={field.value} onChange={field.onChange} />
              )}
            />
          </FormRow>
          <ButtonContainer>
            <Button>Save</Button>
          </ButtonContainer>
        </Form>
      </StyledCreateGroupForm>
    </>
  );
}
