import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPasswordAsync } from '../../../redux/slices/auth/forgotPasswordSlice';

const defaultTheme = createTheme();

export default function ForgotPasswordLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email) {
      dispatch(resetPasswordAsync({ email, navigate }));

    } else {
      console.log('Please enter your e-mail and password!');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            borderRadius: '10px',
          }}>

          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!email}
              onClick={handleSubmit}
            >
              Send Password Reset Link
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
