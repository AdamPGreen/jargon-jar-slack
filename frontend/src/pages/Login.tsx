import { Box, Button, Container, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { FaSlack } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const buttonHoverBg = useColorModeValue('green.600', 'green.500');

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '4', sm: '8' }}>
        <VStack spacing="8">
          <VStack spacing={{ base: '4', md: '8' }} align="center">
            <Heading
              size={{ base: 'xl', md: '2xl' }}
              fontFamily="'Druk Wide Bold', sans-serif"
            >
              Jargon Jar
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.600" textAlign="center">
              Track and manage corporate jargon in your Slack workspace
            </Text>
          </VStack>
          <Button
            size="lg"
            width="full"
            maxW="md"
            bg="#4A154B"
            color="white"
            _hover={{ bg: '#611F69' }}
            leftIcon={<FaSlack />}
            onClick={login}
          >
            Sign in with Slack
          </Button>
        </VStack>
      </Container>
    </Box>
  );
} 