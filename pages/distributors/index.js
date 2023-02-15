import { Box, Button, Flex, Text, useDisclosure, Divider, Tag, TagLabel, Select } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Modal from '../../components/Modal'
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
const Distributors = () => {
  const [data, setData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [current, setView] = useState({});
  const [schools, setSchools] = useState([]);
  const getDist = async () => {
    const result = await axios.get("https://infopubsliher-backend.onrender.com/api/admin/get-dist");
    setData(result.data.result);
  };
  const getDistById = async () => {
    console.log(current)
    const result = await axios.get(`https://infopubsliher-backend.onrender.com/api/admin/get-distById/${current._id}`);
    setSchools(result.data.result)
  };
  const handleDelete = async (item) => {
    const ret = confirm("Are you sure?")
    if (ret) {
      const result = await axios.post("https://infopubsliher-backend.onrender.com/api/admin/delete-dist", { id: item._id });
      if (result.data.ok) {
        alert(result.data.message)
        getDist();
      } else {
        new Error("Failed to delete");
      }
    }

  };
  useEffect(() => {
    getDist();
  }, []);

  useEffect(() => {
    getDistById()
  }, [current])

  return (
    <>
      <Header />
      <Layout>
        <Box p={4}>
          <Flex justifyContent={"space-between"}>
            <Text fontSize={"2xl"}>Distributors</Text>
            <Button
              onClick={() =>
                (window.location.href = "distributors/add-distributor")
              }
              variant={"solid"}
              colorScheme="green"
            >
              Create
            </Button>
          </Flex>

          <TableContainer mt={20}>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Distributor</Th>
                  <Th>Name</Th>
                  <Th>Mobile</Th>
                  <Th>State</Th>
                  <Th>Schools</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((item) => {
                  return (
                    <Tr style={{ background: "#fff" }}>
                      <Td>{item.firmName}</Td>
                      <Td>{item.name}</Td>
                      <Td>{item.mobile}</Td>
                      <Td>{item.state}</Td>
                      <Td>{item.school}</Td>
                      <Td>{item.active ? <Tag colorScheme={"green"}><TagLabel>Active</TagLabel></Tag> : <Tag colorScheme={"red"}><TagLabel>De-active</TagLabel></Tag>}</Td>
                      <Td>
                        <Select onChange={(e) => {
                          const confirm = window.confirm("Are you sure ?");
                          axios.post("https://infopubsliher-backend.onrender.com/api/admin/update-dist", { id: item._id, status: e.target.value })
                            .then(res => {
                              if (res.data.ok) {
                                alert(res.data.message);
                                getDist();
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
                        <Button
                          onClick={() => {
                            onOpen();
                            setView(item);
                          }}
                          variant={"link"}
                          colorScheme={"green"}
                        >
                          View
                        </Button>
                      </Td>
                      <Td>
                        <Button onClick={() => handleDelete(item)} variant={"link"} colorScheme={"red"}>
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <Modal
            title={"Distributor Information"}
            isOpen={isOpen}
            onClose={onClose}
            size="xl"
          >
            <Box>
              <Text>Distributor Firm : {current?.firmName}</Text>
              <Text mt={2}>Name : {current?.name}</Text>
              <Text mt={2}>Mobile : {current?.mobile}</Text>
              <Text mt={2}>Schools : {current?.school}</Text>
              <Text mt={2}>State : {current?.state}</Text>
              <Text mt={2}>District : {current?.district}</Text>
              <Text mt={2}>Pin Code : {current?.pincode}</Text>
            </Box>
            <Divider style={{ marginTop: 10 }} />
            <Box mt={5}>
              <Text fontSize={"2xl"}>Schools Information</Text>
              <Box>
                {schools?.map(item => {
                  return <Box p={4} m={2} border={"1px"} borderRadius={4} borderColor="gray.200">
                    <Text>{item.name}</Text>
                    <Text>{item.email}</Text>
                    <Text>{item.mobile}</Text>
                  </Box>
                })}
              </Box>
            </Box>
          </Modal>
        </Box>
      </Layout>
    </>
  );
};

export default Distributors;
