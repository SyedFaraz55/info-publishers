import { Box, Container, Flex, Stat, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";

const StudentLogin = () => {
    const [local, setLocal] = useState();
    const router = useRouter();
    useEffect(() => {
        setLocal(JSON.parse(localStorage.getItem("@login")))
    }, [])
    return <>
        <Header />
        <Box p={5}>
            <Text fontSize={"2xl"}>Welcome, {local?.user?.name}</Text>
        </Box>
        <Container centerContent maxW={"6xl"} mt={10}>
            <Flex>
                <Box cursor={"pointer"} onClick={() => router.push("/student-login/teaching")} background={"#86A3B8"} p={4} border="1px" borderColor={"#e6e6e6"} borderRadius={5} margin={2}>Online Teaching</Box>
                <Box cursor={"pointer"} background={"#E8D2A6"} p={4} onClick={() => router.push("/student-login/animation")} border="1px" borderColor={"#e6e6e6"} borderRadius={5} margin={2}>Animation Videos</Box>
                <Box cursor={"pointer"} background={"#F48484"} p={4} border="1px" borderColor={"#e6e6e6"} onClick={() => router.push("/student-login/assessment")} borderRadius={5} margin={2}>Lesson-Wise Assessments</Box>
                <Box cursor={"pointer"} background={"#F55050"} p={4} border="1px" onClick={() => router.push("/student-login/examination")} borderColor={"#e6e6e6"} borderRadius={5} margin={2}>Main Examination</Box>
            </Flex>
        </Container>
    </>
}

export default StudentLogin