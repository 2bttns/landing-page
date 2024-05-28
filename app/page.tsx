// pages/index.tsx
"use client";
import {
  Container,
} from "@chakra-ui/react";
import Head from "next/head";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { HeroSection } from "./components/HeroSection/HeroSection";  // Make sure to create and import HeroSection component
import NavBar from "./components/Navbar/Navbar";

const PLAYER_ID_LOCAL_STORAGE_KEY = "player_id";

const Home: NextPage = () => {
  const [playerId, setPlayerId] = useState<string | null>(null);

  useEffect(() => {
    const playerIdFromStorage = localStorage.getItem(PLAYER_ID_LOCAL_STORAGE_KEY);
    if (!playerIdFromStorage) {
      console.info("Generating new demo player_id...");
      const generatedId = uuidv4();
      localStorage.setItem(PLAYER_ID_LOCAL_STORAGE_KEY, generatedId);
      setPlayerId(generatedId);
    } else {
      setPlayerId(playerIdFromStorage);
    }
  }, []);

  useEffect(() => {
    playerId && console.info(`Your demo player_id: ${playerId}`);
  }, [playerId]);

  if (!playerId) {
    return null; // or some loading indicator
  }

  return (<>
    <Container maxW="100vw">
      <Head>
        <title>Easily capture rich user preference data</title>
        <meta
          name="description"
          content="Easily capture rich user preference data to accurately personalize content in your web app. 100% Javascript. Integrate with just a few lines of code."
        />
      </Head>
      <NavBar />
      <HeroSection playerId={playerId}/>
    </Container>
    </>
  );
};

export default Home;