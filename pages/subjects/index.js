import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
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
import axios from "axios";
import Router, { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
const Subjects = () => {
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [subject, setSubject] = useState("");
  const [data, setData] = useState([]);
  const router = useRouter();
  const handleSubject = async () => {

    const payload = {
      id: router.query.q,
      subject: subject
    }
    axios
      .post("https://infopubsliher-backend.onrender.com/api/admin/add-subject", payload)
      .then((res) => {
        if (res.data.ok) {
          alert("Subject Added");
          setToggle(false);
          getSubjects();
        } else {
          alert("Failed to add Subject");
        }
      })
      .catch((err) => alert(err.toString()))
  };

  const handleDelete = async (id) => {


    const ret = confirm("Are you sure?");
    if (ret) {

      console.log(id);

      const result = await axios.post(
        "https://infopubsliher-backend.onrender.com/api/admin/delete-subject",
        { id: id._id }
      );
      if (result.data.ok) {
        alert(result.data.message);
        window.location.reload()
      } else {
        new Error("Failed to delete");
      }
    }
  };

  const getSubjects = async () => {
    const result = await axios.post(
      "https://infopubsliher-backend.onrender.com/api/admin/get-subjects",
      { id: router.query.q }
    );
    console.log(result.data.result, 'all');
    setData(result.data.result);
  };

  useEffect(() => {
    getSubjects();
  }, []);

  useEffect(() => {
    getSubjects();
  }, [router]);
  return (
    <Box>
      <Header />
      <Layout>
        <Box p={4}>
          <Flex alignItems={"center"} justifyContent={"space-between"} p={4}>
            <Text fontSize="2xl">Subjects</Text>

            <Button
              onClick={() => setToggle(!toggle)}
              variant={"solid"}
              colorScheme="green"
            >
              Create Subject
            </Button>
          </Flex>

          {toggle ? (
            <FormControl isRequired>
              <FormLabel>Subject Name</FormLabel>
              <Input
                background={"#fff"}
                placeholder="Subject Name"
                onChange={(e) => setSubject(e.target.value)}
              />
              {loading ? (
                <Spinner mt={2} />
              ) : (
                <Button
                  mt={3}
                  variant="solid"
                  colorScheme="green"
                  onClick={handleSubject}
                >
                  Add Subject
                </Button>
              )}
            </FormControl>
          ) : null}
          <Breadcrumb ml={5} spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
            <BreadcrumbItem>
              <BreadcrumbLink href='/series'>Series</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
          <BreadcrumbLink onClick={() => router.back()}> Classes</BreadcrumbLink>
          </BreadcrumbItem>
          </Breadcrumb>
          <TableContainer mt={5}>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((item) => {
                  return (
                    <Tr background={"#fff"} key={item._id}>
                      <Td>{item.subject}</Td>
                      <Td>

                        <Button onClick={() => Router.push(`/lessons?q=${item._id}`)} variant={"link"} colorScheme="green" >View</Button>

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

export default Subjects;
