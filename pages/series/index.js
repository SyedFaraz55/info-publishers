import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  useToast,
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
const Series = () => {
  const [data, setData] = useState([]);
  const router = useRouter()
  const [series, setSeries] = useState("");
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const toast = useToast()
  const getSeries = async () => {
    setLoading(true)
    const result = await axios.get(
      "https://infopubsliher-backend.onrender.com/api/admin/get-series"
    );
    if (result.data.ok) {
      setLoading(false)
      setData(result.data.series);
    } else {
      toast({
        title: "Failed to load series",
        isClosable: true,
        position: "top",
        status: "error"
      })
    }
  };

  const handleSeries = async () => {
    setLoading(true);
    if (!series) {
      alert("Please add series name")
      toast({
        title: "Please add series name",
        status: "error",
        position: "top",
        isClosable: true
      })
      setLoading(false)
      setToggle(true)
      return
    }
    try {
      const result = await axios.post(
        "https://infopubsliher-backend.onrender.com/api/admin/add-series",
        { name: series }
      );
      if (result.data.ok) {
        setLoading(false);
        setToggle(false);
        toast({
          title: "Series added",
          status: "success",
          position: "top",
          isClosable: true
        })

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
        "https://infopubsliher-backend.onrender.com/api/admin/delete-series",
        { id: item._id }
      );
      if (result.data.ok) {
        toast({
          title: result.data.message,
          status: "success",
          position: "top",
          isClosable: true
        })

        getSeries();
      } else {
        new Error("Failed to delete");
      }
    }
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
            <Text fontSize="2xl">Series</Text>

            <Button
              onClick={() => setToggle(!toggle)}
              variant={"solid"}
              colorScheme="green"
            >
              Create Series
            </Button>
          </Flex>
        </Box>
        <Box p={4}>
          {toggle ? (
            <FormControl isRequired>
              <FormLabel>Series Name</FormLabel>
              <Input
                background={"#fff"}
                placeholder="Series Name"
                onChange={(e) => setSeries(e.target.value)}
              />
              {loading ? (
                <Spinner mt={2} />
              ) : (
                <Button
                  mt={3}
                  variant="solid"
                  colorScheme="green"
                  onClick={handleSeries}
                >
                  Add Series
                </Button>
              )}
            </FormControl>
          ) : null}
          {
            loading ? <Spinner size={"lg"} mt={2} /> : <TableContainer mt={0}>
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map((item) => {
                    return (
                      <Tr key={item._id} style={{ background: "#fff" }}>
                        <Td>{item.name}</Td>
                        <Td>
                          <Button
                            onClick={() => {
                              router.push(`/series/${item._id}`)
                            }}
                            variant={"link"}
                            colorScheme={"green"}
                          >
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
          }
        </Box>
      </Layout>
    </Box>
  );
};

export default Series;
