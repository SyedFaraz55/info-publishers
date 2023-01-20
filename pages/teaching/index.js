import { Alert, Badge, Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
const Teaching = () => {
  const [data, setData] = useState([]);
  const getLessons = async () => {
    const res = await axios.get("http://localhost:8000/api/admin/get-lessons");
    console.log(res.data.data);
    setData(res.data.data);
  };

  const handleDelete = async (id) => {
    const result = await axios.post(
      "http://localhost:8000/api/admin/delete-school",
      { id: id._id }
    );
    if (result.data.ok) {
      alert("School Deleted");
      getSchool();
    } else {
      new Error("Failed to delete");
    }
  };

  useEffect(() => {
    getLessons();
  }, []);
  return (
    <Container mt={10}>
    <Alert variant={"solid"} colorScheme="blue">
     Page is under construction
 </Alert>
</Container>
  );
};

export default Teaching;
