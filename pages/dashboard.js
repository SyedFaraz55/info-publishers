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
  Container,
  Alert,
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
import Link from "next/link";
const Dashboard = () => {
  const [data, setData] = useState([]);
  const [current, setView] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stats,setStats] = useState({school:0,global:0,smart:0,assessment:0});
  const [local,setLocal] = useState()
  const getDist = async () => {
    const result = await axios.get("http://localhost:8000/api/admin/get-dist");
    console.log(result)
    setData(result.data.result);
  };
  const getStats = async()=> {
    const result = await axios.get("http://localhost:8000/api/admin/get-stats");
    setStats({
      school:result.data.data.schoolCount,
      global:result.data.data.global,
      smart:result.data.data.series,
      assessment:result.data.data.assessment
    })

  }
  useEffect(() => {
    getDist();
    getStats();
    setLocal(JSON.parse(localStorage.getItem("@login")))
  }, []);
  if (!local) {
    return <Container mt={10}>
      <Alert>
Please login to continue <Link style={{marginLeft:10}} href={"/"} >Click here</Link>
      </Alert>
    </Container>
  }
  return (
    <>
      <Header />
      <Layout>
        <Box>
          <Flex p={4}>
            <Box p={4} m={2} width={200} borderRadius={4} background={"#fff"}>
              <Stat>
                <StatLabel>Total Distributors</StatLabel>
                <StatNumber>{data?.length}</StatNumber>
              </Stat>
            </Box>

            <Box p={4} m={2} width={200} borderRadius={4} background={"#fff"}>
              <Stat>
                <StatLabel>Total School</StatLabel>
                <StatNumber>{stats.school}</StatNumber>
              </Stat>
            </Box>

            <Box p={4} m={2} width={200} borderRadius={4} background={"#fff"}>
              <Stat>
                <StatLabel>Global Students</StatLabel>
                <StatNumber>{stats?.global}</StatNumber>
              </Stat>
            </Box>

            <Box p={4} m={2} width={200} borderRadius={4} background={"#fff"}>
              <Stat>
                <StatLabel>E-Smart Students</StatLabel>
                <StatNumber>{stats?.smart}</StatNumber>
              </Stat>
            </Box>

            <Box p={4} m={2} width={200} borderRadius={4} background={"#fff"}>
              <Stat>
                <StatLabel>Assessment</StatLabel>
                <StatNumber>{stats?.assessment}</StatNumber>
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
                        <Td>{item.school}</Td>
                        {/* <Td>
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
                        </Td> */}
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
        </Box>
      </Layout>
    </>
  );
};

export default Dashboard;
