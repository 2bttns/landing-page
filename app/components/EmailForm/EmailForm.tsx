import React, { useState } from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Center
} from '@chakra-ui/react';

const EmailInputForm: React.FC = () => {
  const [email, setEmail] = useState('');

  const sendToDiscord = async (emailAddress: string) => {
    if (emailAddress) {
      try {
        const webhookContent = JSON.stringify({
          content: `New email submission: ${emailAddress}`,
        });

        await fetch(process.env.NEXT_PUBLIC_TWOBTTNS_DISCORD_WEBHOOK as string, {
          method: 'POST',
          body: webhookContent,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Email submitted to Discord!');
      } catch (error) {
        console.error('Failed to send to Discord.', error);
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendToDiscord(email);
    setEmail(''); // Clear the input after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <Center>
      <VStack
        // direction={['column', null, 'row']} // Responsive layout
        align="center"
        gap="4"
      >
        <FormControl isRequired>
          <FormLabel htmlFor='email'>Email address</FormLabel>
          <Input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            width={"50vw"}
          />
        </FormControl>
        <Button type='submit' colorScheme='green' width={"50vw"}>Stay Updated</Button>
      </VStack>
      </Center>
    </form>
  );
};

export default EmailInputForm;
