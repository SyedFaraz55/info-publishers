import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../Services/core";
import { Alert, AlertTitle, Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import Quiz from "../../components/Quiz";





const View = () => {
const [data,setData] = useState([])  
    const router = useRouter()
    const getAssessment = async () => {
        if (!router.query.q) {
            router.back()

        }
        const result = await axiosInstance.get(
            `/admin/get-assessment/${router.query.q}`
        );
        setData(result.data.data);
        console.log(result.data.data)
    };
    useEffect(() => {
        if (!router.query.q) {
            router.push("/assessment")
            return
        } else {

            getAssessment();
        }
    }, [])

    useEffect(() => {
        if (!router.query.q) {
            router.push("/assessment")
            return
        } else {

            getAssessment();
        }

    }, [router])

   
   
console.log(data)
    return <Container maxW={"container.lg"} mt={10} >
       
        <Quiz quiz={data} setData={setData}  />
    </Container>

}

export default View

