import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Spinner,
    Text,
  } from "@chakra-ui/react";
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
  import Router, { useRouter } from "next/router";
  const Series = () => {
    const [data, setData] = useState([]);
    const router = useRouter();
    const [series, setSeries] = useState("");
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false);
    const getStudents = async () => {
        console.log(Router.query.q)
      const result = await axios.get(
        `http://localhost:8000/api/admin/get-studentByClass/${Router.query.q}`
      );
      console.log(result.data.data);
      setData(result.data.data);
    };
    const handleDelete = async (item) => {
      const ret = confirm("Are you sure?");
      if (ret) {
        const result = await axios.post(
          "http://localhost:8000/api/admin/delete-student",
          { id: item._id }
        );
        if (result.data.ok) {
          alert("Record Deleted");
          getStudents();
        } else {
          new Error("Failed to delete");
        }
      }
    };

    useEffect(() => {
      getStudents();
    }, []);

    useEffect(() => {
        getStudents();
      }, [router.query.q]);

    return (
      <Box>
        <Header />
        <Layout>
          <Box p={4}>
            <Flex alignItems={"center"} justifyContent={"space-between"} p={4}>
              <Text fontSize="2xl">Students</Text>
  
              <Button
                onClick={() => Router.push("/students")}
                variant={"solid"}
                colorScheme="green"
              >
                Create Student
              </Button>
            </Flex>
          </Box>
          <Box p={4}>
            <TableContainer mt={5}>
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Mobile</Th>
                    <Th>Date of Birth</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map((item) => {
                    return (
                      <Tr key={item._id} style={{ background: "#fff" }}>
                        <Td>{item.name}</Td>
                        <Td>{item.email}</Td>
                        <Td>{item.mobile}</Td>
                        <Td>{item.dob}</Td>
                        {/* <Td>
                          <Button
                            onClick={() => {
                              router.push(`/series/${item._id}`);
                            }}
                            variant={"link"}
                            colorScheme={"green"}
                          >
                            View
                          </Button>
                        </Td> */}
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
  
  export default Series;
  