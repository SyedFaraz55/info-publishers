import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import "../../node_modules/video-react/dist/video-react.css"; // import css

import { Player, ControlBar, BigPlayButton } from 'video-react';
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
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
import { useRouter } from "next/router";
import CustomModal from "../../components/Modal";
const Teaching = () => {
  const [data, setData] = useState([]);
  const [local,setLocal] = useState()
  const router = useRouter()
  const [series, setSeries] = useState("");
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [current, setCurrent] = useState({})
  const getAnimation = async () => {
    const result = await axios.get(
      "http://13.235.100.69:8000/api/admin/get-animation"
    );
    console.log(result.data.data);
    setData(result.data.data);
  };


  const handleDelete = async (item) => {

    const ret = confirm("Are you sure?");
    if (ret) {
      const result = await axios.post(
        "http://13.235.100.69:8000/api/admin/delete-animation",
        { id: item._id }
      );
      if (result.data.ok) {
        alert(result.data.message);
        getAnimation()
      } else {
        new Error("Failed to delete");
      }
    }
  };
  useEffect(() => {
    getAnimation();
    setLocal(JSON.parse(localStorage.getItem("@login")));
  }, []);
  return (
    <Box>
      <Header />
      <Layout>
        <Box p={4}>
          <Flex alignItems={"center"} justifyContent={"space-between"} p={4}>
            <Text fontSize="2xl">Animation</Text>

            {local?.user?.role == '0' ? 
           <Button
           onClick={() => {
             router.push("/animation/create")
           }}
           variant={"solid"}
           colorScheme="green"
         >
           Create
         </Button> 
            :null}
          </Flex>
        </Box>
        <Box p={4}>
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>

                </Tr>
              </Thead>
              <Tbody>
                {data?.map((item) => {
                  return (
                    <Tr key={item._id} style={{ background: "#fff" }}>
                      <Td>{item.name}</Td>
                      <Td>
                        <Button
                          onClick={() => {
                            setCurrent(item);
                            onOpen()
                          }}
                          variant={"link"}
                          colorScheme={"green"}
                        >
                          View
                        </Button>
                      </Td>
                    {local?.user?.role == '0' ? 
                    
                   <Td>
                        <Button
                          onClick={() => handleDelete(item)}
                          variant={"link"}
                          colorScheme={"red"}
                        >
                          Delete
                        </Button>
                      </Td>
                  :null} 
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
          <CustomModal size={"xl"} isOpen={isOpen} onClose={onClose}>
            <Box style={{ width: "100%", height: "auto" }}>
              <Player
                fluid
                autoPlay
                preload="auto"
              >
                <source src={"https://www.youtube.com/watch?v=A2ezicN5tqw&list=RDMMGcMd_DHkxY0&index=10"} />
                <ControlBar autoHide={false} />
                <BigPlayButton position="center" />

              </Player>
            </Box>
          </CustomModal>
        </Box>
      </Layout>
    </Box>
  );
};

export default Teaching;
