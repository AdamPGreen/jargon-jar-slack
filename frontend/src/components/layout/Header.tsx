import {
  Box,
  Button,
  Flex,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useAuth } from '../../context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Failed to logout:', error)
    }
  }

  return (
    <Box
      as="header"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      py={4}
      px={8}
    >
      <Flex justify="space-between" align="center" maxW="7xl" mx="auto">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          fontFamily="'Druk Wide Bold', sans-serif"
        >
          Jargon Jar
        </Text>

        <HStack spacing={4}>
          {user && (
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                rounded="full"
                px={2}
                py={1}
              >
                <HStack spacing={2}>
                  <Avatar
                    size="sm"
                    src={user.avatarUrl}
                    name={user.name}
                  />
                  <Text>{user.name}</Text>
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>
      </Flex>
    </Box>
  )
} 