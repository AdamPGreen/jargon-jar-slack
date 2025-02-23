import { Box, Flex, Link } from '@chakra-ui/react'
import { Link as RouterLink, Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <Box minH="100vh">
      <Flex as="nav" bg="gray.100" p={4} gap={4}>
        <Link as={RouterLink} to="/" fontWeight="bold">
          Dashboard
        </Link>
        <Link as={RouterLink} to="/profile" fontWeight="bold">
          Profile
        </Link>
      </Flex>
      <Box as="main">
        <Outlet />
      </Box>
    </Box>
  )
} 