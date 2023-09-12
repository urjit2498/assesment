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
        {/* <HStack spacing={4}>
          <Text>Welcome, John Doe</Text>
          <Avatar name="John Doe" size="sm" />
          <Button colorScheme="teal" size="sm">
            Logout
          </Button>
        </HStack> */}
      </Flex>
    </Box>
  );
};

export default DashboardHeader;
