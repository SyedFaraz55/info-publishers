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
    const [title,setTitle]= useState('')
    const [toggle, setToggle] = useState(false);
    const getSeries = async () => {
        const result = await axios.get(
            "http://13.235.100.69:8000/api/admin/get-series"
        );
        console.log(result.data.series);
        setData(result.data.series);
    };

    const getClasses = async () => {
        const { data } = await axios.post(
            "http://13.235.100.69:8000/api/admin/getClassById",
            { id: series }
        );
        if (data.result) {

            setClasses(data.result[0]?.classes);
        }
    };

    const getSubjects = async () => {
        const result = await axios.post(
            "http://13.235.100.69:8000/api/admin/get-subjects",
            { id: selectedClass }
        );
        console.log(result.data.result, 'all');
        setSubjects(result.data.result);
    };

    const getLessons = async () => {

        const res = await axios.post("http://13.235.100.69:8000/api/admin/getLessonsById", { id: selectedSubject });
        console.log(res.data.result, 'lessons');
        setLessons(res.data.result);
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
                getSeries();
            } else {
                new Error("Failed to delete");
            }
        }
    };
    const [image,setImage] = useState()

    const handleSubmit = async () => {
        setLoading(true)
        const formData = new FormData();
        formData.append("file", image);
    
        const r = await axios.post(
          "http://13.235.100.69:8000/api/admin/s3url",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
    
    
        if (!r.data.url) {
          alert("failed to upload file")
          setLoading(false)
          return
        }
    
        state.link = r.data.url;
        setLoading(false)

        try {
            const result = await axios.post(
                "http://13.235.100.69:8000/api/admin/add-year-plan",
                {title,link:r.data.url }
            );
            if (result.data.ok) {
                setLoading(false);
                alert("year Plan Added");
                Router.push("/year-plan")
            } else {
                new Error("Something went wrong, please try again");
                setLoading(false);
            }
        } catch (err) {
            alert(err.message);
            setLoading(false);
        }
    }

    return (
        <Box>
            <Header />
            <Layout>
                <Box p={4} width={500}>
                    <FormControl mt={2} isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input bg={"#fff"} placeholder="Name" name="Name" onChange={e => setTitle(e.target.value)} />
                    </FormControl>
                    <FormControl mt={2} isRequired>
                        <FormLabel>Upload PDF</FormLabel>
                        <Input bg="#fff" type={"file"} accept="application/pdf" placeholder="Upload file" name="file" onChange={e => {
                            setImage(e.target.files[0])
                        }} />
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
                            Create
                        </Button>
                    )}
                </Box>
            </Layout>
        </Box>
    );
};

export default Create;
