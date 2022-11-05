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
import { useRouter } from "next/router";
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
    if (!data) {
      const payload = {
        id: router.query.q,
        subjects: [{ name: subject }],
      };
      axios
        .post("http://localhost:8000/api/admin/add-subject", payload)
        .then((res) => {
          if (res.data.ok) {
            alert("Subject Added");
            setToggle(false);
            getSubjects();
          } else {
            alert("Failed to add Subject");
          }
        })
        .catch((err) => alert(err.toString()));
      return;
    }

    const dup = data;
    dup?.subjects?.push({ name: subject });
    setLoading(true);
    if (!subject) {
      alert("Please add Subject name");
      setLoading(false);
      setToggle(true);
      return;
    }
    try {
      const result = await axios.post(
        "http://localhost:8000/api/admin/update-subject",
        { id: router.query.q, data }
      );
      if (result.data.ok) {
        setLoading(false);
        setToggle(false);
        alert("Subject Added");

        getSubjects();
      } else {
        alert("Something went wrong");
        setLoading(false);
      }
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const dup = data;

    const ret = confirm("Are you sure?");
    if (ret) {
      const deleted = dup?.subjects?.filter((td) => td._id != id._id);
      setData({
        ...dup,
        subjects: deleted,
      });
      const result = await axios.post(
        "http://localhost:8000/api/admin/delete-subject",
        { id: router.query.q, data: deleted }
      );
      if (result.data.ok) {
        alert(result.data.message);
        getClasses();
      } else {
        new Error("Failed to delete");
      }
    }
  };

  const getSubjects = async () => {
    const result = await axios.post(
      "http://localhost:8000/api/admin/get-subjects",
      { id: router.query.q }
    );
    console.log(result.data.result[0]);
    setData(result.data.result[0]);
  };

  useEffect(() => {
    getSubjects();
  }, []);
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
                {data?.subjects?.map((item) => {
                  return (
                    <Tr background={"#fff"} key={item._id}>
                      <Td>{item.name}</Td>
                      <Td>
                        <Button variant={"link"} colorScheme="green">
                          View
                        </Button>
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
