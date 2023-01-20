import { Badge, Box, Button, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Layout from "../../../components/Layout";
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
import axiosInstance from "../../../Services/core";
import Router from "next/router";
const School = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const getSchool = async () => {
    const res = await axios.post(
      "http://localhost:8000/api/admin/getSchoolsById",
      { id: user.user?._id }
    );
    console.log(res.data.result);
    setData(res.data.result);
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
    setUser(JSON.parse(localStorage.getItem("@login")));
  }, []);

  useEffect(() => {
    getSchool();
  }, [user]);
  return (
    <Box>
      <Header />
      <Layout>
        <Box p={4}>
          <Flex alignItems={"center"} justifyContent={"space-between"} p={4}>
            <Text fontSize="2xl">Distributor Schools</Text>

            <Button
              onClick={() => (window.location.href = "/schools/add-school")}
              variant={"solid"}
              colorScheme="green"
            >
              Create School
            </Button>
          </Flex>
        </Box>
        <Box p={4}>
          <TableContainer mt={5}>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Status</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((item) => {
                  return (
                    <Tr background={"#fff"} key={item._id}>
                      <Td>{item.name}</Td>
                      <Td>
                        {item.pending ? (
                          <Badge colorScheme="red">Pending</Badge>
                        ) : (
                          <Badge colorScheme={"green"}>Active</Badge>
                        )}
                      </Td>
                      <Td>
                        
                          <Button onClick={() => Router.push(`/schools/view?q=${item._id}`)} variant={"link"} colorScheme="green" >View</Button>
                      </Td>
                      <Td>
                        <Button
                          onClick={() => handleDelete(item)}
                          variant={"link"}
                          colorScheme={"red"}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Layout>
    </Box>
  );
};

export default School;
