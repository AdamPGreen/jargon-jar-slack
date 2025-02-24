import { Navigate, useLocation } from 'react-router-dom';
import { Box, Container, Spinner, VStack } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

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

  if (!isAuthenticated) {
    // Save the attempted URL for redirecting after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
} 