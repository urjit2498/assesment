import React from 'react';
import {
  Box,
  Flex,
  Spacer,
  Heading,
} from '@chakra-ui/react';

const DashboardHeader = () => {
  return (
    <Box p={4} bg="teal.500" color="white">
      <Flex alignItems="center">
        <Heading size="md">Dashboard</Heading>
        <Spacer />
      </Flex>
    </Box>
  );
};

export default DashboardHeader;
