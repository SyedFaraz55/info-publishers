import { Box, Button, Container, Flex, Grid, Spinner, Stat, StatLabel, StatNumber, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
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
import CustomModal from "../../components/Modal";
import { BigPlayButton, ControlBar, Player } from "video-react";
import { UserAuth } from "../../hooks/auth";
import { AiFillPlayCircle } from 'react-icons/ai'
const Teaching = () => {
    const [local, setLocal] = useState();
    const [data, setData] = useState([])
    const router = useRouter();
    const [current, setCurrent] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user } = useContext(UserAuth)
    const [loading,setLoading] =useState(false)

    const getTeachingData = async () => {
        setLoading(true)
        const rs = await axiosInstance.get(`/admin/get-teaching/${user?.user?.standard}`);
        if(rs.data.ok) {
        setData(rs.data.data)
        setLoading(false)
        console.log(rs.data.data)
        }else {
            alert("Error loading data")
            setLoading(false)
        }
    }

    useEffect(() => {
    if(user) {

        getTeachingData()
    }
    }, [user])


    return <>
        <Header />
        <Box p={5}>
            <Text fontSize={"2xl"}>Online Teaching</Text>
        {loading ? <Spinner size={"lg"} mt={3} /> : 
           <Grid templateColumns='repeat(4, 1fr)' gap={2} mt={5}>
                {
                    data?.map(item => {
                        return <Box width={300} marginTop={5} bg={"#fff"} boxShadow="md">
                            <iframe className='video'
                                title='Youtube player'
                                width="100%"
                                height={200}
                                allowFullScreen={true}
                                sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                                src={`https://youtube.com/embed/${item?.link?.split("v=")[1]}?autoplay=0`}>
                            </iframe>
                            <Flex alignItems={"center"} justifyContent="space-between" padding={2}>
                                <Text>{item?.name}</Text>
                                <AiFillPlayCircle size={26} cursor="pointer" color="#3181ce" onClick={() => {
                                    onOpen();
                                    setCurrent(item)
                                }} />
                            </Flex>
                        </Box>
                    })
                }
            </Grid>
        } 
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

export default Teaching 