import {
  Box,
  Stat,
  Text,
  StatLabel,
  StatNumber,
  Flex,
  Button,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Layout from "../components/Layout";
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
import Modal from "../components/Modal";
const Dashboard = () => {
  const [data, setData] = useState([]);
  const [current, setView] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const getDist = async () => {
    const result = await axios.get("http://localhost:8000/api/admin/get-dist");
    setData(result.data.result);
  };
  useEffect(() => {
    getDist();
  }, []);
  return (
    <>
      <Header />
      <Layout>
        <Box>
          <Flex p={4}>
            <Box p={5} ml={5} width={250} borderRadius={4} background={"#fff"}>
              <Stat>
                <StatLabel>Total Distributors</StatLabel>
                <StatNumber>{data?.length}</StatNumber>
              </Stat>
            </Box>

            <Box ml={5} p={5} width={250} borderRadius={4} background={"#fff"}>
              <Stat>
                <StatLabel>Total School</StatLabel>
                <StatNumber>100</StatNumber>
              </Stat>
            </Box>

            <Box ml={5} p={5} width={250} borderRadius={4} background={"#fff"}>
              <Stat>
                <StatLabel>Global Students</StatLabel>
                <StatNumber>500</StatNumber>
              </Stat>
            </Box>

            <Box ml={5} p={5} width={250} borderRadius={4} background={"#fff"}>
              <Stat>
                <StatLabel>E-Smart Students</StatLabel>
                <StatNumber>500</StatNumber>
              </Stat>
            </Box>

            <Box ml={5} p={5} width={250} borderRadius={4} background={"#fff"}>
              <Stat>
                <StatLabel>Assessment</StatLabel>
                <StatNumber>500</StatNumber>
              </Stat>
            </Box>
          </Flex>

          <Box p={4} mt={10}>
            <TableContainer>
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
                        {/* <Td>
                          <Button variant={"link"} colorScheme={"red"}>
                            Delete
                          </Button>
                        </Td> */}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
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

export default Dashboard;
