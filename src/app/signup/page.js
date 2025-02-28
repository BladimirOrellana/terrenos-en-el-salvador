"use client";

import { useState } from "react";
import { signUp } from "@/firebase/auth";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await signUp(email, password);
      alert("🎉 ¡Registro exitoso! Ahora puedes iniciar sesión.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Crear Cuenta
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
        Regístrate con tu correo electrónico y una contraseña segura.
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="Correo Electrónico"
          type="email"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: "#e0e0e0",
            borderRadius: 1,
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: "#e0e0e0",
            borderRadius: 1,
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirmar Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: "#e0e0e0",
            borderRadius: 1,
          }}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Registrarse"
          )}
        </Button>
      </Box>

      <Typography variant="body2" sx={{ mt: 3 }}>
        ¿Ya tienes una cuenta?{" "}
        <a href="/login" style={{ color: "#ff5733" }}>
          Inicia sesión aquí
        </a>
      </Typography>
    </Container>
  );
}
