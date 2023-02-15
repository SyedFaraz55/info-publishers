import { Badge, Box, Button, Flex, Select, Tag, TagLabel, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
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
      "https://infopubsliher-backend.onrender.com/api/admin/getSchoolsById",
      { id: user?.user?._id }
    );
    console.log(res.data.result);
    setData(res.data.result);
  };

  const handleDelete = async (id) => {
    const result = await axios.post(
      "https://infopubsliher-backend.onrender.com/api/admin/delete-school",
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
  useLayoutEffect(()=> {
    getSchool();
  },[])
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
                      <Td>{item.active ? <Tag colorScheme={"green"}><TagLabel>Active</TagLabel></Tag> : <Tag colorScheme={"red"}><TagLabel>De-active</TagLabel></Tag>}</Td>
                      <Td>
                        <Select onChange={(e) => {
                          const confirm = window.confirm("Are you sure ?");
                          axios.post("https://infopubsliher-backend.onrender.com/api/admin/update-school", { id: item._id, status: e.target.value })
                            .then(res => {
                              if (res.data.ok) {
                                alert(res.data.message);
                                getSchool();
                              } else {
                                alert(res.data.message)
                              }
                            })
                            .catch(err => alert(err.toString()))
                        }}>
                          <option value="">Select</option>
                          <option value={true}>Active</option>
                          <option value={false}>De-active</option>
                        </Select>
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
