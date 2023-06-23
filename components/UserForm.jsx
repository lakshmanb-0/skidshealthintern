"use client";
import { db } from "@/firebase";
import { AtSignIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import validator from "validator";

const UserForm = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const toast = useToast();

  // handle onchange event of input value
  const handleChangeState = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // add data to database
  const AddData = () => {
    updateDoc(doc(db, "Data", "Users"), {
      UserDetails: arrayUnion({
        name: userDetails.name,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
      }),
    });
  };

  // handle submit button of form
  const handleSubmit = (e) => {
    e.preventDefault();
    validator.isEmail(userDetails.email) && userDetails.name !== ""
      ? validator.isMobilePhone(userDetails.phoneNumber)
        ? (AddData(),
          setUserDetails({
            name: "",
            email: "",
            phoneNumber: "",
          }),
          toast({
            title: "User Added",
            status: "success",
            duration: 5000,
            isClosable: true,
          }))
        : toast({
            title: "Enter Correct Number",
            status: "error",
            duration: 5000,
            isClosable: true,
          })
      : toast({
          title: "Enter Correct Name and Email",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
  };

  return (
    <form className="flex flex-col justify-center items-center ">
      <h1 className="text-3xl font-bold pt-2 pb-5">User Form</h1>
      <section className="inputContainer">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AtSignIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            variant="filled"
            placeholder="Name"
            value={userDetails.name}
            name="name"
            onChange={(e) => handleChangeState(e)}
            required
          />
        </InputGroup>

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <EmailIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="email"
            variant="filled"
            placeholder="Email"
            name="email"
            value={userDetails.email}
            onChange={(e) => handleChangeState(e)}
            required
          />
        </InputGroup>

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <PhoneIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="number"
            variant="filled"
            placeholder="Phone number"
            name="phoneNumber"
            value={userDetails.phoneNumber}
            onChange={(e) => handleChangeState(e)}
            required
          />
        </InputGroup>
      </section>
      <Button
        type="submit"
        variant="outline"
        colorScheme="purple"
        onClick={(e) => handleSubmit(e)}
        className="my-3 "
      >
        Add a User
      </Button>
    </form>
  );
};
export default UserForm;
