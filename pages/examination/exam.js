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
const Assessment = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [state, setState] = useState({ title: "", role: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const getSeries = async () => {
    const result = await axios.get(
      "http://13.235.100.69:8000/api/admin/get-notices"
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
        "http://13.235.100.69:8000/api/admin/notice",
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
        "http://13.235.100.69:8000/api/admin/delete-notices",
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
            <Text fontSize="2xl">Assessment</Text>

            <Button
              onClick={() => setToggle(!toggle)}
              variant={"solid"}
              colorScheme="green"
            >
              Create Assessment
            </Button>
          </Flex>
        </Box>
        <Box p={4}>
          {toggle ? (
            <Box style={{ width: 600 }}>
              <FormControl isRequired>
                <FormLabel>Assessment Name</FormLabel>
                <Input
                  background={"#fff"}
                  placeholder="Assessment Name"
                  onChange={handleChange}
                  name="name"
                />
              </FormControl>
              <FormControl mt={5} isRequired>
                <FormLabel>Marks</FormLabel>
                <Input
                  background={"#fff"}
                  placeholder="Marks"
                  name="marks"
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
        </Box>
      </Layout>
    </Box>
  );
};

export default Assessment;
