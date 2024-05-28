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
          content: `NEWSLETTER | New 2bttns stay-updated list member: ${emailAddress}`,
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
        bg="#42A5F5" // Blue color
        color="white"
        size="md"
        height="48px"
        width="140px"
        position="relative"
        mx="15px"
        // boxShadow="0 6px #2b6cb0" // Adjust the depth effect color to match
        _hover={{
          bg: '#4a90e2', // Lighter blue on hover
          top: "2px",
          boxShadow: "0 4px #2a69ac" // Adjust the shadow to make it look like the button is being pressed
        }}
        _active={{
          bg: '#3182ce', // Even lighter blue on active
          top: "4px",
          boxShadow: "0 2px #1e4e8c" // Further adjusts the shadow to deepen the pressed effect
        }}
        onClick={onOpen}
      >
        Newsletter
      </Button>



      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Stay up to date</ModalHeader>
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
              <Text mt={4}>We won&apos;t share your email with anyone.</Text>
              <Button
                mt={4}
                colorScheme="teal"
                type="submit"
                width="full"
                boxShadow="md"
              >
                Sign Up
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EarlyAccessModal;
