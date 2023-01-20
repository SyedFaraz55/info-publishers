import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
const AddSchool = () => {
  const [local, setLocal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    name: "",
    link: "",
  });

  const getDist = async () => {
    const res = await axios.get("http://localhost:8000/api/admin/get-dist");
    console.log(res.data.result);
  };

  const getSeries = async () => {
    const result = await axios.get(
      "http://localhost:8000/api/admin/get-series"
    );
    console.log(result.data.series);
  };
  const getClasses = async () => {
    const { data } = await axios.post(
      "http://localhost:8000/api/admin/getClassById",
      { id: seriesVal }
    );
    console.log(data.result[0]);
  };
  const handleChange = (e) => {
    if (e.target.name == "file") {
      setState((prevState) => ({
        ...prevState,
        link: e.target.files[0],
      }));
      return;
    }

    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async () => {
    setLoading(true);
    console.log(state);


    const formData = new FormData();
    formData.append("file",state.link);

    const r = await axios.post(
      "http://localhost:8000/api/admin/s3url",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );


    if(!r.data.url) {
      alert("failed to upload file")
      return
    }

    state.link= r.data.url;

 

    try {
      const result = await axios.post(
        "http://localhost:8000/api/admin/add-lessons",
        {...state,id:Router.query.q}
      );
      if (result.data.ok) {
        setLoading(false);
        alert("Lesson Added");
        window.location.href = "/subjects";
      } else {
        new Error("Failed to add lessons");
        setLoading(false);
      }
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLocal(JSON.parse(localStorage.getItem("@login")));
  }, []);
  return (
    <Box height={"100vh"}>
      <Header />
      <Layout>
        <Box style={{ height: "100vh" }} p={4}>
          <Text ml={10} fontSize={"2xl"}>
            Add Lessons
          </Text>
          <Box ml={10} width={500} mt={4}>
            <form method="post">
              <FormControl mt={4} isRequired>
                <FormLabel>Lesson Name</FormLabel>
                <Input
                  background={"#fff"}
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Upload file</FormLabel>
                <Input
                  background={"#fff"}
                  name="file"
                  placeholder="File"
                  type={"file"}
                  accept="application/pdf"
                  onChange={handleChange}
                />
              </FormControl>

              {loading ? (
                <Spinner />
              ) : (
                <Button
                  onClick={handleSubmit}
                  mt={4}
                  variant={"solid"}
                  colorScheme="green"
                >
                  Add Lesson
                </Button>
              )}
            </form>
          </Box>
        </Box>
      </Layout>
    </Box>
  );
};
export default AddSchool;
