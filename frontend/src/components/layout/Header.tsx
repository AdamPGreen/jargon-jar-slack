import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'

export default function Header() {
  const { isOpen, onToggle } = useDisclosure()
  const location = useLocation()

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link
      as={RouterLink}
      to={to}
      px={2}
      py={1}
      rounded="md"
      _hover={{ bg: 'gray.100' }}
      bg={location.pathname === to ? 'gray.100' : 'transparent'}
      fontWeight="medium"
    >
      {children}
    </Link>
  )

  return (
    <Box bg="white" boxShadow="sm">
      <Container maxW="container.xl" px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Heading
            fontSize="xl"
            fontFamily="Druk Wide"
            color="brand.orange"
            cursor="pointer"
            as={RouterLink}
            to="/"
          >
            Jargon Jar
          </Heading>

          {/* Mobile menu button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />

          {/* Desktop nav */}
          <Stack
            direction="row"
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
          >
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </Stack>
        </Flex>

        {/* Mobile nav */}
        <Stack
          display={{ base: isOpen ? 'flex' : 'none', md: 'none' }}
          p={4}
          mt={2}
          bg="white"
          spacing={4}
        >
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </Stack>
      </Container>
    </Box>
  )
} 