import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Container, Spinner, Text, VStack } from '@chakra-ui/react';
import { authApi } from '../api/auth';

export default function SlackCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('Slack OAuth error:', error);
      navigate('/login', { replace: true });
      return;
    }

    if (!code) {
      navigate('/login', { replace: true });
      return;
    }

    const handleCallback = async () => {
      try {
        await authApi.handleSlackCallback(code);
        navigate('/', { replace: true });
      } catch (error) {
        console.error('Failed to handle Slack callback:', error);
        navigate('/login', { replace: true });
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Container maxW="lg">
        <VStack spacing={4}>
          <Spinner size="xl" color="green.500" thickness="4px" />
          <Text fontSize="lg">Signing you in...</Text>
        </VStack>
      </Container>
    </Box>
  );
} 