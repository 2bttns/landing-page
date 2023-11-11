'use client';
import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Box,
    UseDisclosureReturn,
    useDisclosure
} from "@chakra-ui/react";
import { fetchRankedGameObjects } from './fetchRankedGameObjects.server';

type GameObject = {
    gameObject: {
      id: string;
      name: string;
    };
    score: number;
  };

const RankedGameObjectsModal: React.FC = () => {
    const [gameObjects, setGameObjects] = useState<GameObject[]>([]); // Adjust the type according to your actual data structure
    const [isValidResponse, setIsValidResponse] = useState<boolean>(false);
    const { isOpen, onOpen, onClose }: UseDisclosureReturn = useDisclosure();

    const handleOpenModal = async () => {
        onOpen();
        const scores = await fetchRankedGameObjects();
        if (scores) {
            setGameObjects(scores);
            setIsValidResponse(true);
        } else {
            setGameObjects([]);
            setIsValidResponse(false);
        }
    };

    return (
        <>
            <Button
                bg="#8BC34A" // A shade of blue
                color="white"
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
                onClick={handleOpenModal}
            >
                Show Ranked Game Objects
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Your Ranked Results</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {isValidResponse ? (
                            gameObjects.map((item) => (
                                <Box key={item.gameObject.id} p={3} shadow="md" borderWidth="1px">
                                    <Text fontWeight="bold">{item.gameObject.name}</Text>
                                    <Text>Score: {item.score}</Text>
                                </Box>
                            ))
                        ) : (
                            <Text>Try the demo before viewing your results.</Text>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default RankedGameObjectsModal;
