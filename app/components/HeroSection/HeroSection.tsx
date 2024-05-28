import { VStack, Heading, Text, Button, Center, Stack, useBreakpointValue } from '@chakra-ui/react';
import Link from 'next/link';
import play2bttnsDemo from '@/app/lib/play2bttnsDemo';

interface HeroSectionProps {
  playerId: string;
}

export const HeroSection = ({ playerId }: HeroSectionProps) => {
  const handlePlayClick = () => {
    play2bttnsDemo({
      callbackUrl: window.location.href,
      playerId,
    });
  };

  const stackDirection = useBreakpointValue<'column' | 'row'>({ base: 'column', md: 'row' });
  
  return (
    <Center height="100vh" width="100vw">
      <VStack
        spacing={10}
        alignItems="center"
        justifyContent="center"
        p={12}
        rounded="lg"
        maxWidth="container.xl"
        width="100%"
      >
        <Heading fontSize={{ base: "42px", md: "60px" }} textAlign="center" fontWeight="bold">
          Personalize Content & Experiences
        </Heading>
        <Text fontSize={{ base: "20px", md: "24px" }} textAlign="center" color="gray.700">
          Collect user data ethically by adding a fun two-button game in your app.
          <br /> – all in the universal language of JavaScript.
        </Text>
        <Stack direction={stackDirection} spacing={4}>
          {/* <Button
            onClick={handlePlayClick}
            bg="#ffd230"
            color="black"
            size="lg"
            height="60px"
            width="250px"
            fontSize="18px"
            boxShadow="0 6px #555"
            _hover={{ boxShadow: "0 8px #555" }}
            _active={{ boxShadow: "0 4px #555" }}
          >
            Try Demo Now 🕹️
          </Button> */}
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
            >
              Quick Start →
            </Button>
          </Link>
        </Stack>
      </VStack>
    </Center>
  );
};