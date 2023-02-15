import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  Text,
  Textarea,
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
import { useRouter } from "next/router";
const Notices = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [state, setState] = useState({ title: "", role: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const getSeries = async () => {
    const result = await axios.get(
      "https://infopubsliher-backend.onrender.com/api/admin/get-notices"
    );
    console.log(result.data.data);
    setData(result.data.data);
  };

  const handleSeries = async () => {
    setLoading(true);
    if (!state.role) {
      alert("Please Select Notice Type");
      setLoading(false);
      setToggle(true);
      return;
    }
    try {
      const result = await axios.post(
        "https://infopubsliher-backend.onrender.com/api/admin/notice",
        state
      );
      if (result.data.ok) {
        setLoading(false);
        setToggle(false);
        alert("Notice Added");
        getSeries();
      } else {
        alert("Something went wrong");
        setLoading(false);
      }
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    const ret = confirm("Are you sure?");
    if (ret) {
      const result = await axios.post(
        "https://infopubsliher-backend.onrender.com/api/admin/delete-notices",
        { id: item._id }
      );
      if (result.data.ok) {
        alert(result.data.message);
        getSeries();
      } else {
        new Error("Failed to delete");
      }
    }
  };

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    getSeries();
  }, []);
  return (
    <Box>
      <Header />
      <Layout>
        <Box p={4}>
          <Flex alignItems={"center"} justifyContent={"space-between"} p={4}>
            <Text fontSize="2xl">Notices</Text>

            <Button
              onClick={() => setToggle(!toggle)}
              variant={"solid"}
              colorScheme="green"
            >
              Create Notice
            </Button>
          </Flex>
        </Box>
        <Box p={4}>
          {toggle ? (
            <Box style={{ width: 600 }}>
              <FormControl mb={4} isRequired>
                <FormLabel>Notice To</FormLabel>
                <Select onChange={handleChange} name="role" background={"#fff"}>
                  <option value={"0"}>All</option>
                  <option value={"1"}>Distributors</option>
                  <option value={"2"}>School</option>
                  <option>Students</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  background={"#fff"}
                  placeholder="Title"
                  onChange={handleChange}
                  name="title"
                />
              </FormControl>
              <FormControl mt={5} isRequired>
                <FormLabel>Message</FormLabel>
                <Textarea
                  background={"#fff"}
                  placeholder="message"
                  name="message"
                  onChange={handleChange}
                />
              </FormControl>
              {loading ? (
                <Spinner mt={2} />
              ) : (
                <Button
                  mt={3}
                  variant="solid"
                  colorScheme="green"
                  onClick={handleSeries}
                >
                  Add Notices
                </Button>
              )}
            </Box>
          ) : null}
          <TableContainer mt={5}>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Message</Th>
                  <Th>Notice To</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((item) => {
                  return (
                    <Tr key={item._id} style={{ background: "#fff" }}>
                      <Td>{item.title}</Td>
                      <Td>{item.message}</Td>
                      <Td>
                        {item.role == "1" ? "Distributors" : null}
                        {item.role == "2" ? "School" : null}
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

export default Notices;
