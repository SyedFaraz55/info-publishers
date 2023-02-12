import {
    Box,
    Button,
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
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [form, setForm] = useState({
        question: "",
        answerSelectionType: "",
        answers: [],
        correctAnswer: "",
        point: ""
    })
    const [questions, setQuestions] = useState([]);
    const handleSubmit = async () => {
        const confirm = window.confirm("Are you sure ?");
        if (confirm) {
            console.log({ id: router.query.q, name: state.name, questions });
            try {
                const result = await axios.post(
                    "http://localhost:8000/api/admin/add-exam",
                    { id: router.query.q, name: state.name, questions }
                );
                if (result.data.ok) {
                    setLoading(false);
                    alert("Examination Added");
                    Router.push("/examination")
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
                                <Input value={form.point} bg={"#fff"} placeholder="Name" name="Name" onChange={e => setForm(prevState => ({ ...prevState, point: e.target.value }))} />
                            </FormControl>
                            <FormControl mt={2} isRequired>
                                <FormLabel>Question</FormLabel>
                                <Textarea value={form.question} bg={"#fff"} placeholder="Name" name="Name" onChange={e => setForm(prevState => ({ ...prevState, question: e.target.value }))} />
                            </FormControl>
                            <FormControl mt={2} isRequired>
                                <FormLabel>Answer Selection Type</FormLabel>
                                <Select bg="#fff" onChange={(e) => setForm(prevState => ({ ...prevState, answerSelectionType: e.target.value }))}>
                                    <option value={""}>Select</option>
                                    <option value={"single"}>Single</option>
                                    <option value={"multiple"}>Multiple</option>
                                </Select>
                            </FormControl>
                            <Box>
                                {form.answers?.map(item => {
                                    return <Tag m={2} colorScheme="green">
                                        <TagLabel>{item}</TagLabel>
                                        <TagCloseButton onClick={() => {
                                            const dp = form.answers;
                                            const r = dp.filter(itx => itx != item);
                                            setForm(prevState => ({ ...prevState, answers: r }))
                                        }} />
                                    </Tag>
                                })}
                            </Box>
                            <FormControl mt={2} isRequired>
                                <FormLabel>Answer</FormLabel>
                                <Textarea bg={"#fff"} value={answer} placeholder="Enter Answer" name="Name" onChange={e => setAnswer(e.target.value)} />
                                <Button mt={2} colorScheme="green" variant={"outline"} onClick={() => {
                                    setForm(prevState => ({ ...prevState, answers: [...prevState.answers, answer] }))
                                    setAnswer('')
                                }} >Add Answers</Button>
                            </FormControl>
                            <FormControl mt={2} isRequired>
                                <FormLabel>Correct Answer</FormLabel>
                                <Input value={form.correctAnswer} bg={"#fff"} placeholder="Single - 1, Multiple - 1,2,3" name="Name" onChange={e => {
                                    if (form.answerSelectionType == 'single') {
                                        setForm(prevState => ({ ...prevState, correctAnswer: e.target.value }))
                                    } else {
                                        setForm(prevState => ({ ...prevState, correctAnswer: e.target.value?.split(",") }))
                                    }
                                }} />
                                <Flex mt={2} alignItems={"center"}>
                                    <Button colorScheme={"green"} variant={"solid"} onClick={() => {
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
                                    Create Exam 
                                </Button>
                            )}
                        </Box>
                    </Flex>
                    <CustomModal isOpen={isOpen} onClose={onClose}>
                        <Text fontSize={"2xl"}>All Questions</Text>
                        <Box mt={2} ml={2}>
                            {questions?.map(item => {
                                return <Flex justifyContent={"space-between"} alignItems="center" bg="#fff" p={4} mt={3} borderWidth={1} borderColor="gray.300" borderRadius={5}>
                                    <Text>{item?.question}</Text>
                                    <Button variant={"link"} onClick={() => {
                                        const r = questions.filter(i => i.question != item.question);
                                        setQuestions(r)
                                    }} colorScheme="red">Delete</Button>
                                </Flex>
                            })}
                        </Box>
                    </CustomModal>
                </Box>
            </Layout>
        </Box>
    );
};

export default Create;
