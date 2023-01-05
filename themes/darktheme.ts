import { createTheme, Text } from "@nextui-org/react"


const theme = createTheme({
  type: 'dark',
  theme: {
    colors: {
        gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)'
    }, // override dark theme colors
  }
});

  export default theme;