import { IconButton, HStack } from '@chakra-ui/react';
import { FaGithub, FaDiscord } from 'react-icons/fa';

const SocialButtons = () => {
  return (
    <HStack spacing={4}>
      <IconButton
        as="a"
        href="https://www.github.com/2bttns"
        target='_blank'
        aria-label="GitHub"
        icon={<FaGithub />}
        size="lg"
        colorScheme="gray"
        position="relative"
        boxShadow="0 6px #555"
        _hover={{
          top: "2px",
          boxShadow: "0 4px #555"
        }}
        _active={{
          top: "4px",
          boxShadow: "0 2px #555"
        }}
      />

      <IconButton
        as="a"
        href="https://discord.gg/Karu5RrpdU"
        target='_blank'
        aria-label="Discord"
        icon={<FaDiscord />}
        size="lg"
        bg="#26A69A"
        position="relative"
        boxShadow="0 6px #555"
        _hover={{
          top: "2px",
          boxShadow: "0 4px #555"
        }}
        _active={{
          top: "4px",
          boxShadow: "0 2px #555"
        }}
      />
    </HStack>
  );
};

export default SocialButtons;
