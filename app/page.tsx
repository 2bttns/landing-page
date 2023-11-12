// pages/index.tsx
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Center,
  VStack,
  FormControl,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Features from "./components/Features/features";
import Image from "next/image";
import Link from "next/link";
import EarlyAccessModal from "./components/EarlyAccessModal/EarlyAccessModal";
import SocialButtons from "./components/SocialButtons/socialButtons";
import Head from "next/head";
import { twobttns } from "./lib/2bttns";
import { RedirectType, redirect } from "next/navigation";
import RankedGameObjectsModal from "./lib/RankedGameObjectsModal.client";

const Home: NextPage = () => {

  const playerID = crypto.randomUUID()

  async function play2bttnsDemo() {
    "use server";
    const url = twobttns.generatePlayUrl({
      gameId: process.env.DEMO_GAME_ID!,
      playerId: playerID,                         // "amer", // crypto.randomUUID()
      callbackUrl: process.env.CALLBACK_URL,
    });
    return redirect(url, RedirectType.push);
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
            src="/demo.gif"
            alt="2bttns Company Logo"
            width={400} // Set the size as needed
            height={850} // Set the size as needed
            priority
          />
          <Heading>Personalize Content & Experiences</Heading>
          <Text>
            Quickly integrate an interactive two-button game to map user
            preferences and curate a truly personalized user experience <br /> –
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
              Get Started
            </Button>
          </Link>

          <FormControl>
            <form action={play2bttnsDemo}>
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
                Try the Demo!
              </Button>
            </form>
          </FormControl>
          <RankedGameObjectsModal isButtonDisabled={false} playerId={playerID}/>
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
