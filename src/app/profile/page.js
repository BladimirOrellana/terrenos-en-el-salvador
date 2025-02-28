"use client";

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

  const handleLogout = async () => {
    await logOut();
    router.push("/login"); // ✅ Redirect to login after logout
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

  if (!user) {
    router.push("/login"); // ✅ Redirect to login if not authenticated
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
