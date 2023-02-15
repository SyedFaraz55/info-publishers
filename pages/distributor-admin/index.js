import { Box, Container, Flex, Stat, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
const DistributorAdmin = () => {
  const [notices, setNotices] = useState({});
  const [local, setLocal] = useState(null);
  const [stats, setStats] = useState();
  const [plan, setPlan] = useState()
  const router = useRouter();
  const getStats = async () => {
    const result = await axios.get(`https://infopubsliher-backend.onrender.com/api/admin/get-stats/${local?.user._id}`);
    setStats({
      school: result.data.data.schoolCount,
      global: result.data.data.global,
      smart: result.data.data.series,
      students: result.data.data.students
    })

  }
  const getYearPlan = async () => {
    const rs = await axios.get("https://infopubsliher-backend.onrender.com/api/admin/get-year-plan");
    setPlan(rs.data.data)
  }
  const getNotices = async () => {
    const rs = await axios.post("https://infopubsliher-backend.onrender.com/api/admin/get-notice", {
      role: local?.user.role,
    });
    setNotices(rs.data.data[0]);
  };
  useEffect(() => {
    setLocal(JSON.parse(localStorage?.getItem("@login")));
    getYearPlan();
  }, []);
  useEffect(() => {
    getNotices();
    getStats()
  }, [local]);
  useLayoutEffect(() => {
    getNotices();
    getStats()
  }, [])


  if (!local) {
    return <Container mt={10}>
      <Alert>
        Please login to continue <Link style={{ marginLeft: 10 }} href={"/"} >Click here</Link>
      </Alert>
    </Container>
  }

  if (local?.user?.role != '1') {
    return <Container mt={10}>
      <Alert colorScheme={"red"}>
        <AlertDescription>Restricted Access. Please login via Distributor</AlertDescription>
      </Alert>
    </Container>
  }

  return (
    <Box>
      <Header />
      <Layout>
        <Box p={5}>
        {plan ?  <Alert status='info'>
    <AlertIcon />
    <AlertTitle>{plan?.title}</AlertTitle>
    <AlertDescription>
      <Link href={plan?.link}>Download</Link>
    </AlertDescription>
  </Alert> : null}
        </Box>
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
              <Text fontSize={"2xl"}>{stats?.school || 0}</Text>
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
              <Text fontSize={"2xl"}>{stats?.students}</Text>
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
