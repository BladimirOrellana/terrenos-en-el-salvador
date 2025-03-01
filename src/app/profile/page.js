"use client";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext"; // ✅ Import User Context
import { logOut } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";

export default function ProfilePage() {
  const { user, loading } = useUser(); // ✅ Get user from context
  const router = useRouter();

  // ✅ Redirect to login only AFTER loading completes
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logOut();
    router.push("/login"); // ✅ Redirect to login after logout
  };

  // ✅ Show loading spinner while checking user state
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

  // ✅ Prevent rendering when user is null
  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Perfil de Usuario
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        <strong>Email:</strong> {user.email}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        <strong>Name:</strong> {user.name}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleLogout}
      >
        Cerrar Sesión
      </Button>
    </Container>
  );
}
