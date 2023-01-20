import { Box, Container, Flex, Stat, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import axios from "axios";
const DistributorAdmin = () => {
  const [notices, setNotices] = useState({});
  const getNotices = async () => {
    const rs = await axios.post("http://localhost:8000/api/admin/get-notice", {
      role: local?.user.role,
    });
    setNotices(rs.data.data[0]);
  };
  const [local, setLocal] = useState(null);
  useEffect(() => {
    setLocal(JSON.parse(localStorage?.getItem("@login")));
  }, []);
  useEffect(() => {
    getNotices();
  }, [local]);

  return (
    <Box>
      <Header />
      <Layout>
        {notices ? (
          <Box p={5}>
            <Alert status="info">
              <AlertIcon />
              <AlertTitle>{notices?.title}</AlertTitle>
              <AlertDescription>{notices?.message}</AlertDescription>
            </Alert>
          </Box>
        ) : null}
        <Flex p={6}>
          <Stat
            style={{
              background: "#fff",
              padding: 10,
              margin: 10,
              borderRadius: 6,
            }}
          >
            <StatLabel>Distributor</StatLabel>
            <StatNumber>
              <Text fontSize={"2xl"}>{local?.user.firmName}</Text>
            </StatNumber>
          </Stat>

          <Stat
            style={{
              background: "#fff",
              padding: 10,
              margin: 10,
              borderRadius: 6,
            }}
          >
            <StatLabel>Total Schools</StatLabel>
            <StatNumber>
              <Text fontSize={"2xl"}>10</Text>
            </StatNumber>
          </Stat>

          <Stat
            style={{
              background: "#fff",
              padding: 10,
              margin: 10,
              borderRadius: 6,
            }}
          >
            <StatLabel>Total Students</StatLabel>
            <StatNumber>
              <Text fontSize={"2xl"}>20</Text>
            </StatNumber>
          </Stat>
        </Flex>

        <Container mt={10}>
          <iframe
            width="530"
            height="315"
            src="https://www.youtube.com/embed/eujDykid6VE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </Container>
      </Layout>
    </Box>
  );
};

export default DistributorAdmin;
