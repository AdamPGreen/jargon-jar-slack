import { Box, Button, Container, Heading, Text, VStack, useColorModeValue, Spinner } from '@chakra-ui/react';
import { FaSlack } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export default function Login() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  // Get the redirect path from location state, default to '/'
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  if (isLoading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Container maxW="lg">
          <VStack spacing={4}>
            <Spinner size="xl" color="green.500" thickness="4px" />
          </VStack>
        </Container>
      </Box>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
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