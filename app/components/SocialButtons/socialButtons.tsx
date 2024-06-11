import { IconButton, HStack, Text, Box } from '@chakra-ui/react';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { track } from '@vercel/analytics';

const SocialButtons = () => {
  const [githubStars, setGithubStars] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/2bttns/2bttns')
      .then((response) => response.json())
      .then((data) => setGithubStars(data.stargazers_count))
      .catch((error) => console.error('Error fetching GitHub stars:', error));
  }, []);

  const handleGithubClick = () => {
    track("GitHub Button Clicked");
  };

  const handleDiscordClick = () => {
    track("Discord Button Clicked");
  };

  return (
    <HStack spacing={4}>
      <IconButton
        as="a"
        href="https://www.github.com/2bttns/2bttns"
        target='_blank'
        aria-label="GitHub"
        icon={
          <Box display="flex" alignItems="center">
            <FaGithub size="1.3em" />
            <Box
              as="span"
              ml={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="yellow.300"
              color="black"
              borderRadius="full"
              width="24px"
              height="24px"
              fontSize="11px"
              boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)"
            >
              {githubStars || '...'}
            </Box>
          </Box>
        }
        size="lg"
        colorScheme="gray"
        _hover={{
          top: "2px",
          boxShadow: "0 4px #555"
        }}
        _active={{
          top: "4px",
          boxShadow: "0 2px #555"
        }}
        onClick={handleGithubClick}
      />

      <IconButton
        as="a"
        href="https://discord.gg/M88ZK8cxj9"
        target='_blank'
        aria-label="Discord"
        icon={<FaDiscord />}
        size="lg"
        colorScheme="gray"
        _hover={{
          top: "2px",
          boxShadow: "0 4px #555"
        }}
        _active={{
          top: "4px",
          boxShadow: "0 2px #555"
        }}
        onClick={handleDiscordClick}
      />
    </HStack>
  );
};

export default SocialButtons;