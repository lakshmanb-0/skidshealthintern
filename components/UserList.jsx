"use client";
import { db } from "@/firebase";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const UserList = () => {
  const [usersData, setUsersData] = useState([]);
  const [oldData, setOldData] = useState({});
  const [updateForm, setUpdateForm] = useState(false);

  const docRefresh = doc(db, "Data", "Users");

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
  }, [docRefresh]);

  // deleteUser
  const deleteUser = async (item) => {
    const docRef = doc(db, "Data", "Users");
    await updateDoc(docRef, {
      UserDetails: arrayRemove(item),
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold py-3">User Lists:</h1>
      <div className="flex gap-4 px-4 flex-wrap">
        {usersData?.map((item, index) => (
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
                onClick={() => (setUpdateForm(true), setOldData(item))}
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
        ))}
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
              <UpdateForm oldData={oldData} updateForm={updateForm} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default UserList;
