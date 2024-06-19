import { VStack, Heading, Text, Button, Center, Stack, useBreakpointValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image'
import play2bttnsDemo from '@/app/lib/play2bttnsDemo';
import RankedGameObjectsModal from '@/app/lib/RankedGameObjectsModal.client';
import { track } from '@vercel/analytics';

interface HeroSectionProps {
  playerId: string;
}

export const HeroSection = ({ playerId }: HeroSectionProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handlePlayClick = () => {
    track("Try Demo Button Clicked")
    onOpen();
  };

  const handlePlayNowClick = () => {
    track("Play Now Button Clicked")
    play2bttnsDemo({
      callbackUrl: window.location.href,
      playerId,
    });
  };

  const handleQuickStartClick = () => {
    track("Quick Start Button Clicked");
  };


  const stackDirection = useBreakpointValue<'column' | 'row'>({ base: 'column', md: 'row' });

  return (
    <Center height="100vh" width="100vw">
      <VStack
        spacing={7}
        alignItems="center"
        justifyContent="center"
        p={12}
        rounded="lg"
        maxWidth="container.xl"
        width="100%"
      >
        <Image src={"/2gif.gif"} alt={"2bttns Company logo"} width={150} height={150}/>
        <Heading fontSize={{ base: "42px", md: "60px" }} textAlign="center" fontWeight="bold">
          Personalize Content & Experiences
        </Heading>
        <Text fontSize={{ base: "20px", md: "24px" }} textAlign="center" color="gray.700">
          Collect user data ethically by adding a fun two-button game in your app.
          <br /> – all in the universal language of JavaScript.
        </Text>
        <Stack direction={stackDirection} spacing={4}>
          <VStack>
            {/* <Button
              onClick={handlePlayClick}
              as="a"
              bgGradient="linear(to-r, blue.200, purple.200)"  // Lighter gradient
              color="black"  // Adjusted text color for better visibility on light background
              size="lg"
              height="60px"
              width="250px"
              fontSize="18px"
              boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)"  // Lighter and softer shadow
              _hover={{
                bgGradient: "linear(to-r, blue.300, purple.300)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.45)"  // Slightly more intense shadow on hover
              }}
            >
              Try Demo Now 🕹️
            </Button>
            <RankedGameObjectsModal isButtonDisabled={false} playerId={playerId} /> */}
          </VStack>
          <Link href="https://docs.2bttns.com/getting-started/quick-start" passHref>
            <Button
              as="a"
              bgGradient="linear(to-r, blue.200, purple.200)"  // Lighter gradient
              color="black"  // Adjusted text color for better visibility on light background
              size="lg"
              height="60px"
              width="250px"
              fontSize="18px"
              boxShadow="0 2px 4px rgba(0, 0, 0, 0.3)"  // Lighter and softer shadow
              _hover={{
                bgGradient: "linear(to-r, blue.300, purple.300)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.45)"  // Slightly more intense shadow on hover
              }}
              onClick={handleQuickStartClick}
            >
              Quick Start →
            </Button>
          </Link>
        </Stack>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Instructions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={"bold"} mb={5}>
              Using 2bttns to Recommend Career Paths
            </Text>
            <Text>
              This demo uses 2bttns to gather your preferences and recommend career paths in tech based on your preferred combinations of traits.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handlePlayNowClick}>
              Play Now
            </Button>
            <Button variant="ghost" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};