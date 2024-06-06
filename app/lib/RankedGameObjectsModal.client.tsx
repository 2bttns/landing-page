"use client";
import React, { useState, useEffect } from "react";
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
  useDisclosure,
  Spinner,
  OrderedList,
  ListItem
} from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchRankedGameObjects } from "./fetchRankedGameObjects.server";
import careerPathMapping from '../data/careerPathMapping.json'; // Adjust path as necessary

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define the structure of the career path mapping based on your JSON
type CareerPathMap = {
  [key: string]: string[];
};

const careerMapping: CareerPathMap = careerPathMapping;

type RankedGameObjectsModalProps = {
  isButtonDisabled: boolean;
  playerId: string;
};

type Score = {
  gameObject: {
    name: string;
  };
  score: number;
};

const RankedGameObjectsModal: React.FC<RankedGameObjectsModalProps> = ({
  isButtonDisabled,
  playerId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [careerFields, setCareerFields] = useState<string[]>([]);
  const [traitScores, setTraitScores] = useState<Score[]>([]);

  useEffect(() => {
    const loadScores = async () => {
      setIsLoading(true);
      try {
        const scores = await fetchRankedGameObjects(playerId);
        if (!scores.length) {
          console.error("Invalid or empty scores format.");
          setIsLoading(false);
          return;
        }

        const careerScores: Record<string, number> = {};
        scores.forEach(({ gameObject: { name: trait }, score }) => {
          const roles = careerMapping[trait.trim()]; // Ensure we trim any leading/trailing whitespace
          if (roles) {
            roles.forEach(role => {
              if (careerScores[role]) {
                careerScores[role] += score; // Summing the scores for each role
              } else {
                careerScores[role] = score; // Initializing the score for the role
              }
            });
          }
        });

        // Convert the scores record into a sorted array based on the score
        const sortedCareerFields = Object.entries(careerScores)
          .sort((a, b) => b[1] - a[1])
          .map(([role, _score]) => role);
        console.log(sortedCareerFields);
        setCareerFields(sortedCareerFields.slice(0, 5)); // We take only the top 5 careers
        setTraitScores(scores);
      } catch (error) {
        console.error("Error loading scores:", error);
        setCareerFields([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      loadScores();
    }
  }, [isOpen, playerId]);

  const isMobile = window.innerWidth <= 768;

  const chartData = {
    labels: traitScores.map(({ gameObject: { name } }) => name),
    datasets: [
      {
        label: "Score",
        data: traitScores.map(({ score }) => score),
        backgroundColor: traitScores.map(() => `hsl(${Math.random() * 360}, 100%, 75%)`),
      },
    ],
  };

  const chartOptions = {
    indexAxis: isMobile ? 'x' as const : 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: isMobile ? 'Traits' : 'Strength',
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: isMobile ? 'Strength' : 'Traits',
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
        borderSkipped: false,
        barPercentage: 0.8,
        categoryPercentage: 0.8,
      },
    },
  };

  return (
    <>
      <Text
        onClick={() => { if (!isButtonDisabled) { onOpen(); } }}
        cursor={isButtonDisabled ? "not-allowed" : "pointer"}
        pointerEvents={isButtonDisabled ? "none" : "auto"}
        textDecoration={"underline"}
      >
        View Recommendations
      </Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={["95%", "80%", "50%"]} mx="auto">
          <ModalHeader>Your Career Path Suggestions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {careerFields.length > 0 ? (
                  <>
                    <Box mb={4}>
                      <OrderedList>
                        {careerFields.map((field) => (
                          <ListItem key={field}>
                            <Text fontWeight="bold">{field}</Text>
                          </ListItem>
                        ))}
                      </OrderedList>
                    </Box>
                    <Box mb={4} height={isMobile ? 200 : 400}>
                      <Bar data={chartData} options={chartOptions} />
                    </Box>
                    <Box bg="gray.100" p={4} borderRadius="md" mt={4}>
                      <Text>💡 Play again to refine your results.</Text>
                    </Box>
                  </>
                ) : (
                  <Text>No career paths determined. Try the demo first.</Text>
                )}
              </>
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