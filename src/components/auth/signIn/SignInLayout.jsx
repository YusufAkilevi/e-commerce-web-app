import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useDispatch } from "react-redux";
import { signInAsync } from "../../../redux/slices/auth/signInSlice";
import { Link, useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignInLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      dispatch(signInAsync({ email, password, navigate }));
    } else {
      console.log("Please enter your e-mail and password!");
    }
  };

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
            Please sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {/* Username TextField */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="e-mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password TextField */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Sign Up & Forgot Password Box */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Sign Up Field */}
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="primary">
                  Sign Up
                </Typography>
              </Link>

              {/* Forgot Password Field */}
              <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="primary">
                  Forgot Password
                </Typography>
              </Link>
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!email || !password}
            >
              SIGN IN
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
