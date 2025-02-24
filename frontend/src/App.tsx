import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import AppLayout from './components/layout/AppLayout'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Login from './pages/Login'
import SlackCallback from './pages/SlackCallback'
import { AuthProvider } from './context/AuthContext'
import theme from './theme'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'auth/slack/callback',
    element: <SlackCallback />,
  },
])

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  )
} 