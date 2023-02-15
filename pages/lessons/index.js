import { Badge, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import "../../node_modules/video-react/dist/video-react.css"; // import css
import VideoImageThumbnail from 'react-video-thumbnail-image'; // use npm published version

import { Player, ControlBar, BigPlayButton } from 'video-react';

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
import Router, { useRouter } from "next/router";
import CustomModal from "../../components/Modal";
import { ChevronRightIcon } from "@chakra-ui/icons";
const School = () => {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState({});
  const [video, setVideo] = useState()
  const [player, setVideoPlayer] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const getLessons = async () => {
    const res = await axios.post("https://infopubsliher-backend.onrender.com/api/admin/getLessonsById", { id: Router.query.q });
    console.log(res.data.result);
    setData(res.data.result);
  };
  const router = useRouter();
  const handleDelete = async (id) => {
    const result = await axios.post(
      "https://infopubsliher-backend.onrender.com/api/admin/delete-lesson",
      { id: id._id }
    );
    if (result.data.ok) {
      alert("Lesson Deleted");
      getLessons()
    } else {
      new Error("Failed to delete");
      alert("Something went wrong")
    }
  };

  useEffect(() => {
    getLessons();
  }, []);

  useEffect(() => {
    getLessons();
  }, [router]);




  return (
    <Box>
      <Header />
      <Layout>
        <Box p={4}>
          <Flex alignItems={"center"} justifyContent={"space-between"} p={4}>
            <Text fontSize="2xl">Lessons</Text>

            <Button
              onClick={() => {
                Router.push({
                  pathname: "/lessons/add-lessons",
                  query: Router.query
                })
              }}
              variant={"solid"}
              colorScheme="green"
            >
              Create Lessons
            </Button>

          </Flex>
        </Box>

        <Box p={4}>
          <Breadcrumb ml={5} spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
            <BreadcrumbItem>
              <BreadcrumbLink href='/series'>Series</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => router.back()}> Classes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={() => router.back()}> Subjects</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <TableContainer mt={5}>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Status</Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((item) => {
                  return (
                    <Tr background={"#fff"} key={item._id}>
                      <Td>{item.name}</Td>
                      <Td>
                        {item.pending ? (
                          <Badge colorScheme="red">Pending</Badge>
                        ) : (
                          <Badge colorScheme={"green"}>Active</Badge>
                        )}
                      </Td>
                      <Td>
                        <Button
                          onClick={() => {
                            onOpen()
                            setCurrent(item);


                            console.log(item)
                          }}
                          variant={"link"}
                          colorScheme="green"
                        >
                          View
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          onClick={() => {
                            const check = confirm("Are you sure ?");
                            if (check) {
                              handleDelete(item);
                            }
                          }}
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
          <CustomModal isOpen={isOpen} onClose={onClose} onClick={onOpen}>
            <Box>
              <Text fontSize={"2xl"}>{current?.name}</Text>
            </Box>
            <Box mt={4}>
              {
                current?.subs?.map(item => {
                  return <Box onClick={() => {
                    onOpen2();
                    setVideo(item)
                  }} mt={2} p={2} border="1px" borderColor={"gray.300"} borderRadius={4} >
                    <Text>{item?.name}</Text>
                    <VideoImageThumbnail
                      videoUrl={item?.link}
                      thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                      width={30}
                      height={30}
                      alt="my test video"
                    />
                  </Box>
                })
              }
            </Box>
          </CustomModal>

          <CustomModal size={"xl"} isOpen={isOpen2} onClose={onClose2}>
            <Box style={{ width: "100%", height: "auto" }}>
              <Player
                fluid
                autoPlay
              >
                <source src={video?.link} />
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

export default School;
