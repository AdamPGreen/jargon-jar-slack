import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      orange: '#FF5D1F',
      orangeDark: '#E64500',
      orangeDarker: '#CC3D00',
      midnight: '#1A1A1A',
      peach: '#FFF1EC',
      peachDark: '#FFE4D9',
    },
  },
  fonts: {
    heading: `'Druk Wide', system-ui, sans-serif`,
    body: `'Inter', system-ui, sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.900',
      },
    },
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: 'brand.orange',
          color: 'white',
          _hover: {
            bg: 'brand.orangeDark',
            _disabled: {
              bg: 'brand.orange',
            },
          },
          _active: {
            bg: 'brand.orangeDarker',
          },
        },
        secondary: {
          bg: 'transparent',
          border: '2px solid',
          borderColor: 'brand.orange',
          color: 'brand.orange',
          _hover: {
            bg: 'brand.peach',
          },
          _active: {
            bg: 'brand.peachDark',
          },
        },
        tertiary: {
          bg: 'transparent',
          color: 'brand.orange',
          _hover: {
            bg: 'brand.peach',
          },
          _active: {
            bg: 'brand.peachDark',
          },
        },
      },
      defaultProps: {
        variant: 'primary',
      },
    },
    Container: {
      baseStyle: {
        maxW: 'container.xl',
        px: { base: 4, md: 8 },
      },
    },
  },
})

export default theme 