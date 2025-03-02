"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext"; // ✅ Import User Context
import { logOut } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Button,
  Typography,
  Container,
  CircularProgress,
  Grid,
  IconButton,
  Badge,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite"; // ❤️ Icon for saved properties

export default function ProfilePage() {
  const { user, loading } = useUser(); // ✅ Get user from context
  const router = useRouter();
  const [savedCount, setSavedCount] = useState(0); // 🔹 Store number of saved properties

  // ✅ Fetch saved properties count
  useEffect(() => {
    async function fetchSavedCount() {
      if (!user) return;
      try {
        const res = await fetch(`/api/saved-properties?userId=${user.uid}`);
        if (!res.ok) throw new Error("Error fetching saved properties");
        const data = await res.json();
        setSavedCount(data.length);
      } catch (error) {
        console.error("Error fetching saved properties:", error);
      }
    }
    fetchSavedCount();
  }, [user]);

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
      {/* Header with Saved Properties Icon */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Perfil de Usuario
        </Typography>

        {/* Saved Properties Button */}
        <IconButton
          color="primary"
          onClick={() => router.push("/saved-properties")}
        >
          <Badge badgeContent={savedCount} color="error">
            <FavoriteIcon fontSize="large" />
          </Badge>
        </IconButton>
      </Box>

      {/* User Info */}
      <Typography variant="body1" sx={{ mb: 3 }}>
        <strong>Email:</strong> {user.email}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        <strong>Name:</strong> {user.name}
      </Typography>

      {/* Dashboard & Add Listing Buttons */}
      <Grid container spacing={2} sx={{ mt: 3, mb: 3 }}>
        <Grid item xs={12}>
          <Link href="/dashboard" passHref>
            <Button variant="contained" color="primary" fullWidth>
              Ir al Dashboard
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link href="/add-listing" passHref>
            <Button variant="contained" color="primary" fullWidth>
              Agregar Propiedad
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogout}
      >
        Cerrar Sesión
      </Button>
    </Container>
  );
}
