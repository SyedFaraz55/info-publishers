import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
const AddDistributor = () => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        "https://infopubsliher-backend.onrender.com/api/admin/add-distributor",
        state
      );
      console.log(result)
      if (result.data.ok) {
        setLoading(false);
        alert("Distributor Added");
        window.location.href = "/distributors";
      } else {
        new Error("Failed to add distributor");
        setLoading(false);
      }
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  };
  return (
    <Box minInlineSize={"100vh"}>
      <Header />
      <Layout>
        <Box p={4}>
          <Text fontSize={"2xl"}>Add Distributor</Text>
          <Box width={500} mt={4}>
            <form method="post">
              <FormControl isRequired>
                <FormLabel>Distributor or Firm Name</FormLabel>
                <Input
                  background={"#fff"}
                  name="firmName"
                  placeholder="Distributor or Firm Name"
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Name</FormLabel>
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
                  Add Distributor
                </Button>
              )}
            </form>
          </Box>
        </Box>
      </Layout>
    </Box>
  );
};
export default AddDistributor;
