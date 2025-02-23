import { Box, Container } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function AppLayout() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Header />
      <Container as="main" maxW="container.xl" py={8}>
        <Outlet />
      </Container>
    </Box>
  )
} 