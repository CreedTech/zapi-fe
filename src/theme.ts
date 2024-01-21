import { createTheme } from "@mui/material";

export const theme = createTheme({
    typography: {
        fontFamily: "var(--body-font)",
    },
    palette: {
        primary: {
            main: "#081F4A"
        },
        secondary: {
            main: "#FF5C00"
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-secondary)",
                    transition: "0.3s all ease",
                    "&: hover": {
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-secondary)",
                        transform: "translateY(-5px)",
                    },
                },
                outlined: {
                    backgroundColor: "#FFF",
                    color: "var(--color-primary)",
                    border: "!px solid var(--color-primary)",
                    transition: "0.3s all ease",
                    "&:hover": {
                        backgroundColor: "#FFF",
                        color: "var(--color-primary)",
                        border: "!px solid var(--color-primary)",
                        transform: "translateY(-5px)",
                    }
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                asterisk: {
                    color: "#db3131",
                    fontSize: '12px',
                    "&$error": {
                        color: "#db3131"
                      }
                }
            }
        }

    },
});