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
  const [form, setForm] = useState({
    name: "",
    subs: []
  })
  const [state, setState] = useState({
    name: "",
    link: "",
    date: ""
  });
  const [rows, setRows] = useState([]);

  const getDist = async () => {
    const res = await axios.get("http://13.235.100.69:8000/api/admin/get-dist");
    console.log(res.data.result);
  };

  const getSeries = async () => {
    const result = await axios.get(
      "http://13.235.100.69:8000/api/admin/get-series"
    );
    console.log(result.data.series);
  };
  const getClasses = async () => {
    const { data } = await axios.post(
      "http://13.235.100.69:8000/api/admin/getClassById",
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


    // formData.append("file", state.link);

    // const r = await axios.post(
    //   "http://13.235.100.69:8000/api/admin/s3url",
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }
    // );


    // if (!r.data.url) {
    //   alert("failed to upload file")
    //   return
    // }

    // state.link = r.data.url;



    try {
      const result = await axios.post(
        "http://13.235.100.69:8000/api/admin/add-animation",
        { ...state, id: Router.query.q }
      );
      if (result.data.ok) {
        setLoading(false);
        alert("Animation Added");
        Router.push("/teaching")
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
  console.log(rows, 'rows')
  return (
    <Box height={"100vh"}>
      <Header />
      <Layout>
        <Box style={{ height: "100vh" }} p={4}>
          <Text ml={10} fontSize={"2xl"}>
            Add Animation
          </Text>
          <Box ml={10} width={500} mt={4}>
            <form method="post">
              <FormControl mt={4} isRequired>
                <FormLabel>Animation Name</FormLabel>
                <Input
                  background={"#fff"}
                  name="name"
                  placeholder="Name"
                  onChange={e => setState(prevState => ({ ...prevState, name: e.target.value }))}
                />
              </FormControl>


              <FormControl mt={4} isRequired>
                <FormLabel>Link</FormLabel>
                <Input
                  background={"#fff"}
                  name="link"
                  placeholder="Link"
                  onChange={e => setState(prevState => ({ ...prevState, link: e.target.value }))}
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
                  Add
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
