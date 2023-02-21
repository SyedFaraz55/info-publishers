import { Badge, Box, Button, Flex, Select, Spinner, Tag, TagLabel, Text, Toast, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
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
import { BiRefresh } from 'react-icons/bi'
import axiosInstance from "../../../Services/core";
import Router from "next/router";
import { UserAuth } from "../../../hooks/auth";
const School = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false)
  const {user:state} = useContext(UserAuth)
  const toast = useToast()
  const getSchool = async () => {
    setLoading(true)
    const res = await axios.post(
      "https://infopubsliher-backend.onrender.com/api/admin/getSchoolsById",
      { id: state?.user?._id }
    );
    if (res.data.ok) {
      setLoading(false)
      setData(res.data.result);
    } else {
      setLoading(false)
      toast({
        title: "Failed to load schools",
        status: "error",
        position: "top",
        isClosable: true
      })
    }
    console.log(res.data.result);
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
    getSchool()
  }, [state]);




  return (
    <Box>
      <Header />
      <Layout>
        <Box p={4}>
          <Flex alignItems={"center"} justifyContent={"space-between"} p={4}>
            <Flex alignItems={"center"}>
              <Text fontSize="2xl">Distributor Schools</Text>
              <BiRefresh style={{ marginLeft: 10 }} cursor="pointer" size={25} onClick={() => getSchool()} />
            </Flex>
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
          {loading ? <Spinner size={"lg"} mt={2} /> : <TableContainer mt={5}>
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
          </TableContainer>}
        </Box>
      </Layout>
    </Box>
  );
};

export default School;
