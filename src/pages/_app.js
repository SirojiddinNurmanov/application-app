import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import '../../public/css/style.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
