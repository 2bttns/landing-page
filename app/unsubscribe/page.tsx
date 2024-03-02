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
import Banner from "../components/Banner/Banner";
import UnsubscribeModal from "../components/UnsubscribeModal/UnsubscribeModal";

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
      <Box textAlign="center" py={10}>
      <VStack
      spacing={5}
          >
            <Text p={"30px"}>
            We&apos;re sorry to see you go...but we hope this isn&apos;t the last time we see you.
            </Text>
          </VStack>
        <UnsubscribeModal />
      </Box>
    </Container>
  );
};

export default Home;
