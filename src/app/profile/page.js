"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Redirect user if not logged in
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { logOut } from "@/firebase/auth";
import {
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login"); // Redirect to login if no user is logged in
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, [auth, router]);

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
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

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Perfil de Usuario
      </Typography>

      {user ? (
        <>
          <Typography variant="body1" sx={{ mb: 3 }}>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        </>
      ) : (
        <Typography variant="body1" color="error">
          No hay usuario autenticado.
        </Typography>
      )}
    </Container>
  );
}
