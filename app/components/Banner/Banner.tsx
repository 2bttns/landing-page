import React, { useState } from 'react';
import { Box, Text, CloseButton, Flex, Spacer } from '@chakra-ui/react';

const Banner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Box
      p={4}
      color="white"
      bgGradient="linear(to-r, teal.300, blue.300, cyan.400, purple.300, pink.300)"
      backgroundSize="200% 200%"
      animation="gradientShift 3s ease infinite"
      position="relative"
      display="flex"
      alignItems="center"
      width={'50vw'}
      borderRadius="lg"
      boxShadow="md"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        filter: 'blur(15px)',
        zIndex: -1,
      }}
    >
      <Flex width={'100%'} justifyContent="center" position="relative">
        <Text textAlign="center">
          I am a buggy banner and I implore you: <span style={{color: "blue"}}><a href="https://www.github.com/2bttns/2bttns"> Give us a good noodle star (on our repo), it&apos;ll mean the world to us. 🙏</a></span>
        </Text>
        <Spacer />
        <CloseButton 
          color="white" 
          position="absolute"
          right="8px"
          onClick={() => setIsVisible(false)} 
        />
      </Flex>
    </Box>
  );
};

export default Banner;
