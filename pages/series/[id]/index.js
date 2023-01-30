import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  useAnimationState,
} from "@chakra-ui/react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../../../components/Header";
import Layout from "../../../components/Layout";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import Link from "next/link";
import { ChevronRightIcon } from "@chakra-ui/icons";
const Classes = () => {
  const [data, setData] = useState([1]);
  const router = useRouter();
  const [classname, setClass] = useState("");
  const [series, setSeries] = useState("");
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);

  const getClasses = async () => {
    const { data } = await axios.post(
      "https://infopubsliher-backend.onrender.com/api/admin/getClassById",
      { id: router.query.id }
    );
    console.log(data.result[0]);
    setData(data.result[0]);
  };

  const handleClass = async () => {
    if (!data) {
      const payload = {
        id: router.query.id,
        classes: [{ name: classname }],
      };
      axios
        .post("https://infopubsliher-backend.onrender.com/api/admin/add-class", payload)
        .then((res) => {
          if (res.data.ok) {
            alert("Class Added");
            getClasses();
          } else {
            alert("Failed to add class");
          }
        })
        .catch((err) => alert(err.toString()));
      return;
    }

    const dup = data;
    dup?.classes?.push({ name: classname });
    setLoading(true);
    if (!classname) {
      alert("Please add Class name");
      setLoading(false);
      setToggle(true);
      return;
    }
    try {
      const result = await axios.post(
        "https://infopubsliher-backend.onrender.com/api/admin/update-class",
        { id: router.query.id, data }
      );
      if (result.data.ok) {
        setLoading(false);
        setToggle(false);
        alert("Class Added");

        getClasses();
      } else {
        alert("Something went wrong");
        setLoading(false);
      }
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const dup = data;

    const ret = confirm("Are you sure?");
    if (ret) {
      const deleted = dup?.classes?.filter((item) => item._id != id._id);
      setData({
        ...dup,
        classes: deleted,
      });
      const result = await axios.post(
        "https://infopubsliher-backend.onrender.com/api/admin/delete-class",
        { id: router.query.id, data: deleted }
      );
      if (result.data.ok) {
        alert(result.data.message);
        getClasses();
      } else {
        new Error("Failed to delete");
      }
    }
  };
  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {

    getClasses();
  }, [router]);
  return (
    <Box>
      <Header />
      <Layout>
        <Box p={4}>
         
          <Flex alignItems={"center"} justifyContent={"space-between"} p={4}>
            <Text fontSize="2xl">Classes</Text>

            <Button
              onClick={() => setToggle(!toggle)}
              variant={"solid"}
              colorScheme="green"
            >
              Create Class
            </Button>
          </Flex>
          <Breadcrumb ml={5} spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
          <BreadcrumbItem>
          <BreadcrumbLink href='/series'>Series</BreadcrumbLink>
          </BreadcrumbItem>
          {/* <BreadcrumbItem>
          <BreadcrumbLink href={`/series/${router.query.id}`}> Classes</BreadcrumbLink>
          </BreadcrumbItem> */}
          </Breadcrumb>
          {toggle ? (
            <Box p={4}>
              <FormControl isRequired>
                <FormLabel>Class Name</FormLabel>
                <Input
                  background={"#fff"}
                  placeholder="Class Name"
                  onChange={(e) => setClass(e.target.value)}
                />
                {loading ? (
                  <Spinner mt={2} />
                ) : (
                  <Button
                    mt={3}
                    variant="solid"
                    colorScheme="green"
                    onClick={handleClass}
                  >
                    Add Class
                  </Button>
                )}
              </FormControl>
            </Box>
          ) : null}

          <TableContainer mt={5}>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.classes?.map((item) => {
                  return (
                    <Tr key={item._id} style={{ background: "#fff" }}>
                      <Td>{item.name}</Td>
                      <Td>
                        <Link
                          href={{
                            pathname: "/subjects",
                            query: {q:item._id},
                          }}
                        >
                          <Button variant={"link"} colorScheme="green" >View</Button>
                        </Link>
                      </Td>
                      <Td>
                        <Button
                          onClick={() => handleDelete(item)}
                          variant={"link"}
                          colorScheme={"red"}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Layout>
    </Box>
  );
};

export default Classes;
