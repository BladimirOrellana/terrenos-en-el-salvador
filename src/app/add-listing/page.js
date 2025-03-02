"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

export default function AddListingPage() {
  const { user } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6">
          Debes iniciar sesión para agregar propiedades.
        </Typography>
      </Container>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          price: Number(price),
          size: Number(size),
          location,
          imageUrl,
          ownerId: user.uid,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/listing");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error adding listing:", error);
      setError("Error adding listing. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Agregar Propiedad
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Título"
          fullWidth
          required
          sx={{ mb: 2, backgroundColor: "#e0e0e0", borderRadius: 1 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Descripción"
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2, backgroundColor: "#e0e0e0", borderRadius: 1 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Precio ($USD)"
          fullWidth
          required
          type="number"
          sx={{ mb: 2, backgroundColor: "#e0e0e0", borderRadius: 1 }}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          label="Tamaño (m²)"
          fullWidth
          required
          type="number"
          sx={{ mb: 2, backgroundColor: "#e0e0e0", borderRadius: 1 }}
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <TextField
          label="Ubicación"
          fullWidth
          required
          sx={{ mb: 2, backgroundColor: "#e0e0e0", borderRadius: 1 }}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          label="URL de Imagen"
          fullWidth
          sx={{ mb: 2, backgroundColor: "#e0e0e0", borderRadius: 1 }}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Agregar Propiedad"
          )}
        </Button>
      </Box>
    </Container>
  );
}
