import { Box, Stat, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'
const DistributorAdmin = () => {
    const [local,setLocal] = useState(null)
    useEffect(()=> {
       setLocal(JSON.parse(localStorage?.getItem("@login")))
    },[])
  return (
    <Box>
      <Header />
      <Layout>
        <Box p={6}>
          <Stat
            style={{
              background: "#fff",
              padding: 10,
              width: 350,
              borderRadius: 6,
            }}
          >
            <StatLabel>Distributor</StatLabel>
            <StatNumber>
              <Text fontSize={"2xl"}>
                {local?.user.firmName}
              </Text>
            </StatNumber>
          </Stat>
        </Box>
        <Box p={5}>
          <Alert
            status="info"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
             New Syllabus will be in effect from 15 Nov 2022
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Thanks for submitting your application. Our team will get back to
              you soon.
            </AlertDescription>
          </Alert>
        </Box>
      </Layout>
    </Box>
  );
};

export default DistributorAdmin;
