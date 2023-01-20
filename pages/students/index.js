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
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
const AddSchool = () => {
  const [state, setState] = useState({});
  const [dist, setDist] = useState([]);
  const [series, setSeries] = useState([]);
  const [classes, setClasses] = useState([]);
  const [local, setLocal] = useState(null);
  const [seriesVal, setSelectedSeries] = useState("");
  const [noClasses, setNoClasses] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClasses] = useState([]);
  const [data, setData] = useState([]);
  const [school, setSchool] = useState("");
  const getSchool = async () => {
    const res = await axios.get("http://localhost:8000/api/admin/get-schools");
    console.log(res.data.result);
    setData(res.data.result);
  };
  const getSeries = async () => {
    const result = await axios.get(
      "http://localhost:8000/api/admin/get-series"
    );
    console.log(result.data.series);
    setSeries(result.data.series);
  };

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async () => {
    // setLoading(true);
    console.log({ ...state, standard: seriesVal, school });

    try {
      const result = await axios.post(
        "http://localhost:8000/api/admin/add-student",
        { ...state, standard: seriesVal, school }
      );
      if (result.data.ok) {
        setLoading(false);
        alert("Student Added");
        window.location.href = "/schools";
      } else {
        new Error("Failed to add Student");
        setLoading(false);
      }
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const filter = data?.filter((item) => item._id == school)[0];
    setClasses(filter?.classes);
  }, [school]);
  useEffect(() => {
    getSchool();
  }, []);

  useEffect(() => {
    setLocal(JSON.parse(localStorage.getItem("@login")));
  }, []);
  return (
    <Box height={"100vh"}>
      <Header />
      <Layout>
        <Box style={{ height: "100vh" }} p={4}>
          <Text ml={10} fontSize={"2xl"}>
            Add Student
          </Text>
          <Box ml={10} width={500} mt={4}>
            <form method="post">
              <FormControl mt={4} isRequired>
                <FormLabel>Student Name</FormLabel>
                <Input
                  background={"#fff"}
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Father Name</FormLabel>
                <Input
                  background={"#fff"}
                  name="fatherName"
                  placeholder="Father Name"
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  background={"#fff"}
                  name="dob"
                  placeholder="DOB"
                  onChange={handleChange}
                  type="date"
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Pin Code</FormLabel>
                <Input
                  background={"#fff"}
                  name="pin"
                  placeholder="Pin Code"
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Mobile</FormLabel>
                <Input
                  background={"#fff"}
                  name="mobile"
                  placeholder="mobile"
                  onChange={handleChange}
                />
              </FormControl>

              <Flex alignItems={"center"}>
                <FormControl mt={4} isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    background={"#fff"}
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl ml={4} mt={4} isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    background={"#fff"}
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </FormControl>
              </Flex>

              <FormControl mt={4} isRequired>
                <FormLabel>School</FormLabel>
                <Select
                  bg={"#fff"}
                  name="school"
                  onChange={(e) => {
                    setSchool(e.target.value);
                  }}
                >
                  <option>Select</option>
                  {data?.map((item) => {
                    return <option value={item._id}>{item?.name}</option>;
                  })}
                </Select>
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>Select Series</FormLabel>
                <Select
                  name="series"
                  onChange={(e) => setSelectedSeries(e.target.value)}
                >
                  <option>Select</option>
                  {classes?.map((item) => {
                    console.log(item, "cals");
                    return <option value={item.series}>{item?.name}</option>;
                  })}
                </Select>
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
                  Add Student
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
