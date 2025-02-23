import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      orange: '#FF5D1F',
      midnight: '#1A1A1A',
      slate: {
        100: '#F7F7F7',
        900: '#2D3748'
      },
      peach: '#FFF1EC',
      ocean: '#2C5282',
      gray: '#EDF2F7'
    },
    status: {
      success: '#00BA88',
      warning: '#F4B740',
      error: '#FF4444'
    }
  },
  fonts: {
    body: "'Inter', system-ui, sans-serif",
    heading: "'Druk Wide', 'Inter', sans-serif"
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
        _hover: {
          transform: 'translateY(-1px)',
          boxShadow: 'lg'
        }
      },
      variants: {
        solid: {
          bg: 'brand.orange',
          color: 'white',
          _hover: {
            bg: 'brand.orange',
            opacity: 0.9,
            transform: 'translateY(-1px) rotate(-1deg)',
          }
        }
      }
    },
    Link: {
      baseStyle: {
        color: 'brand.orange',
        _hover: {
          textDecoration: 'none',
          opacity: 0.9
        }
      }
    }
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'brand.midnight'
      }
    }
  }
})

export default theme 