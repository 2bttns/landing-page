// pages/index.tsx
"use client";
import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Text,
  VStack,
  HStack
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import EmailForm from "../components/EmailForm/EmailForm"
import Banner from "../components/Banner/Banner";

const PLAYER_ID_LOCAL_STORAGE_KEY = "player_id";

const Home: NextPage = () => {
  const [playerId, setPlayerId] = useState<string | null>(null);

  useEffect(() => {
    const playerIdFromStorage = localStorage.getItem(
      PLAYER_ID_LOCAL_STORAGE_KEY
    );
    if (playerIdFromStorage === null) {
      console.info(`Generating new demo player_id...`);
      const generatedId = uuidv4();
      localStorage.setItem(PLAYER_ID_LOCAL_STORAGE_KEY, generatedId);
      setPlayerId(generatedId);
    } else {
      setPlayerId(playerIdFromStorage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (playerId !== null) {
      console.info(`Your demo player_id: ${playerId}`);
    }
  }, [playerId]);

  if (playerId === null) {
    return null;
  }

  return (
    <Container maxW="container.xl">
      <Head>
        <meta
          title="description"
          content="Easily capture rich user preference data to accurately personalize content in your web app. 100% Javascript. Integrate with just a few lines of code."
          key="desc"
        />
      </Head>
      <Banner/>
      <Box textAlign="center" py={10}>
      
      <VStack
      spacing={5}
          >
          <Link href="/">
            <Image
              src="/2gif.gif"
              alt="2bttns Company Logo"
              width={200} // Set the size as needed
              height={200} // Set the size as needed
              priority
            />
          </Link>
            <Heading size={"3xl"}>You solved it! 🎉</Heading>
            <Text p={"30px"}>
            Oh hey. That was pretty fast. Great job. <br/> First, star⭐️ our repo <a href={"https://www.github.com/2bttns/2bttns"}><b>here</b></a> <br/> Next, come find us at Hack for Impact on feb 25th and show us this web page. <br/> Can we have your email to keep track of you?
            </Text>
          </VStack>
        <EmailForm />
        
      </Box>
    </Container>
  );
};

export default Home;
