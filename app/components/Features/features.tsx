// components/Features.tsx
import { SimpleGrid, Box, Heading, Text } from '@chakra-ui/react';

interface FeatureProps {
  title: string;
  text: string;
}

const Feature = ({ title, text }: FeatureProps) => (
  <Box p={5} shadow="md" borderWidth="2px" borderRadius={"5px"}>
    <Heading fontSize="xl">{title}</Heading>
    <Text mt={4}>{text}</Text>
  </Box>
);

const Features = () => {
  return (
    <Box p={5}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature 
          title="Core Functionality"
          text="2bttns introduces an interactive two-button game that gathers data about user preferences. This game is not only engaging but also provides valuable insights into user choices, helping to personalize the content they receive"
        />
        <Feature 
          title="Integration with Web Applications"
          text="It's designed to work alongside existing Content Management Systems (CMS), adding functionality rather than replacing it. Developers can integrate it into their applications using the provided SDK and RESTful API, which offers features like Postgres support, automatic authentication handling, and built-in autocompletion"
        />
        <Feature 
          title="User Experience"
          text="When users interact with the two-button game, they are presented with binary choices. Behind the scenes, however, more than two options are scored, allowing for a nuanced understanding of user preferences. After completing a round of the game, users are redirected back to the app, where the gathered data is used to tailor content recommendations"
        />
        <Feature 
          title="Accessibility and Customization"
          text="The game is fully customizable and designed to be user-friendly, making data collection engaging and efficient. It also avoids the need for third-party data"
        />
        <Feature 
          title="Administration and Management"
          text="2bttns provides a no-code admin panel that simplifies game setup and content data management. This feature enhances collaboration with multiple admin roles and makes it easier for non-technical team members to contribute"
        />
        <Feature 
          title="Reducing Algorithmic Bias"
          text="The two-button game directly engages with content algorithms, reducing algorithmic bias and giving users more control over their data. This approach helps in curating a more personalized and unbiased user experience"
        />
        <Feature 
          title="Use Case Spotlight: Dynamic User Onboarding"
          text="2bttns transforms user onboarding into an interactive and enjoyable experience. By engaging new users in a captivating two-button game, it not only captures their attention but also gathers essential data about their preferences. This streamlined process ensures that users are introduced to your platform in a manner that is both entertaining and informative, laying the foundation for a personalized user journey from the very beginning."
        />
        <Feature 
          title="Use Case Spotlight: Generative AI"
          text="Beyond user engagement, 2bttns excels in collecting nuanced data crucial for generative AI applications. The responses gathered from the game provide a rich dataset that AI algorithms can utilize to offer more precise and tailored experiences. This feature is a game-changer for AI-powered platforms, enabling them to understand and meet individual user needs with unprecedented accuracy, right from the initial interaction."
        />
      </SimpleGrid>
    </Box>
  );
};

export default Features;
