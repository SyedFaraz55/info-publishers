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
  const [local,setLocal] = useState(null)
  const [seriesVal, setSelectedSeries] = useState("");
  const [noClasses,setNoClasses]= useState()
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClasses] = useState([]);
  const getDist = async () => {
    const res = await axios.get("http://localhost:8000/api/admin/get-dist");
    console.log(res.data.result);
    setDist(res.data.result);
  };
  useEffect(() => {
    console.log(selectedClass);
  }, [selectedClass]);
  const getSeries = async () => {
    const result = await axios.get(
      "http://localhost:8000/api/admin/get-series"
    );
    console.log(result.data.series);
    setSeries(result.data.series);
  };
  const getClasses = async () => {
    const { data } = await axios.post(
      "http://localhost:8000/api/admin/getClassById",
      { id: seriesVal }
    );
    console.log(data.result[0]);
    setClasses(data.result[0]);
  };
  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async () => {
    setLoading(true);
    console.log({...state,classes:selectedClass})
    try {
      const result = await axios.post(
        "http://localhost:8000/api/admin/add-school",
        state
      );
      if (result.data.ok) {
        setLoading(false);
        alert("School Added");
        window.location.href = "/schools";
      } else {
        new Error("Failed to add school");
        setLoading(false);
      }
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDist();
    getSeries();
  }, []);

  useEffect(() => {
    getClasses();
  }, [seriesVal]);

  useEffect(()=> {
    setLocal(JSON.parse(localStorage.getItem("@login")))
  },[])
  return (
    <Box height={"100vh"}>
      <Header />
      <Layout>
        <Box background={"#fff"} style={{ height: "100vh" }} p={4}>
          <Text ml={10} fontSize={"2xl"}>
            Add School
          </Text>
          <Box ml={10} width={500} mt={4}>
            <form method="post">
              <FormControl isRequired>
                <FormLabel>Distributor or Firm Name</FormLabel>
                <Select
                  name="distId"
                  onChange={handleChange}
                  style={{ background: "#fff" }}
                >
                  <option>Select</option>
                  {dist?.map((item) => {
                    return <option value={item?._id}>{item?.firmName}</option>;
                  })}
                </Select>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>School Name</FormLabel>
                <Input
                  background={"#fff"}
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Mobile</FormLabel>
                <Input
                  background={"#fff"}
                  name="mobile"
                  placeholder="Mobile"
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  background={"#fff"}
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  background={"#fff"}
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                />
              </FormControl>

              <Flex alignItems={"center"}>
                <FormControl mt={4} isRequired>
                  <FormLabel>State</FormLabel>
                  <Input
                    background={"#fff"}
                    name="state"
                    placeholder="State"
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl ml={4} mt={4} isRequired>
                  <FormLabel>District</FormLabel>
                  <Input
                    background={"#fff"}
                    name="district"
                    placeholder="District"
                    onChange={handleChange}
                  />
                </FormControl>
              </Flex>

              <FormControl mt={4} isRequired>
                <FormLabel>Pin Code</FormLabel>
                <Input
                  background={"#fff"}
                  name="pincode"
                  placeholder="Pin Code"
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>No of Classes</FormLabel>
                <Select name="noClasses" onChange={(handleChange)}>
                <option>Select</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                  <option value={11}>11</option>
                  <option value={12}>12</option>
                </Select>
              </FormControl>
              <Box mt={2} mb={2}>
                {selectedClass.map((item) => (
                  <Badge ml={2}>{item.name}</Badge>
                ))}
              </Box>
              <FormControl mt={4} isRequired>
                <FormLabel>Select Series</FormLabel>
                <Select
                  name="series"
                  onChange={(e) => setSelectedSeries(e.target.value)}
                >
                     <option>Select</option>
                  {series?.map((item) => {
                    return <option value={item._id}>{item.name}</option>;
                  })}
                </Select>
              </FormControl>

              {classes ? (
                <Flex mt={2}>
                  {classes?.classes?.map((item) => {
                    return (
                      <Button
                        onClick={() => {
                          console.log(selectedClass.indexOf(item));
                          if (selectedClass.indexOf(item) <= 0) {
                            setSelectedClasses((prevState) => [
                              ...prevState,
                              { name: item.name, series: seriesVal },
                            ]);
                          } else {
                            alert("already added");
                          }
                        }}
                        variant={
                          selectedClass.findIndex(
                            (td) => td.name == item.name
                          ) > 0
                            ? "solid"
                            : "outline"
                        }
                        colorScheme={
                          selectedClass.findIndex(
                            (td) => td.name == item.name
                          ) > 0
                            ? "green"
                            : "default"
                        }
                        ml={2}
                      >
                        {item?.name}
                      </Button>
                    );
                  })}
                </Flex>
              ) : null}

              <Box p={2} mt={4}>
                <Divider />
                <Text fontSize={"2xl"}>Login Credentials</Text>
                <Divider />
              </Box>

              <Flex alignItems={"center"}>
                <FormControl mt={4} isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    background={"#fff"}
                    name="username"
                    placeholder="username"
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
              {loading ? (
                <Spinner />
              ) : (
                <Button
                  onClick={handleSubmit}
                  mt={4}
                  variant={"solid"}
                  colorScheme="green"
                >
                  Add School
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
