import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../Services/core";
import { Alert, AlertTitle, Box, Container } from "@chakra-ui/react";
import Quiz from "../../components/Quiz";



const View = () => {
    const [data, setData] = useState();
    const router = useRouter()
    const getAssessment = async () => {
        const result = await axiosInstance.get(
            `/admin/get-exam/${router.query.q}`
        );
        setData(result.data.data);
        console.log(result.data.data)
    };
    useEffect(() => {
        getAssessment();
    }, [])

  


    useEffect(() => {
        if (!router.query.q) {
            router.push("/examination")
            return
        } else {

            getAssessment();
        }

    }, [router])


    return <Box>
        {/* {data ? <Quiz quiz={{
            quizTitle: data && data?.name,
            nrOfQuestions: "4",
            questions: data && data?.questions
        }} /> : null} */}
        <Container maxW={"container.lg"} mt={10} >

            <Quiz quiz={data} setData={setData} />
        </Container>

    </Box>

}

export default View

