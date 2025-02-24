import { Box, Container, useToast } from '@chakra-ui/react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './Header'
import { useAuth } from '../../context/AuthContext'

export default function AppLayout() {
  const { error, clearError } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      // Show error toast
      toast({
        title: 'Authentication Error',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
        onCloseComplete: clearError,
      })

      // If it's a session expiry error, redirect to login
      if (error.toLowerCase().includes('session')) {
        navigate('/login')
      }
    }
  }, [error, toast, navigate, clearError])

  return (
    <Box minH="100vh" bg="gray.50">
      <Header />
      <Container maxW="7xl" py={8}>
        <Outlet />
      </Container>
    </Box>
  )
} 