import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff5733", // Keep primary color for buttons & highlights
    },
    background: {
      default: "#0a0a0a", // ✅ Set background color globally
    },
    text: {
      primary: "#ffffff", // ✅ White text for better contrast
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: "#ffffff",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#ffffff",
    },
  },
});

export default theme;
