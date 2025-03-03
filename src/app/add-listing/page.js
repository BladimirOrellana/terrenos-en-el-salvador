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

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Departments in El Salvador
  const departments = [
    "Ahuachapán",
    "Cabañas",
    "Chalatenango",
    "Cuscatlán",
    "La Libertad",
    "La Paz",
    "La Unión",
    "Morazán",
    "San Miguel",
    "San Salvador",
    "San Vicente",
    "Santa Ana",
    "Sonsonate",
    "Usulután",
  ];

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

    if (
      !title ||
      !price ||
      !size ||
      !department ||
      !city ||
      !latitude ||
      !longitude
    ) {
      setError("Todos los campos requeridos deben ser completados.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          price: Number(price),
          size: Number(size),
          location: {
            department,
            city,
            address,
            coordinates: {
              lat: Number(latitude),
              lng: Number(longitude),
            },
          },
          images,
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
      setError("Error al agregar la propiedad. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  // Handle multiple images
  function handleImageUpload(event) {
    const files = Array.from(event.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...urls]); // Append new images
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

        {/* Department Dropdown */}
        <TextField
          select
          label="Departamento"
          fullWidth
          required
          SelectProps={{ native: true }}
          sx={{ mb: 2, backgroundColor: "#e0e0e0", borderRadius: 1 }}
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Selecciona un departamento</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </TextField>

        <TextField
          label="Ciudad"
          fullWidth
          required
          sx={{ mb: 2, backgroundColor: "#e0e0e0", borderRadius: 1 }}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          label="Dirección (Opcional)"
          fullWidth
          sx={{ mb: 2, backgroundColor: "#e0e0e0", borderRadius: 1 }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          label="Latitud"
          fullWidth
          type="number"
          sx={{ mb: 2, backgroundColor: "#e0e0e0", borderRadius: 1 }}
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <TextField
          label="Longitud"
          fullWidth
          type="number"
          sx={{ mb: 2, backgroundColor: "#e0e0e0", borderRadius: 1 }}
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />

        {/* Multiple Image Upload */}
        <input
          type="file"
          multiple
          onChange={handleImageUpload}
          style={{ marginBottom: "16px" }}
        />
        <Box sx={{ display: "flex", gap: 2, overflowX: "scroll", mt: 2 }}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Uploaded"
              width={100}
              style={{ borderRadius: 8 }}
            />
          ))}
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
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
