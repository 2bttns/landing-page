"use client";
import React, { useState } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import { fetchRankedGameObjects } from "./fetchRankedGameObjects.server";
import { Spinner } from "@chakra-ui/react";
import { track } from '@vercel/analytics';

type GameObject = {
  gameObject: {
    id: string;
    name: string;
  };
  score: number;
};

type RankedGameObjectsModalProps = {
  isButtonDisabled: boolean;
  playerId: string;
};

const RankedGameObjectsModal: React.FC<RankedGameObjectsModalProps> = ({
  isButtonDisabled,
  playerId,
}) => {
  const [gameObjects, setGameObjects] = useState<GameObject[]>([]); // Adjust the type according to your actual data structure
  const [isValidResponse, setIsValidResponse] = useState<boolean>(false);
  const { isOpen, onOpen, onClose }: UseDisclosureReturn = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpenModal = async () => {
    track('Opened_ViewResultsModal')
    setIsLoading(true);
    onOpen();
    try {
      const scores = await fetchRankedGameObjects(playerId); // Pass playerId here
      if (scores) {
        setGameObjects(scores);
        setIsValidResponse(true);
      } else {
        setGameObjects([]);
        setIsValidResponse(false);
      }
    } catch (error) {
      // handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        bg="#8BC34A" // Light green color
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
        isDisabled={isButtonDisabled} // Use the prop to control the disabled state
      >
        View Demo Results
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Game Scores</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <Spinner /> // Render the spinner while loading
            ) : isValidResponse ? (
              gameObjects.map((item) => (
                <Box
                  key={item.gameObject.id}
                  p={3}
                  shadow="md"
                  borderWidth="1px"
                >
                  <Text fontWeight="bold">{item.gameObject.name}</Text>
                  <Text>Score: {item.score}</Text>
                </Box>
              ))
            ) : (
              <Text>You&apos;ll need to play the demo first.</Text>
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
