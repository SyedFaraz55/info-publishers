import { Box, Divider, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import DashIcon from "../public/images/disable/dashboard_disable.svg";
import Schools from "../public/images/disable/school_disable.svg";
import Dist from "../public/images/disable/distributor_disable.svg";
import Students from "../public/images/disable/students_disable.svg";
import Online from "../public/images/disable/online_teaching_disable.svg";
import Assessment from "../public/images/disable/assessments_disable.svg";
import Notice from "../public/images/disable/notice_disable.svg";

import React, { useEffect, useState } from "react";

export default function SideNav() {
  const [local, setLocal] = useState();

  useEffect(() => {
    setLocal(JSON.parse(localStorage.getItem("@login")));
  }, []);
  return (
    <Box p={0}>
      <Flex p={2} ml={4} alignItems={"center"}>
        <Image src={DashIcon} style={{ marginRight: 10 }} />
        <Link
          legacyBehavior
          href={local?.user.role == 1 ? "/distributor-admin" : local?.user.role == 2 ?  "/school-admin" : "/dashboard"}
        >
          <a>Dashboard</a>
        </Link>
      </Flex>
      <Divider marginTop={3} />

      {local?.user?.role == 0 && (
        <>
          <Flex p={2} ml={4} alignItems={"center"}>
            <Image src={Dist} style={{ marginRight: 10 }} />
            <Link legacyBehavior href={"/distributors"}>
              <a>Distributors</a>
            </Link>
          </Flex>
          <Divider marginTop={3} />
        </>
      )}

      {local?.user?.role == 0 && (
        <>
          <Flex p={2} ml={4} alignItems={"center"}>
            <Image src={Assessment} style={{ marginRight: 10 }} />
            <Link legacyBehavior href={"/series"}>
              <a>Series</a>
            </Link>
          </Flex>
          <Divider marginTop={3} />
        </>
      )}

   {local?.user?.role == 2 ? null : <>
    <Flex p={2} ml={4} alignItems={"center"}>
        <Image src={Schools} style={{ marginRight: 10 }} />
        <Link legacyBehavior href={local?.user?.role == 0 ? "/schools" : "/distributor-admin/schools"}>
          <a>Schools</a>
        </Link>
      </Flex>
      <Divider marginTop={3} />
   </>}

      <Flex p={2} ml={4} alignItems={"center"}>
        <Image src={Students} style={{ marginRight: 10 }} />
        {local?.user?.role == 1 || local?.user?.role == 0 ? (
          <Link legacyBehavior href={"/gb?q=63c55ada1bb0c9133bc7701b"}>
            <a>Global Students</a>
          </Link>
        ) : (
          <Link legacyBehavior href={local?.user?.role == 2 ? '/schools/view?q=63c58665f3e16f23727492c4' : "/students"}>
            <a>Students</a>
          </Link>
        )}
      </Flex>
      <Divider marginTop={3} />

      {local?.user?.role == 1|| local?.user?.role == 0 && (
        <>
          <Flex p={2} ml={4} alignItems={"center"}>
            <Image src={Students} style={{ marginRight: 10 }} />
            <Link legacyBehavior href={"/gb2?q=63c55aed1bb0c9133bc77022"}>
              <a>E-Smart Students</a>
            </Link>
          </Flex>
          <Divider marginTop={3} />
        </>
      )}

      <Flex p={2} ml={4} alignItems={"center"}>
        <Image src={Online} style={{ marginRight: 10 }} />
        <Link legacyBehavior href={"/teaching"}>
          <a>Online Teaching</a>
        </Link>
      </Flex>
      <Divider marginTop={3} />

     {local?.user?.role == 1 ? null : <>
     
      <Flex p={2} ml={4} alignItems={"center"}>
        <Image src={Assessment} style={{ marginRight: 10 }} />
        <Link legacyBehavior href={"/assessment"}>
          <a>Assessment</a>
        </Link>
      </Flex>
      <Divider marginTop={3} />
     </>}

   {local?.user?.role == 2 ? null : <>
    <Flex p={2} ml={4} alignItems={"center"}>
        <Image src={Notice} style={{ marginRight: 10 }} />
        <Link legacyBehavior href={"/notices"}>
          <a>Notices</a>
        </Link>
      </Flex>
   </>}
      <Divider marginTop={3} />
    </Box>
  );
}