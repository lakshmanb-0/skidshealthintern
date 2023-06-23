import { db } from "@/firebase";
import { AtSignIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

const UpdateForm = ({ oldData }) => {
  // user data
  const [userDetails, setUserDetails] = useState({
    name: oldData.name,
    email: oldData.email,
    phoneNumber: oldData.phoneNumber,
  });

  //   updating user new information
  const updateUser = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "Data", "Users");
    await updateDoc(docRef, {
      UserDetails: arrayRemove(oldData),
    });

    await updateDoc(docRef, {
      UserDetails: arrayUnion({
        name: userDetails.name,
        email: userDetails.email,
        phoneNumber: userDetails.phoneNumber,
      }),
    });
  };

  //   handle onchange event of input
  const handleChangeState = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
