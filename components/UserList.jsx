"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import UpdateForm from "./UpdateForm";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  IconButton,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { add, reset } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const UserList = () => {
  const [usersData, setUsersData] = useState([]);
  const [updateForm, setUpdateForm] = useState(false);
  const userUpdated = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();

  // get data at time
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      const docRef = doc(db, "Data", "Users");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        docSnap.data().UserDetails?.map((value) => {
          list.push(value);
        });
        setUsersData(list);
      }
    };
    fetchData();
  }, [userUpdated]);

  // deleteUser
  const deleteUser = async (item) => {
    const docRef = doc(db, "Data", "Users");
    await updateDoc(docRef, {
      UserDetails: arrayRemove(item),
    });
    dispatch(add(item));
    dispatch(reset());
    toast({
      title: "User Deleted",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  //callback for close modal form or updateForm
  const handleUpdateForm = (prop) => {
    setUpdateForm(prop);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold py-3">User Lists:</h1>
      <div className="flex gap-4 px-4 flex-wrap">
        {usersData.length != 0 ? (
          usersData?.map((item, index) => (
            <Card align="center" key={index} className="w-[300px]">
              <CardHeader>
                <Heading size="md"> {item.name}</Heading>
              </CardHeader>
              <CardBody className="text-center ">
                <Text>{item.email}</Text>
                <Text>{item.phoneNumber}</Text>
              </CardBody>
              <CardFooter className="flex gap-4">
                <IconButton
                  colorScheme="green"
                  onClick={() => (setUpdateForm(true), dispatch(add(item)))}
                  icon={<EditIcon />}
                  className="bg-green-600"
                ></IconButton>
                <IconButton
                  colorScheme="red"
                  onClick={() => deleteUser(item)}
                  icon={<DeleteIcon />}
                  className="bg-red-600"
                ></IconButton>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Card
            align="center"
            className="w-[300px] h-[200px] grid justify-center items-center"
          >
            <Heading size="lg"> Add some Users</Heading>
          </Card>
        )}
      </div>

      {updateForm && (
        <Modal isOpen={updateForm}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Form</ModalHeader>
            <ModalCloseButton
              onClick={() => {
                setUpdateForm(false);
              }}
            />
            <ModalBody>
              <UpdateForm handleUpdateForm={handleUpdateForm} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default UserList;
