import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import App from './App'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import './assets/fonts/fonts.css'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find root element')

createRoot(rootElement).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
) 