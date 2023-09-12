import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  extendTheme,
  Flex,
  Divider,
} from '@chakra-ui/react';
import UserTable from './Components/UserTable';
import UserForm from './Components/UserForm';
import UserSearch from './Components/UserSearch';
import { v4 as uuidv4 } from 'uuid';
import DashboardHeader from './Components/Header';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = window.innerWidth < 768;

  const filteredUsers = users.filter((user) => {
    const name = user.name || '';
    const email = user.email || '';
    const role = user.role || '';

    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleEdit = (userToEdit) => {
    setSelectedUser(userToEdit);
  };

  const handleDelete = (userToDelete) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter((user) => user.id !== userToDelete.id);
      setUsers(updatedUsers);
      setSelectedUser(null);
    }
  };

  const handleSave = (userData) => {
    if (selectedUser) {
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? { ...user, ...userData } : user
      );
      setUsers(updatedUsers);
      setSelectedUser(null);
    } else {
      const newUser = {
        id: uuidv4(),
        ...userData,
      };
      setUsers([...users, newUser]);
    }
  };

  return (
    <ChakraProvider theme={theme}>
    <DashboardHeader />
      <Box p={4}>
        <UserSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Flex
          flexDirection={isMobile ? 'column' : 'row'}
          alignItems={isMobile ? 'center' : 'flex-start'}
          justifyContent="space-between"
        >
          <Box
            flex={isMobile ? 'auto' : 1}
            p={4}
            mb={isMobile ? 4 : 0}
          >
            <UserForm user={selectedUser} onSave={handleSave} />
          </Box>

          {isMobile ? (
            <Divider my={4} />
          ) : (
            <Divider orientation="vertical" mx={4} />
          )}

          <Box flex={isMobile ? 'auto' : 2} p={4}>
            <UserTable
              users={filteredUsers}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
