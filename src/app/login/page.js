"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Redirect after login
import { signIn } from "@/firebase/auth";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await signIn(email, password);
      alert("🎉 ¡Inicio de sesión exitoso!");
      router.push("/dashboard"); // ✅ Redirect to dashboard (update URL as needed)
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code));
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Iniciar Sesión
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
        Ingresa con tu correo y contraseña.
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
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Iniciar Sesión"
          )}
        </Button>
      </Box>

      <Typography variant="body2" sx={{ mt: 3 }}>
        ¿No tienes una cuenta?{" "}
        <a href="/signup" style={{ color: "#ff5733" }}>
          Regístrate aquí
        </a>
      </Typography>
    </Container>
  );
}

/**
 * Translates Firebase error codes into user-friendly messages
 * @param {string} errorCode
 * @returns {string} User-friendly error message
 */
const getFirebaseErrorMessage = (errorCode) => {
  const errorMessages = {
    "auth/user-not-found": "El usuario no existe.",
    "auth/wrong-password": "Contraseña incorrecta.",
    "auth/invalid-email": "Correo electrónico no válido.",
    "auth/too-many-requests": "Demasiados intentos. Intenta más tarde.",
  };

  return errorMessages[errorCode] || "Error desconocido. Intenta nuevamente.";
};
