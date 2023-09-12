import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
  VStack,
  Avatar,
  InputGroup,
  InputLeftElement,
  Heading,
  Center,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Flex,
  IconButton,
  InputRightElement,
} from '@chakra-ui/react';
import { AttachmentIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaUser as UserIcon } from 'react-icons/fa';

const initialFormData = {
  name: '',
  email: '',
  password: '',
  role: '',
  profilePicture: null,
};

const UserForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({ ...initialFormData });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);

  useEffect(() => {
    setFormData({ ...user });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profilePicture: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password } = formData;

    if (isPasswordValid(password)) {
      setPasswordValid(true);
      onSave(formData);
      setFormData({ ...initialFormData });
    } else {
      setPasswordValid(false);
    }
  };

  const isPasswordValid = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    return (
      password.length >= 8 &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const getPasswordInputType = () => {
    return passwordVisible ? 'text' : 'password';
  };

  const renderPasswordToggleIcon = () => {
    return passwordVisible ? <ViewOffIcon /> : <ViewIcon />;
  };

  const handleClearForm = () => {
    setFormData({ ...initialFormData });
  };

  return (
    <Box p={4} shadow="lg" rounded="lg" bg="white">
      <Center>
        <Avatar
          size="lg"
          name={formData.name || ''}
          src={formData.profilePicture || ''}
        />
      </Center>
      <Heading size="md" mb={4}>
        {user ? 'Edit User' : 'Add User'}
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AttachmentIcon color="gray.300" />}
            />
            <Input
              type="file"
              name="profilePicture"
              onChange={handleFileUpload}
            />
          </InputGroup>
          <Text>{formData.profilePicture?.name || 'No file selected'}</Text>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter name"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={getPasswordInputType()}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                minLength={8}
              />
              <InputRightElement>
                <IconButton
                  icon={renderPasswordToggleIcon()}
                  onClick={togglePasswordVisibility}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          {!passwordValid && (
            <Alert status="error" rounded="lg">
              <AlertIcon />
              <AlertDescription>
                Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.
              </AlertDescription>
            </Alert>
          )}
          <FormControl id="role" isRequired>
            <FormLabel>Role</FormLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="Select role"
            >
              <option value="Administrator">Administrator</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </Select>
          </FormControl>
          <Flex direction={{ base: 'column', md: 'row' }}>
            <Button type="submit" colorScheme="teal" flex="1" mb={{ base: 2, md: 0 }}>
              {user ? 'Save Changes' : 'Add User'}
            </Button>
            <Button
              type="button"
              colorScheme="gray"
              onClick={handleClearForm}
              ml={{ base: 0, md: 2 }}
            >
              Clear
            </Button>
          </Flex>
        </VStack>
      </form>
    </Box>
  );
};

export default UserForm;
