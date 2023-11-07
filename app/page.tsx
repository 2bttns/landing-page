// pages/index.tsx
import { Box, Container, Heading, Text, Button, Center, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Features from './components/Features/features';
import Image from 'next/image'
import Link from 'next/link';
import EarlyAccessModal from './components/EarlyAccessModal/EarlyAccessModal';
import SocialButtons from './components/SocialButtons/socialButtons';

const Home: NextPage = () => {
    return (
        <Container maxW="container.xl">
            <Box textAlign="center" py={10}>
                <VStack>
                    <Image
                        src="/2bttns-newest.gif"
                        alt="2bttns Company Logo"
                        width={240} // Set the size as needed
                        height={150} // Set the size as needed
                        priority
                    />
                    <Heading mb={4}>Tailoring Your App&apos;s Content with Every Click</Heading>
                    <Text mb={8}>
                        Seamlessly integrate an interactive two-button game to map user preferences and sculpt a truly personalized app journey <br /> – all in the universal language of JavaScript.
                    </Text>
                    
                    <Link href='https://docs.2bttns.com/' passHref target='_blank'>
                        <Button
                            bg="#9C27B0"
                            color={"white"}
                            size='md'
                            height='48px'
                            width='400px'
                            position="relative"
                            boxShadow="0 6px #555" // Creates the initial depth effect
                            _hover={{
                                top: "2px",
                                boxShadow: "0 4px #555" // Adjusts the shadow to make it look like the button is being pressed
                            }}
                            _active={{
                                top: "4px",
                                boxShadow: "0 2px #555" // Further adjusts the shadow to deepen the pressed effect
                            }}
                        >
                            Get Started
                        </Button>
                    </Link>
                    <EarlyAccessModal />
                    <Box m={"15px"}>
                    <SocialButtons/>
                    </Box>
                    <Features />

                </VStack>
            </Box>        
        </Container>
    );
};

export default Home;
