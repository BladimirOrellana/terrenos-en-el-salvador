"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import {
  Container,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";

export default function EditSellerProfile() {
  const { user, loading } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    businessName: "",
    description: "",
    address: "",
    facebook: "",
    instagram: "",
  });

  const [saving, setSaving] = useState(false);

  // Fetch seller details
  useEffect(() => {
    if (!user) return;
    async function fetchProfile() {
      try {
        const res = await fetch(`/api/sellers/${user.uid}`);
        if (!res.ok) throw new Error("Failed to fetch seller profile");
        const data = await res.json();
        setFormData({
          name: data.name || "",
          phone: data.phone || "",
          businessName: data.businessName || "",
          description: data.description || "",
          address: data.address || "",
          facebook: data.facebook || "",
          instagram: data.instagram || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    fetchProfile();
  }, [user]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save Profile
  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    try {
      const res = await fetch("/api/sellers/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid, email: user.email, ...formData }),
      });

      // ✅ Fix: Check if response is empty before parsing
      let data = {};
      if (res.headers.get("content-length") !== "0") {
        data = await res.json();
      }

      if (res.ok) {
        alert("Perfil de vendedor actualizado con éxito");
        router.push(`/seller/${user.uid}`);
      } else {
        alert(data.message || "Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error updating seller profile:", error);
      alert("Hubo un problema al actualizar el perfil");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          textAlign="center"
        >
          Editar Perfil de Vendedor
        </Typography>

        <Box component="form" sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
            inputProps={{ style: { color: "#000" } }} // Black text
          />
          <TextField
            fullWidth
            label="Teléfono"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            sx={{ mb: 2 }}
            inputProps={{ style: { color: "#000" } }}
          />
          <TextField
            fullWidth
            label="Nombre del Negocio"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            sx={{ mb: 2 }}
            inputProps={{ style: { color: "#000" } }}
          />
          <TextField
            fullWidth
            label="Descripción"
            name="description"
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
            inputProps={{ style: { color: "#000" } }}
          />
          <TextField
            fullWidth
            label="Dirección"
            name="address"
            value={formData.address}
            onChange={handleChange}
            sx={{ mb: 2 }}
            inputProps={{ style: { color: "#000" } }}
          />
          <TextField
            fullWidth
            label="Facebook (URL)"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            sx={{ mb: 2 }}
            inputProps={{ style: { color: "#000" } }}
          />
          <TextField
            fullWidth
            label="Instagram (URL)"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            sx={{ mb: 2 }}
            inputProps={{ style: { color: "#000" } }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
