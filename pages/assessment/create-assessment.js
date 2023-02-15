import {
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    Spinner,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    Textarea,
    useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Router, { useRouter } from "next/router";
import CustomModal from "../../components/Modal";
const Create = () => {
    const [data, setData] = useState([]);
    const router = useRouter()
    const [state, setState] = useState({ name: "" })
    const [series, setSeries] = useState("");
    const [selectedClass, setSelectedClass] = useState('')
    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [answer, setAnswer] = useState();
    const [selectedLesson, setSelectedLesson] = useState()
    const [form, setForm] = useState({
        question: "",
        answerSelectionType: "",
        questionType: "text",
        answers: [],
        correctAnswer: "",
        point: ""
    })
    const [questions, setQuestions] = useState([]);
    const { isOpen, onClose, onOpen } = useDisclosure()
    const handleSubmit = async () => {
        const confirm = window.confirm("Are you sure ?");
        if (confirm) {
            console.log({ id: router.query.q, name: state.name, questions });
            try {
                const result = await axios.post(
                    "https://infopubsliher-backend.onrender.com/api/admin/add-assessment",
                    { id: router.query.q, name: state.name, questions }
                );
                if (result.data.ok) {
                    setLoading(false);
                    alert("Assessment Added");
                    Router.push("/assessment")
                } else {
                    new Error("Something went wrong, please try again");
                    setLoading(false);
                }
            } catch (err) {
                alert(err.message);
                setLoading(false);
            }


        }



    }

    const handleEditChange = item => {
        console.log(item)
    }
    return (
        <Box>
            <Header />
            <Layout>
                <Box p={4} >
                    <Flex>
                        <Box width={700}>
                            <FormControl mt={2} isRequired>
                                <FormLabel>Assessment Name</FormLabel>
                                <Input bg={"#fff"} placeholder="Name" name="Name" onChange={e => setState(prevState => ({ ...prevState, name: e.target.value }))} />
                            </FormControl>
                            <FormControl mt={2} isRequired>
                                <FormLabel>Points</FormLabel>
                                <Input value={form.point} bg={"#fff"} placeholder="Point" required type={"number"} name="point" onChange={e => setForm(prevState => ({ ...prevState, point: e.target.value }))} />
                            </FormControl>
                            <FormControl mt={2} isRequired>
                                <FormLabel>Question</FormLabel>
                                <Textarea value={form.question} bg={"#fff"} placeholder="Name" name="Name" onChange={e => setForm(prevState => ({ ...prevState, question: e.target.value }))} />
                            </FormControl>
                            <Box>
                                {form.answers?.map(item => {
                                    return <Tag m={2} colorScheme="green">
                                        <TagLabel>{item?.name}</TagLabel>
                                        <TagCloseButton onClick={() => {
                                            const dp = form.answers;
                                            const r = dp.filter(itx => itx != item);
                                            setForm(prevState => ({ ...prevState, answers: r }))
                                        }} />
                                    </Tag>
                                })}
                            </Box>
                            <FormControl mt={2} isRequired>
                                <FormLabel>Options</FormLabel>
                                <Textarea onKeyDown={e => {
                                    if (e.keyCode == 13) {
                                        setForm(prevState => ({ ...prevState, answers: [...prevState.answers, answer] }))
                                        setAnswer({id:"",name:""})
                                    }
                                }} bg={"#fff"} value={answer?.name} placeholder="Enter Answer" name="Name" onChange={e => setAnswer({
                                    id:Math.floor(Math.random()*999),
                                    name:e.target.value
                                })} />
                                <Button mt={2} colorScheme="green" variant={"outline"} onClick={() => {
                                    setForm(prevState => ({ ...prevState, answers: [...prevState.answers, answer] }))
                                    setAnswer({id:"",name:""})
                                }} >Add Options</Button>
                            </FormControl>
                            <FormControl mt={2} isRequired>
                                <FormLabel>Correct Answer</FormLabel>
                                <Input value={form.correctAnswer} bg={"#fff"} placeholder="ABC" name="Name" onChange={e => {

                                        setForm(prevState => ({ ...prevState, correctAnswer: e.target.value }))

                                }} />
                                <Flex mt={3} alignItems={"center"}>
                                    <Button colorScheme={"green"} variant={"solid"} onClick={() => {
                                        if(!form.point) {
                                            alert("Enter points for this question");
                                            return
                                        }

                                        if(!form.question) {
                                            alert("Enter Question")
                                            return
                                        }

                                        if(!form.correctAnswer) {
                                            alert("Enter Correct Answer")
                                            return
                                        }

                                        if(!form.answers?.length > 2) {
                                            alert("Add atleast 2 options for this question")
                                            return
                                        }

                                        
                                        setForm(prevState => ({ ...prevState, answers: [...prevState.answers, answer] }))
                                        setQuestions(prevState => ([...prevState, form]))
                                        setForm({
                                            question: "",
                                            answerSelectionType: "",
                                            answers: [],
                                            correctAnswer: "",
                                            point: ""
                                        })
                                    }} >Add Question</Button>
                                    <Button ml={2} variant={"solid"} colorScheme="teal" onClick={onOpen}>View All Questions</Button>
                                </Flex>
                            </FormControl>

                            {loading ? (
                                <Spinner mt={2} />
                            ) : (
                                <Button
                                    mt={3}
                                    variant="solid"
                                    colorScheme="green"
                                    onClick={handleSubmit}
                                >
                                    Create Assessment
                                </Button>
                            )}
                        </Box>

                    </Flex>
                    <CustomModal isOpen={isOpen} onClose={onClose}>
                        <Text fontSize={"2xl"}>All Questions</Text>
                        <Box mt={2} ml={2}>
                            {questions?.map(item => {
                                return <Box bg="#fff" p={4} mt={3} borderWidth={1} borderColor="gray.300" borderRadius={5}>
                                    <Text fontSize={"xl"}>Q: {item?.question}</Text>
                                    {item.edit ? <Box>

                                        {item?.answers?.map(item => {
                                            return <Input mt={2} placeholder={item.name} onChange={handleEditChange} />
                                        })}
                                    </Box> : <Box>
                                        <Divider />
                                        {item?.answers?.map((item, index) => {
                                            return <Text mt={2}>{index + 1} : {item?.name}</Text>
                                        })}</Box>}
                                    <Button variant={"solid"} mt={5} onClick={() => {
                                        const dup = [...questions];
                                        const idx = dup.indexOf(item);
                                        dup[idx].edit = dup[idx].edit ? false : true;
                                        setQuestions(dup)
                                    }} colorScheme="blue" >Edit</Button>
                                    <Button variant={"solid"} mt={5} onClick={() => {
                                        const r = questions.filter(i => i.question != item.question);
                                        setQuestions(r)
                                    }} colorScheme="red" ml={2}>Delete</Button>

                                </Box>
                            })}
                        </Box>
                    </CustomModal>
                </Box>
            </Layout>
        </Box>
    );
};

export default Create;
