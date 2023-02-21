import '../styles/styles.css'
import { ChakraProvider } from '@chakra-ui/react'
import UserContext from '../hooks/auth'

function MyApp({ Component, pageProps }) {
  return <ChakraProvider>
    <UserContext>
      <Component {...pageProps} />
    </UserContext>
  </ChakraProvider>
}

export default MyApp
