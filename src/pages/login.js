import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useState } from "react";
import { fireAuth } from "../service/firebase.js";
import Nav from "../components/nav"
import { requestGraphql } from "../../utils/request.js";
import { Loginin } from "../../helpers/query.helper.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const router = useRouter();
  const { id } = router.query;

  const onSubmitLogin = () => requestGraphql(Loginin({ email: email, password: password }))
    .then((data) => {
      console.log("data", data)

      localStorage.setItem("token", data.data.login.token)
      router.push("/")
    })

  return (
    <div>
      <Nav></Nav>
      <Flex w="full" h="full" minH="90vh" align="center" justify="center">
        <Box border="2px solid" w="lg" borderColor="brand.blue" rounded={12} p={8}>
          <Heading fontSize="2xl">Login</Heading>
          <Stack spacing={4} mt={8}>
            <Input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              isRequired
              type="email"
            />
            <Input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              isRequired
              type="password"
            />
            <Button
              isLoading={isLoading}
              type="submit"
              w="full"
              variant="solid"
              backgroundColor="brand.blue"
              color="white"
              onClick={onSubmitLogin}
            >
              Continue
            </Button>
            <Link href="/signup">
              <Button w="full" variant="link" color="brand.blue">
                Sign up
              </Button>
            </Link>
          </Stack>
        </Box>
      </Flex>
    </div>

  );
}
