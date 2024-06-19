"use client"
import { Box, Flex, Button } from '@chakra-ui/react';
import Image from 'next/image';
import SocialButtons from '../SocialButtons/socialButtons';
import Link from 'next/link';
import EarlyAccessModal from '../EarlyAccessModal/EarlyAccessModal';
import { track } from '@vercel/analytics';

const NavBar = () => {
  const handleAboutClick = () => {
    track("About Button Clicked");
  };

  return (
    <Box bg="transparent" px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Flex alignItems={'center'}>
          {/* <Box px="10px">
            <Link href={"/"}>
              <Image src="/2gif.gif" alt="logo" width="75" height="75" priority />
            </Link>
          </Box> */}
          <Link href="https://docs.2bttns.com" passHref target="_blank">
            <Button variant={'ghost'} onClick={handleAboutClick}>About</Button>
          </Link>
        </Flex>

        <Flex>
          <SocialButtons />
          {/* <Link href="mailto:amer@2bttns.com" passHref target="_blank">
            <Button
              bg="#506CD4"
              color={"white"}
              size="md"
              height="48px"
              width="140px"
              mx="15px"
              position="relative"
              _hover={{
                top: "2px",
                boxShadow: "0 4px #444",
              }}
              _active={{
                top: "4px",
                boxShadow: "0 2px #444",
              }}
            >
              Share Feedback
            </Button>
          </Link> */}
          <EarlyAccessModal />
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;