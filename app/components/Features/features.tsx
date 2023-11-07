// components/Features.tsx
import { SimpleGrid, Box, Heading, Text } from '@chakra-ui/react';

interface FeatureProps {
  title: string;
  text: string;
}

const Feature = ({ title, text }: FeatureProps) => (
  <Box p={5} shadow="md" borderWidth="1px">
    <Heading fontSize="xl">{title}</Heading>
    <Text mt={4}>{text}</Text>
  </Box>
);

const Features = () => {
  return (
    <Box p={5}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature 
          title="User-Friendly Data Collection"
          text="Engage users from the jump with a fun (fully customizable) game to gather their preferences, avoiding algorithmic bias and the need for third-party data​"
        />
        <Feature 
          title="Easy Integration & Management"
          text="Easily integrate with your existing system using the SDK and RESTful API, streamline your workflow with our CLI, and benefit from Postgres support, automatic authentication handling, built-in autocompletion, and more​"
        />
        <Feature 
          title="Code-Free Administration"
          text="Utilize a no-code admin panel for straightforward game setup and content data management, enhancing collaboration with multiple admin roles"
        />
        {/* Add more features as needed */}
      </SimpleGrid>
    </Box>
  );
};

export default Features;
