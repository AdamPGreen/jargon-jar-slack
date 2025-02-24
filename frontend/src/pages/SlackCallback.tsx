import { useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Box, Container, Spinner, Text, VStack } from '@chakra-ui/react';
import { authApi } from '../api/auth';

export default function SlackCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

    if (error) {
      console.error('Slack OAuth error:', error);
      navigate('/login', { state: { from }, replace: true });
      return;
    }

    if (!code) {
      navigate('/login', { state: { from }, replace: true });
      return;
    }

    const handleCallback = async () => {
      try {
        await authApi.handleSlackCallback(code);
        navigate(from, { replace: true });
      } catch (error) {
        console.error('Failed to handle Slack callback:', error);
        navigate('/login', { state: { from }, replace: true });
      }
    };

    handleCallback();
  }, [searchParams, navigate, location]);

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