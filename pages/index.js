import Image from "next/image";
import Logo from "../public/images/info.png";

import { useEffect, useState } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import {
  Alert,
  Box,
  Container,
  Input,
  InputGroup,
  MenuItem,
  useDisclosure,
  Button,
  Select,
} from "@chakra-ui/react";
import axiosInstance from "../Services/core";

const App = () => {
  const [role, setRole] = useState();
  const [url, setURL] = useState();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading,setLoading] = useState(false)
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true });
  const [user, setUser] = useState({
    mobile: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  useEffect(() => {
    if (role == 0) {
      setURL("https://infopubsliher-backend.onrender.com//api/admin/login");
    }

    if (role == 1) {
      setURL("https://infopubsliher-backend.onrender.com//api/admin/dist-login");
    }
    if (role == 2) {
      setURL("https://infopubsliher-backend.onrender.com//api/admin/school-login");
    }

    if (role == 3) {
      setURL('https://infopubsliher-backend.onrender.com//api/admin/student-login')
    }
  }, [role]);
  const handleLogin = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (role == 0) {
      const result = await axios.post(url, {
        password: user.password,
        user: user.mobile,
      });
      if (result.data.ok) {
        router.push("/dashboard");
        localStorage.setItem("@login", JSON.stringify(result.data));
        axiosInstance.defaults.headers.common['x-auth-token'] = result.data.token

    setLoading(false)
      } else {
        setError(result.data);
    setLoading(false)
      }
    } else {
      const result = await axios.post(url, {
        ...user,
      });

      if (result.data.ok) {
        if (result.data.user.role == 2) {
          localStorage.setItem("@login", JSON.stringify(result.data));
          if (result.data.user.active) {

    setLoading(false)
            localStorage.setItem("@login", JSON.stringify(result.data));
            router.push("/school-admin")
          } else {
            alert("User is de-active. Please contact administrator");
    setLoading(false)
            return
          }
        } else if (result.data.user.role == 1) {
          if (result.data.user.active) {

            localStorage.setItem("@login", JSON.stringify(result.data));
    setLoading(false)
            router.push("/distributor-admin")
          } else {
            alert("User is de-active. Please contact administrator");
    setLoading(false)
            return
          }
          axiosInstance.defaults.headers.common['x-auth-token'] = result.data.token
        } else if (result.data.user.role == 3) {
          if (result.data.user.active) {

            localStorage.setItem("@login", JSON.stringify(result.data));
    setLoading(false)
            router.push("/student-login")
          } else {
            alert("User is de-active. Please contact administrator");
    setLoading(false)

            return
          }

        } else {
          alert("Something went wrong")
    setLoading(false)
        }
      } else {
        setError(result.data);
    setLoading(false)
      }
    }
  };

  const getLocalStorage = () => {
    const local = JSON.parse(localStorage.getItem("@login"));
    console.log(local);
    axiosInstance.defaults.headers.common['x-auth-token'] = local?.token;
    if (local?.user.role == "0") {
      router.push("/dashboard");
    } else if (local?.user.role == '1') {
      router.push('/distributor-admin')
    } else if (local?.user.role == '2') {

      router.push('/school-admin')
    } else {
      router.push("/")
    }
  }
  useEffect(() => {
    getLocalStorage();
  }, [])
  return (
    <Box mt={150}>
      <Container>
        <Box mt={15} mb={10} style={{ marginLeft: 180 }}>
          <Image src={Logo} />
        </Box>
        <Box>
          {error && <Alert status="error">{error.message}</Alert>}
          <form method="post">
            <InputGroup style={{ marginTop: 15 }}>
              <Select
                select
                label="Select Role"
                value={role?.value}
                onChange={handleChange}
                placeholder="Select option"
              >
                {[
                  { label: "Admin", value: 0 },
                  { label: "School", value: 2 },
                  { label: "Distributor", value: 1 },
                  { label: "Student", value: 3 },
                ].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </InputGroup>
            <InputGroup mt={4} style={{ marginTop: 10 }}>
              <Input
                placeholder="Mobile"
                onChange={(e) =>
                  setUser((prevState) => ({
                    ...prevState,
                    mobile: e.target.value,
                  }))
                }
              />
            </InputGroup>

            <InputGroup style={{ marginTop: 10 }}>
              <Input
                label="Password"
                placeholder="Password"
                type={"password"}
                onChange={(e) =>
                  setUser((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }))
                }
              />
            </InputGroup>
            <Button
              onClick={handleLogin}
              type="submit"
              style={{ marginTop: 10, marginLeft: 220 }}
              variant="solid"
              colorScheme={"green"}
              isLoading={loading}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default App;
