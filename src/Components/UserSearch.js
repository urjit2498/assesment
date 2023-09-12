import React from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  InputRightElement,
} from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';

const UserSearch = ({ searchQuery, setSearchQuery }) => {
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <Box mb={4}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search by name, email, or role"
          value={searchQuery}
          onChange={handleSearch}
          borderColor="gray.300"
          _focus={{ borderColor: 'teal.300' }}
          size="md"
        />
        {searchQuery && (
          <InputRightElement width="2.5rem">
            <IconButton
              icon={<CloseIcon />}
              aria-label="Clear Search"
              size="xs"
              onClick={handleClearSearch}
              variant="unstyled"
            />
          </InputRightElement>
        )}
      </InputGroup>
    </Box>
  );
};

export default UserSearch;
