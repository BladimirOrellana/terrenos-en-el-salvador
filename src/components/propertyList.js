"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("/api/properties");

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const text = await res.text();
        if (!text) {
          throw new Error("Empty response from server");
        }

        const data = JSON.parse(text);
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setError("Error loading properties.");
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (properties.length === 0) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6">No hay propiedades disponibles.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Propiedades en Venta
      </Typography>

      <Grid container spacing={4}>
        {properties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property._id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              {/* Property Image */}
              <CardMedia
                component="img"
                height="200"
                image={property.images?.[0] || "/placeholder.jpg"} // Supports multiple images
                alt={property.title}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                {/* Property Title */}
                <Typography variant="h6">{property.title}</Typography>

                {/* Price & Size */}
                <Typography variant="body1" color="textSecondary">
                  ${property.price.toLocaleString()} - {property.size} m²
                </Typography>

                {/* Location - FIXED */}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ mb: 2 }}
                >
                  📍 {property.location?.department}, {property.location?.city}
                </Typography>

                {/* If Address Exists */}
                {property.location?.address && (
                  <Typography variant="body2" color="textSecondary">
                    🏠 {property.location.address}
                  </Typography>
                )}

                {/* Buttons */}
                <Link href={`/listing/${property._id}`} passHref>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    Ver Detalles
                  </Button>
                </Link>

                <Link href={`/seller/${property.ownerId}`} passHref>
                  <Button variant="outlined" color="secondary" fullWidth>
                    Ver Perfil del Vendedor
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
