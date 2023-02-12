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
    date:"",
    subs: []
  })
  const [state, setState] = useState({
    name: "",
    link: "",
  });
  const [rows, setRows] = useState([]);

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
    console.log({...form,subs:rows});

    if(form.name == '') {
      alert("Lesson Name is required");
      setLoading(false);
      return
    }


    const formData = new FormData();
    // formData.append("file", state.link);

    // const r = await axios.post(
    //   "http://localhost:8000/api/admin/s3url",
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
        "http://localhost:8000/api/admin/add-lessons",
        { ...form,subs:rows, id: Router.query.q }
      );
      if (result.data.ok) {
        setLoading(false);
        alert("Lesson Added");
        Router.back()
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
                  onChange={e => setForm(prevState => ({ ...prevState, name: e.target.value }))}
                />
              </FormControl>

              {/* <FormControl mt={4} isRequired>
                <FormLabel>Upload file</FormLabel>
                <Input
                  background={"#fff"}
                  name="file"
                  placeholder="File"
                  type={"file"}
                  accept="application/pdf"
                  onChange={handleChange}
                />
              </FormControl> */}

              <Divider mt={5} />

              <Box>

                <FormControl mt={4} isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    background={"#fff"}
                    value={state?.name}
                    name="partname"
                    placeholder="Part Name"
                    onChange={e => setState(prevState => ({ ...prevState, name: e.target.value }))}
                  />
                </FormControl>

                <FormControl mt={4} isRequired>
                  <FormLabel>Link</FormLabel>
                  <Input
                    background={"#fff"}
                    value={state.link}
                    name="link"
                    placeholder="Link"
                    onChange={e => setState(prevState => ({ ...prevState, link: e.target.value }))}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Select Date</FormLabel>
                  <Input
                    background={"#fff"}
                    value={form.date}
                    name="date"
                    placeholder="date"
                    type={"date"}
                    onChange={e => setForm(prevState => ({...prevState,date:e.target.value}))}
                  />
                </FormControl>
                <Button mt={5} variant="outline" colorScheme={"green"} onClick={() => {
                  if(state.link == '') {
                    alert("link is required");
                    return
                  }
                  setRows(prevState => ([...prevState, state]))
                  setState({name:"",link:""})
                }}>Add</Button>
                <Box mt={4}>
                  {
                    rows?.length > 0 ? rows?.map(item => {
                      return <Flex justifyContent="space-between" alignItems="center" mt={2} border={"1px"} borderRadius={4} bg="#fff" borderColor={"gray.300"} p={3}>
                      <Text>  {item.name}</Text>
                      <Button colorScheme={"red"} variant={"link"} onClick={() => {
                        const r = rows.filter(ix => ix.name != item.name);
                        setRows(r)
                      }} >Delete</Button>
                      </Flex>
                    }) : null
                  }
                </Box>
              </Box>
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
