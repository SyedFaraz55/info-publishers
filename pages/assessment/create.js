import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    Spinner,
    Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Router, { useRouter } from "next/router";
const Create = () => {
    const [data, setData] = useState([]);
    const router = useRouter()
    const [state, setState] = useState({ name: "", link: "" })
    const [series, setSeries] = useState("");
    const [selectedClass, setSelectedClass] = useState('')
    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState();
    const [selectedLesson, setSelectedLesson] = useState()
    const [lessons, setLessons] = useState([])
    const [toggle, setToggle] = useState(false);
    const getSeries = async () => {
        const result = await axios.get(
            "http://localhost:8000/api/admin/get-series"
        );
        console.log(result.data.series);
        setData(result.data.series);
    };

    const getClasses = async () => {
        const { data } = await axios.post(
            "http://localhost:8000/api/admin/getClassById",
            { id: series }
        );
        if (data.result) {

            setClasses(data.result[0]?.classes);
        }
    };

    const getSubjects = async () => {
        const result = await axios.post(
            "http://localhost:8000/api/admin/get-subjects",
            { id: selectedClass }
        );
        console.log(result.data.result, 'all');
        setSubjects(result.data.result);
    };

    const getLessons = async () => {

        const res = await axios.post("http://localhost:8000/api/admin/getLessonsById", { id: selectedSubject });
        console.log(res.data.result, 'lessons');
        setLessons(res.data.result);
    };

    const handleDelete = async (item) => {
        const ret = confirm("Are you sure?");
        if (ret) {
            const result = await axios.post(
                "http://localhost:8000/api/admin/delete-series",
                { id: item._id }
            );
            if (result.data.ok) {
                alert(result.data.message);
                getSeries();
            } else {
                new Error("Failed to delete");
            }
        }
    };

    const handleSubmit = async () => {
        localStorage.setItem("@quiz", JSON.stringify({ ...state, id: selectedLesson }));
        if(series == '') {
            alert("Please select series");
            return
        }
        router.push({
            pathname: "/assessment/create-assessment",
            query: `q=${selectedLesson}`
        });
        return
        try {
            const result = await axios.post(
                "http://localhost:8000/api/admin/add-teaching",
                { ...state, id: selectedLesson }
            );
            if (result.data.ok) {
                setLoading(false);
                alert("Teaching Added");
                Router.push("/teaching")
            } else {
                new Error("Something went wrong, please try again");
                setLoading(false);
            }
        } catch (err) {
            alert(err.message);
            setLoading(false);
        }
    }
    useEffect(() => {
        getSeries();
    }, []);

    useEffect(() => {
        getClasses();
    }, [series])

    useEffect(() => {
        getClasses();
    }, [series])

    useEffect(() => {
        getSubjects();
    }, [selectedClass])

    useEffect(() => {
        getLessons();
    }, [selectedSubject])
    return (
        <Box>
            <Header />
            <Layout>
                <Box p={4} width={500}>
                    <FormControl isRequired>
                        <FormLabel>Select Series</FormLabel>
                        <Select onChange={(e) => {
                            console.log(e.target.value, 'id')
                            setSeries(e.target.value)
                        }} background={"#fff"}>
                            <option>Select</option>
                            {data?.map(item => {
                                return <option value={item._id} >{item?.name}</option>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl mt={2} isRequired>
                        <FormLabel>Select Class</FormLabel>
                        <Select onChange={(e) => {
                            setSelectedClass(e.target.value)
                        }} background={"#fff"}>
                            <option>Select</option>
                            {classes?.map(item => {
                                return <option value={item._id} >{item?.name}</option>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl mt={2} isRequired>
                        <FormLabel>Select Subject</FormLabel>
                        <Select onChange={(e) => {
                            setSelectedSubject(e.target.value)
                        }} background={"#fff"}>
                            <option>Select</option>
                            {subjects?.map(item => {
                                return <option value={item._id} >{item?.subject}</option>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl mt={2} isRequired>
                        <FormLabel>Select Lesson</FormLabel>
                        <Select onChange={(e) => {
                            setSelectedLesson(e.target.value)
                        }} background={"#fff"}>
                            <option>Select</option>
                            {lessons?.map(item => {
                                return <option value={item._id} >{item?.name}</option>
                            })}
                        </Select>
                    </FormControl>
                   
                    {/* <FormControl  mt={2} isRequired>
                        <FormLabel>Link</FormLabel>
                       <Input bg="#fff" placeholder="Link" name="link" onChange={e => setState(prevState => ({...prevState,link:e.target.value}))} />
                    </FormControl> */}
                    {loading ? (
                        <Spinner mt={2} />
                    ) : (
                        <Button
                            mt={3}
                            variant="solid"
                            colorScheme="green"
                            onClick={handleSubmit}
                        >
                            Create
                        </Button>
                    )}
                </Box>
            </Layout>
        </Box>
    );
};

export default Create;
