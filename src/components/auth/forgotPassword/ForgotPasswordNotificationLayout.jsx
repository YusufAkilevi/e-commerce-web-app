import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function ForgotPasswordNotificationlayout() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "20px",
                        borderRadius: "10px",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Reset password link has been sent to your email!
                    </Typography>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
