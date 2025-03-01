"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useUser } from "@/context/UserContext";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";

export default function SignupPage() {
  const { user, loading: userLoading, setUser } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Redirect if user is already logged in (useEffect prevents state update during render)
  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  if (userLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  async function handleSignup() {
    if (!name || !email || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Update Firebase profile
      await updateProfile(firebaseUser, { displayName: name });

      // Send user data to MongoDB
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name,
          photoURL: firebaseUser.photoURL || "",
        }),
      });

      if (response.ok) {
        console.log("Signup successful! User added to MongoDB.");

        // ✅ Update user context
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name,
          photoURL: firebaseUser.photoURL || "",
        });

        // ✅ Redirect to profile page after signup
        router.push("/perfil");
      } else {
        console.error("Signup API error:", await response.text());
      }
    } catch (error) {
      console.error("Signup error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

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
          label="Nombre"
          type="text"
          variant="outlined"
          fullWidth
          sx={{ mb: 2, backgroundColor: "#e0e0e0", borderRadius: 1 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Correo Electrónico"
          type="email"
          variant="outlined"
          fullWidth
          sx={{ mb: 2, backgroundColor: "#e0e0e0", borderRadius: 1 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ mb: 2, backgroundColor: "#e0e0e0", borderRadius: 1 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirmar Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          sx={{ mb: 2, backgroundColor: "#e0e0e0", borderRadius: 1 }}
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
