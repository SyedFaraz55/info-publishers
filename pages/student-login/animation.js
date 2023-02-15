import { Box, Button, Container, Flex, Stat, StatLabel, StatNumber, Text, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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

const Animation = () => {
    const [local, setLocal] = useState();
    const [data, setData] = useState([])
    const router = useRouter();
    const [current, setCurrent] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure()
    useEffect(() => {
        setLocal(JSON.parse(localStorage.getItem("@login")))
    }, [])

    const getAnimation = async () => {
        const rs = await axiosInstance.get(`/admin/get-animationById/${local?.user?.standard}`);
        setData(rs.data.data)
    }

    useEffect(() => {
        getAnimation();
    }, [local, router])
    return <>
        <Header />
        <Box p={5}>
            <Text fontSize={"2xl"}> Animation</Text>
            <Box mt={10}>
                <TableContainer>
                    <Table size='sm'>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Link/Url</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                data?.map(item => {
                                    return <Tr>
                                        <Td>{item?.name}</Td>
                                        <Td>
                                            <Button
                                                onClick={() => {

                                                                                  setCurrent(item);
                                                        onOpen()
                                                  
                                                }}
                                                variant={"link"}
                                                colorScheme={"green"}
                                            >
                                                View Content
                                            </Button>
                                        </Td>
                                    </Tr>
                                })
                            }

                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            <CustomModal size={"xl"} isOpen={isOpen} onClose={onClose}>
                <Box style={{ width: "100%", height: "auto" }}>
                    <Player
                        fluid
                        autoPlay
                        preload="auto"
                    >
                        <source src={current?.link} />
                        <ControlBar autoHide={false} />
                        <BigPlayButton position="center" />

                    </Player>
                </Box>
            </CustomModal>
        </Box>
    </>
}

export default Animation 