import { Badge, Box, Button, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { Document, Page } from "react-pdf";

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
import Router from "next/router";
const School = () => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState({});
  const getLessons = async () => {
    const res = await axios.post("http://localhost:8000/api/admin/getLessonsById",{id:Router.query.q});
    console.log(res.data.result);
    setData(res.data.result);
  };

  const handleDelete = async (id) => {
    alert("Deleted");
    // const result = await axios.post(
    //   "http://localhost:8000/api/admin/delete-school",
    //   { id: id._id }
    // );
    // if (result.data.ok) {
    //   alert("School Deleted");
    //   getSchool();
    // } else {
    //   new Error("Failed to delete");
    // }
  };

  useEffect(() => {
    getLessons();
  }, []);
  return (
    <Box>
      <Header />
      <Layout>
        <Box p={4}>
          <Flex alignItems={"center"} justifyContent={"space-between"} p={4}>
            <Text fontSize="2xl">Lessons</Text>

            <Button
              onClick={() => {
                Router.push({
                  pathname:"/lessons/add-lessons",
                  query:Router.query
                })
              }}
              variant={"solid"}
              colorScheme="green"
            >
              Create Lessons
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
                        <Button
                          onClick={() => {
                            window.location.href = item.link;
                            setCurrent(item);
                          }}
                          variant={"link"}
                          colorScheme="green"
                        >
                          Download
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          onClick={() => {
                            const check = confirm("Are you sure ?");
                            if (check) {
                              handleDelete(item);
                            }
                          }}
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
