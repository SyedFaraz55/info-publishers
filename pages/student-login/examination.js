import { Box, Button, Container, Flex, Grid, Spinner, Stat, StatLabel, StatNumber, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import axiosInstance from "../../Services/core";
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
} from '@chakra-ui/react'
import Link from "next/link";

import { AiFillPlayCircle } from 'react-icons/ai'
import CustomModal from "../../components/Modal";
import { BigPlayButton, ControlBar, Player } from "video-react";
import { UserAuth } from "../../hooks/auth";
import axios from "axios";

const Assessments = () => {
    const [local, setLocal] = useState();
    const [data, setData] = useState([])
    const router = useRouter();
    const [current, setCurrent] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user } = useContext(UserAuth)
    const [loading, setLoading] = useState(false)
    const getAssessment = async () => {
        setLoading(true)
        const result = await axios.get(
            "https://infopubsliher-backend.onrender.com/api/admin/get-exams"
        );

        if (result.data.ok) {
            setData(result.data.data);
            console.log(result.data.data);
            setLoading(false)
        } else {
            alert("failed to load data");
            setLoading(false)
        }


    };



    useEffect(() => {
        getAssessment();
    }, [])
    return <>
        <Header />
        <Box p={5}>
            <Text fontSize={"2xl"}>Examination</Text>
            <Box mt={10}>
                {loading ? <Spinner size={"lg"} mt={2} /> : <Grid templateColumns='repeat(4, 1fr)' gap={2} mt={5}>
                    {
                        data?.map(item => {
                            return <Box width={300} marginTop={5} p={5} bg={"#fff"} boxShadow="md">
                                <Text fontSize={"2xl"} mb={2}>{item?.name}</Text>
                                <Text>Total Questions: {item?.questions?.length}</Text>
                                <Button onClick={() => {
                                    console.log(item)
                                    router.push({
                                        pathname: "/examination/view",
                                        query:`q=${item._id}`
                                    })

                                }} variant={"outline"} mt={5}>Start</Button>
                            </Box>
                        })
                    }
                </Grid>}
            </Box>
            <CustomModal size={"xl"} isOpen={isOpen} onClose={onClose}>
                <Box style={{ width: "100%", height: "auto" }}>
                    <iframe className='video'
                        title='Youtube player'
                        width="100%"
                        height={300}
                        allowFullScreen={true}
                        sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                        src={`https://youtube.com/embed/${current?.link?.split("v=")[1]}?autoplay=0`}>
                    </iframe>
                </Box>
            </CustomModal>
        </Box>
    </>
}

export default Assessments 