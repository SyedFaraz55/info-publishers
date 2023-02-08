import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../Services/core";
import { Alert, AlertTitle, Box } from "@chakra-ui/react";



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
        getAssessment();
    }, [router.query])


    return <Box>
        {/* {data ? <Quiz quiz={{
            quizTitle: data && data?.name,
            nrOfQuestions: "4",
            questions: data && data?.questions
        }} /> : null} */}
        <Alert>
            <AlertTitle>Page is in construction.</AlertTitle>
        </Alert>
    </Box>

}

export default View

