import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Login } from '../Redux/AuthDuck';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignIn(props) {

  const Token = useSelector(store => store.auth)
  const [valid, setValid] = useState(true);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    dispatch(Login(data.get('email'), data.get('password')))

    
  };

  useEffect(() => {
    console.log(Token.token)
    console.log(Token)
    if (Token.token === "Login failed") {
      console.log("FAILDED")
      console.log(valid)
      setValid(false)
    }
    if (Token.token !== 'Login failed' && Token.token !== '') {
      navigate("/Logged");
    }
  }, [Token, valid]);

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
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Conectify
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electronico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
            />
            {
              !valid &&
              <Alert variant="outlined" severity="error">
                Correo o contraseña invalidos
              </Alert>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}