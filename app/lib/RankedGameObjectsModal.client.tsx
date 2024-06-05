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

      <Text
        color="black"
        opacity="0.5"
        textDecoration="underline"
        onClick={handleOpenModal}
        cursor={isButtonDisabled ? "not-allowed" : "pointer"} // Shows the not-allowed cursor when disabled
        pointerEvents={isButtonDisabled ? "none" : "auto"} // Prevents clicks when disabled
      >
        Your Scores
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>2bttns Game Results</ModalHeader>
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
              <Text>You&apos;ll need to try the demo first 🕹️.</Text>
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
