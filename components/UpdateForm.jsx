"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { reset, updateState } from "@/store/userSlice";
import { AtSignIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";

const UpdateForm = ({ handleUpdateForm }) => {
  const dispatch = useDispatch();
  const UserData = useSelector((state) => state.user);
  const [oldUserData, setOldUserData] = useState({});
  const toast = useToast();

  // collecting old user data before render to updateForm component
  useEffect(() => {
    setOldUserData(UserData);
  }, []);

  //   updating user new information
  const updateUser = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "Data", "Users");
    await updateDoc(docRef, {
      UserDetails: arrayRemove(oldUserData),
    });
    await updateDoc(docRef, {
      UserDetails: arrayUnion(UserData),
    });
    dispatch(reset());
    handleUpdateForm(false);
    toast({
      title: "User Updated",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  //   handle onchange event of input
  const handleChangeState = (e) => {
    const { name, value } = e.target;
    dispatch(updateState({ name, value }));
  };

  return (
    <form>
      <section className="inputContainer">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <AtSignIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            variant="filled"
            placeholder="Name"
            value={UserData.name}
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
            value={UserData.email}
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
            value={UserData.phoneNumber}
            onChange={(e) => handleChangeState(e)}
            required
          />
        </InputGroup>
      </section>
      <Button
        type="submit"
        colorScheme="green"
        onClick={(e) => updateUser(e)}
        className="bg-green-600 w-full mx-auto my-4"
      >
        Update
      </Button>
    </form>
  );
};

export default UpdateForm;
