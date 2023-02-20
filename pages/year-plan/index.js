import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Spinner,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import "../../node_modules/video-react/dist/video-react.css"; // import css

import { Player, ControlBar, BigPlayButton } from 'video-react';
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
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
} from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import CustomModal from "../../components/Modal";
const YearPlan = () => {
    const [data, setData] = useState({});
    const router = useRouter()
    const [series, setSeries] = useState("");
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [current, setCurrent] = useState({})
    const getYearPlan = async () => {
        const result = await axios.get(
            "http://13.235.100.69:8000/api/admin/get-year-plan"
        );
        console.log(result.data.data);
        setData(result.data.data);
    };



    const handleDelete = async (item) => {
        const ret = confirm("Are you sure?");
        if (ret) {
            const result = await axios.post(
                "http://13.235.100.69:8000/api/admin/delete-year-plan",
                { id: item._id }
            );
            if (result.data.ok) {
                alert(result.data.message);
                getYearPlan();
            } else {
                new Error("Failed to delete");
            }
        }
    };
    useEffect(() => {
        getYearPlan();
    }, []);
    return (
        <Box>
            <Header />
            <Layout>
                <Box p={4}>
                    <Flex alignItems={"center"} justifyContent={"space-between"} p={4}>
                        <Text fontSize="2xl">Year - Plan</Text>

                        <Button
                            onClick={() => {
                                router.push("/year-plan/create")
                            }}
                            variant={"solid"}
                            colorScheme="green"
                        >
                            Create
                        </Button>
                    </Flex>
                </Box>
                <Box p={4}>

                    <TableContainer>
                        <Table variant="striped">
                            <Thead>
                                <Tr>

                                </Tr>
                            </Thead>
                            <Tbody>


                                {data ? <Tr style={{ background: "#fff" }}>
                                    <Td>{data.title}</Td>
                                    <Td>
                                        <Button
                                            onClick={() => {
                                                window.location.href = data.link
                                            }}
                                            variant={"link"}
                                            colorScheme={"green"}
                                        >
                                            Download
                                        </Button>
                                    </Td>
                                    <Td>
                                        <Button
                                            onClick={() => handleDelete(data)}
                                            variant={"link"}
                                            colorScheme={"red"}
                                        >
                                            Delete
                                        </Button>
                                    </Td>
                                </Tr> : null}

                            </Tbody>
                        </Table>
                    </TableContainer>
                    <CustomModal size={"xl"} isOpen={isOpen} onClose={onClose}>
                        <Box style={{ width: "100%", height: "auto" }}>
                            <Player
                                fluid
                                autoPlay
                                preload="auto"
                            >
                                <source src={"https://www.youtube.com/watch?v=A2ezicN5tqw&list=RDMMGcMd_DHkxY0&index=10"} />
                                <ControlBar autoHide={false} />
                                <BigPlayButton position="center" />

                            </Player>
                        </Box>
                    </CustomModal>
                </Box>
            </Layout>
        </Box>
    );
};

export default YearPlan;
