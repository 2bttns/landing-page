'use client'
import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  Button,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { track } from '@vercel/analytics';

const EarlyAccessModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');

  const sendToDiscord = async (emailAddress: string) => {
    if (emailAddress) {
      try {
        const webhookContent = JSON.stringify({
          content: `CAN-SPAM | REMOVE REQUESTED: ${emailAddress}`,
        });

        await fetch(process.env.NEXT_PUBLIC_TWOBTTNS_DISCORD_WEBHOOK as string, {
          method: 'POST',
          body: webhookContent,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Added to stay-updated list!');
      } catch (error) {
        console.error('Failed to send Discord message.', error);
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    track('Submitted_Email');
    sendToDiscord(email);
    setEmail('');
    onClose();
  };

  return (
    <>
<Button
  bg="#42A5F5"
  size='md'
  height='48px'
  width='400px'
  position="relative"
  // bg="blue.400"
  color="white"
  boxShadow="0 6px #2b6cb0" // Creates the initial depth effect
  _hover={{
    bg: 'blue.500',
    top: "2px",
    boxShadow: "0 4px #2a69ac" // Adjusts the shadow to make it look like the button is being pressed
  }}
  _active={{
    bg: 'blue.600',
    top: "4px",
    boxShadow: "0 2px #1e4e8c" // Further adjusts the shadow to deepen the pressed effect
  }}
  onClick={onOpen}
>
  Unsubscribe
</Button>



      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Unsubscribe</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <Text mt={4}> Are you sure?</Text>
              <Button
                mt={4}
                colorScheme="teal"
                type="submit"
                width="full"
                boxShadow="md"
              >
                Bye.
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EarlyAccessModal;
