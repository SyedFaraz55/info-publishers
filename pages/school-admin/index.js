import {
  Box,
  Container,
  Flex,
  Link,
  Stat,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
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
const SchoolAdmin = () => {
  const [notices, setNotices] = useState({});
  const [plan, setPlan] = useState();
  const [stats, setStats] = useState()
  const getNotices = async () => {
    const rs = await axios.post("http://13.235.100.69:8000/api/admin/get-notice", {
      role: local?.user.role,
    });
    setNotices(rs.data.data[0]);
  };
  const getYearPlan = async () => {
    const rs = await axios.get("http://13.235.100.69:8000/api/admin/get-year-plan");
    setPlan(rs.data.data)
  }
  const getSchoolStats = async () => {
    const result = await axios.get(`http://13.235.100.69:8000/api/admin/get-school-stats/${local?.user?._id}`)
    setStats(result.data)
  }
  const [local, setLocal] = useState(null);
  useEffect(() => {
    setLocal(JSON.parse(localStorage?.getItem("@login")));
  }, []);
  useEffect(() => {
    getNotices();
    getSchoolStats()
  }, [local]);

  useEffect(() => {
    getYearPlan();
  }, [])

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

        <Box p={5}>
          {plan ? <Alert status='info'>
            <AlertIcon />
            <AlertTitle>{plan?.title}</AlertTitle>
            <AlertDescription>
              <Link href={plan?.link}>Download</Link>
            </AlertDescription>
          </Alert> : null}
        </Box>
        <Flex p={6}>

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
              <Text fontSize={"2xl"}>{stats?.students}</Text>
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
            <StatLabel>Global Series</StatLabel>
            <StatNumber>
              <Text fontSize={"2xl"}>{stats?.global}</Text>
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
            <StatLabel>Smart Series</StatLabel>
            <StatNumber>
              <Text fontSize={"2xl"}>0</Text>
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

export default SchoolAdmin;
