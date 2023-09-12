import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
  Flex,
  Spacer,
  Heading,
  Avatar,
  Stack,
} from '@chakra-ui/react';
import {
  EditIcon,
  DeleteIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';

const UserTable = ({ users, onEdit, onDelete }) => {
  const [sorting, setSorting] = useState({
    column: 'name',
    order: 'asc',
  });

  const handleSort = (column) => {
    if (column === sorting.column) {
      setSorting({
        ...sorting,
        order: sorting.order === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSorting({
        column,
        order: 'asc',
      });
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    const keyA = (a[sorting.column] || '').toLowerCase();
    const keyB = (b[sorting.column] || '').toLowerCase();

    if (sorting.order === 'asc') {
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
    } else {
      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
    }

    return 0;
  });

  return (
    <Box p={4} shadow="lg" rounded="lg" bg="white">
      <Heading size="md" mb={4}>
        User List
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th onClick={() => handleSort('id')}>
              User ID{' '}
              {sorting.column === 'id' && (sorting.order === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />)}
            </Th>
            <Th onClick={() => handleSort('name')}>
              Name{' '}
              {sorting.column === 'name' && (sorting.order === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />)}
            </Th>
            <Th onClick={() => handleSort('email')}>
              Email{' '}
              {sorting.column === 'email' && (sorting.order === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />)}
            </Th>
            <Th onClick={() => handleSort('role')}>
              Role{' '}
              {sorting.column === 'role' && (sorting.order === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />)}
            </Th>
            <Th>Profile Picture</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedUsers.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>
                <Avatar size="sm" name={user.name} src={user.profilePicture} />
              </Td>
              <Td>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align="center"
                  spacing={{ base: 2, sm: 0 }}
                >
                  <IconButton
                    colorScheme="teal"
                    aria-label="Edit"
                    icon={<EditIcon />}
                    onClick={() => onEdit(user)}
                  />
                  <IconButton
                    colorScheme="red"
                    aria-label="Delete"
                    icon={<DeleteIcon />}
                    onClick={() => onDelete(user)}
                  />
                </Stack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default UserTable;
