import { createTheme } from "@mui/material";
import { grey, blueGrey } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: blueGrey[200],
    },
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),

    h1: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
    h2: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
    h3: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
    h4: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
    h5: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
    h6: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
  },
});
