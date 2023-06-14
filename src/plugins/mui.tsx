import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";

export const palette = {
  primary: { main: "#213198" },
  secondary: { main: "#1da8ec" },
  light: { main: "#4cdede" },
  background: { paper: "#fff", default: "#f5f5f5" },
};

const theme = createTheme({
  palette: palette,
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "10px",
        },
      },
    },
  },
  typography: {
    fontFamily: "revert",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.7rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.4rem",
    },
    h4: {
      fontSize: "1.2rem",
    },
  },
});

//need to be fixed
export const AppThemeProvider = ({ children }: any) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
