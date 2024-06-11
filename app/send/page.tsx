"use client";
import {
  Container,
  Box,
  Heading,
  Textarea,
  Button,
  VStack,
  useToast,
  Input
} from "@chakra-ui/react";
import Head from "next/head";
import type { NextPage } from "next";
import NavBar from "../components/Navbar/Navbar";
import { useState } from "react";

const Home: NextPage = () => {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendFeedback = async () => {
    if (!feedback || !email) {
      toast({
        title: "Email and feedback are required",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Invalid email address",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_TWOBTTNS_DISCORD_WEBHOOK_FEEDBACK_PORTAL as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: `Feedback sent from ${email}: ${feedback}` }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast({
        title: "Feedback sent successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setFeedback("");
      setEmail("");
    } catch (error) {
      toast({
        title: "Failed to send feedback",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.error("Error sending feedback:", error);
    }
  };

  return (
    <>
      <Container maxW="100vw" p={4}>
        <Head>
          <title>Send Us Feedback</title>
          <meta name="description" content="Send us feedback" />
        </Head>
        <NavBar />
        <VStack spacing={4} mt={8} align="center">
          <Heading as="h1" size="lg" textAlign="center">
            Send us feedback
          </Heading>
          <Box
            bg="white"
            p={6}
            rounded="md"
            boxShadow="md"
            w={{ base: "90%", md: "50%" }}
          >
            <Input
              placeholder="Your email"
              size="lg"
              mb={4}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired
            />
            <Textarea
              placeholder="Which friends of yours would love using 2bttns?"
              size="lg"
              minH="200px"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              isRequired
            />
            <Button
              mt={4}
              colorScheme="gray"
              boxShadow="sm"
              _hover={{ boxShadow: "md" }}
              onClick={handleSendFeedback}
            >
              Send feedback
            </Button>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default Home;