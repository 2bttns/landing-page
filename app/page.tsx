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
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import EarlyAccessModal from "./components/EarlyAccessModal/EarlyAccessModal";
import Features from "./components/Features/features";
import SocialButtons from "./components/SocialButtons/socialButtons";
import RankedGameObjectsModal from "./lib/RankedGameObjectsModal.client";
import play2bttnsDemo from "./lib/play2bttnsDemo";

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
        <VStack spacing={5}>
          <Image
            src="/2gif.gif"
            alt="2bttns Company Logo"
            width={200} // Set the size as needed
            height={425} // Set the size as needed
            priority
          />
          <Heading>Personalize Content & Experiences</Heading>
          <Text>
            Collect user data ethically by adding a fun two-button game in your app. <br /> –
            all in the universal language of <>JavaScript</>.
          </Text>

          <Link href="https://docs.2bttns.com/" passHref target="_blank">
            <Button
              bg="#9C27B0"
              color={"white"}
              size="md"
              height="48px"
              width="400px"
              position="relative"
              boxShadow="0 6px #555" // Creates the initial depth effect
              _hover={{
                top: "2px",
                boxShadow: "0 4px #555", // Adjusts the shadow to make it look like the button is being pressed
              }}
              _active={{
                top: "4px",
                boxShadow: "0 2px #555", // Further adjusts the shadow to deepen the pressed effect
              }}
            >
              Documentation 📖
            </Button>
          </Link>

          <FormControl>
            <form
              action={play2bttnsDemo.bind(null, {
                callbackUrl: window.location.href,
                playerId,
              })}
            >
              <Button
                type="submit"
                bg="#ffd230"
                color={"black"}
                size="md"
                height="48px"
                width="400px"
                position="relative"
                boxShadow="0 6px #555" // Creates the initial depth effect
                _hover={{
                  top: "2px",
                  boxShadow: "0 4px #555", // Adjusts the shadow to make it look like the button is being pressed
                }}
                _active={{
                  top: "4px",
                  boxShadow: "0 2px #555", // Further adjusts the shadow to deepen the pressed effect
                }}
              >
                Play a demo 🕹️
              </Button>
            </form>
          </FormControl>
          <RankedGameObjectsModal
            isButtonDisabled={false}
            playerId={playerId}
          />
          <EarlyAccessModal />
          <Box m={"15px"}>
            <SocialButtons />
          </Box>
          <Features />
        </VStack>
      </Box>
    </Container>
  );
};

export default Home;
