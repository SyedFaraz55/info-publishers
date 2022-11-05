import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import SideNav from "./SideNav";

export default function layout({children}) {
  return (
    <Flex style={{height:"100vh", background:"#F2F2F2"}} >
      <Box  width={250} style={{background:"#fff",height:"100vh"}} >
        <SideNav />
      </Box>
      <Box  style={{background:"#F2F2F2",width:"100%",height:"100vh"}}>
        {children}
      </Box>
    </Flex>
  );
}
