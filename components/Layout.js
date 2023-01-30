import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import SideNav from "./SideNav";

export default function layout({ children }) {
  return (
    <Flex style={{ background: "#F2F2F2", height: "110vh", width: "100%" }} >
      <Box style={{ background: "#fff", }} >
        <SideNav />
      </Box>
      <Box style={{ background: "#F2F2F2", height: "100vh", width: "100%" }}>
        {children}
      </Box>
    </Flex>
  );
}
