import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  Tag,
  TagLabel,
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
    const result = await axios.get(
      `https://infopubsliher-backend.onrender.com/api/admin/get-student/${router.query.q}`
    );
    console.log(result.data.data);
    setData(result.data.data);
  };

  const handleSeries = async () => {
    setLoading(true);
    if (!series) {
      alert("Please add series name");
      setLoading(false);
      setToggle(true);
      return;
    }
    try {
      const result = await axios.post(
        "https://infopubsliher-backend.onrender.com/api/admin/add-series",
        { name: series }
      );
      if (result.data.ok) {
        setLoading(false);
        setToggle(false);
        alert("Series Added");

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
        "https://infopubsliher-backend.onrender.com/api/admin/delete-student",
        { id: item._id }
      );
      if (result.data.ok) {
        alert(result.data.message);
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
  }, [router]);
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
                      <Td>{item.active ? <Tag colorScheme={"green"}><TagLabel>Active</TagLabel></Tag> : <Tag colorScheme={"red"}><TagLabel>De-active</TagLabel></Tag>}</Td>
                      <Td>
                        <Select onChange={(e) => {
                          const confirm = window.confirm("Are you sure ?");
                          axios.post("https://infopubsliher-backend.onrender.com/api/admin/update-student", { id: item._id, status: e.target.value })
                            .then(res => {
                              if (res.data.ok) {
                                alert(res.data.message);
                                getStudents();
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
