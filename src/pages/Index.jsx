import React, { useState } from "react";
import { Box, Button, VStack, Heading, Text, CircularProgress, CircularProgressLabel, useToast } from "@chakra-ui/react";
import { FaTachometerAlt } from "react-icons/fa";

const Index = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [speed, setSpeed] = useState(0);
  const toast = useToast();

  const startSpeedTest = () => {
    // Mock speed test
    setIsTesting(true);
    setSpeed(0);

    // Simulate loading and speed measurement
    const interval = setInterval(() => {
      setSpeed((prevSpeed) => {
        if (prevSpeed >= 100) {
          clearInterval(interval);
          setIsTesting(false);
          toast({
            title: "Speed test completed",
            description: `Your internet speed is ${prevSpeed} Mbps`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          return prevSpeed;
        }
        return prevSpeed + Math.random() * 10;
      });
    }, 500);
  };

  return (
    <VStack spacing={8} justify="center" align="center" height="100vh">
      <Heading as="h1" size="2xl">
        Internet Speed Test
      </Heading>
      <Box position="relative" textAlign="center" p={4}>
        {" "}
        {/* Added padding */}
        <CircularProgress value={speed} size="400px" thickness="4px" color="green.400" isIndeterminate={isTesting}>
          {" "}
          {/* Increased size */}
          <CircularProgressLabel style={{ fontSize: "1.5em" }}>{isTesting ? "Testing..." : `${speed.toFixed(2)} Mbps`}</CircularProgressLabel>
        </CircularProgress>
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
          <FaTachometerAlt size="1.5em" />
        </Box>
      </Box>
      <Button leftIcon={<FaTachometerAlt />} colorScheme="green" onClick={startSpeedTest} isLoading={isTesting} loadingText="Testing" disabled={isTesting}>
        {isTesting ? "Running Test..." : "Start Test"}
      </Button>
    </VStack>
  );
};

export default Index;
