"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";

export default function PropertyPage() {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProperty() {
      try {
        const res = await fetch(`/api/properties/${id}`);

        if (!res.ok) {
          throw new Error("Property not found");
        }

        const data = await res.json();
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
        setError("Property not found.");
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [id]);

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

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
      {property && (
        <>
          {/* ✅ Image Carousel / Slider */}
          <Box sx={{ display: "flex", overflowX: "auto", gap: 2, pb: 2 }}>
            {property.images?.length > 0 ? (
              property.images.map((image, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  height="300"
                  image={image || "/placeholder.jpg"}
                  alt={`Property image ${index + 1}`}
                  sx={{ width: "100%", maxWidth: 400, borderRadius: 2 }}
                />
              ))
            ) : (
              <CardMedia
                component="img"
                height="300"
                image="/placeholder.jpg"
                alt="Placeholder Image"
              />
            )}
          </Box>

          <CardContent>
            <Typography variant="h4">{property.title}</Typography>
            <Typography variant="h6" color="textSecondary">
              ${property.price.toLocaleString()} - {property.size} m²
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {property.description}
            </Typography>

            {/* ✅ FIX: Extract location values properly */}
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              📍 {property.location?.department}, {property.location?.city}
            </Typography>

            {/* Show address only if available */}
            {property.location?.address && (
              <Typography variant="body2" color="textSecondary">
                🏠 {property.location.address}
              </Typography>
            )}
          </CardContent>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={() => router.push(`/seller/${property.ownerId}`)}
          >
            Ver Perfil del Vendedor
          </Button>
        </>
      )}
    </Container>
  );
}
