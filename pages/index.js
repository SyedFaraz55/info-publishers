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
      setURL("http://localhost:8000/api/admin/login");
    }

    if (role == 1) {
      setURL("http://localhost:8000/api/admin/dist-login");
    }
    if (role == 2) {
      setURL("http://localhost:8000/api/admin/school-login");
    }
  }, [role]);
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(role);
    if (role == 0) {
      const result = await axios.post(url, {
        password: user.password,
        user: user.mobile,
      });
      console.log(result);
      if (result.data.ok) {
        router.push("/dashboard");
        localStorage.setItem("@login", JSON.stringify(result.data));
        axiosInstance.defaults.headers.common['x-auth-token'] = result.data.token
      } else {
        setError(result.data);
      }
    } else {
      const result = await axios.post(url, {
        ...user,
      });
      console.log(result);
      if (result.data.ok) {
        if(result.data.user.role == 2) {
          localStorage.setItem("@login", JSON.stringify(result.data));
          window.location.href = '/school-admin'
        } else if(result.data.user.role == 1) {
          localStorage.setItem("@login", JSON.stringify(result.data));
          Router.push('/distributor-admin')
          axiosInstance.defaults.headers.common['x-auth-token'] = result.data.token
        } else {
          alert("Something went wrong")
        }
      } else {
        setError(result.data);
      }
    }
  };
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
