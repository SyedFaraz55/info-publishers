import { Box, Button, Flex, Text, useDisclosure,Divider } from "@chakra-ui/react";
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
  const getDist = async () => {
    const result = await axios.get("http://localhost:8000/api/admin/get-dist");
    setData(result.data.result);
  };
  const handleDelete = async (item) => {
    const ret = confirm("Are you sure?")
    if(ret) {
      const result = await axios.post("http://localhost:8000/api/admin/delete-dist",{id:item._id});
      if(result.data.ok) {
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
                  <Th></Th>
                  <Th></Th>
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
                      <Td>{item.schools?.length}</Td>
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
          >
            <Box>
              <Text>Distributor Firm : {current?.firmName}</Text>
              <Text mt={2}>Name : {current?.name}</Text>
              <Text mt={2}>Mobile : {current?.mobile}</Text>
              <Text mt={2}>Schools : {current?.schools?.length}</Text>
              <Text mt={2}>State : {current?.state}</Text>
              <Text mt={2}>District : {current?.district}</Text>
              <Text mt={2}>Pin Code : {current?.pincode}</Text>
            </Box>
            <Divider style={{ marginTop: 10 }} />
            <Box mt={5}>
              <Text fontSize={"2xl"}>Schools Information</Text>
            </Box>
          </Modal>
        </Box>
      </Layout>
    </>
  );
};

export default Distributors;
