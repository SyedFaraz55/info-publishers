import React from "react";
import Image from "next/image";
import Logo from "../public/images/info.png";
import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
const Header = () => {
  const router = useRouter();
  return (
    <Flex p={4} justifyContent="space-between" alignItems="center">
      <Image alt="info publishers" src={Logo} />
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          <MenuItem command="⌘T">Profile</MenuItem>
          <MenuItem command="⌘N">Settings</MenuItem>
          <MenuItem
            onClick={() => {
              router.push("/");
              localStorage.removeItem("@login");
            }}
            command="⌘⇧N"
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Header;
