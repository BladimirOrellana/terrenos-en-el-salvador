"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Button,
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
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={property.imageUrl || "/placeholder.jpg"}
              alt={property.title}
            />
            <CardContent>
              <Typography variant="h4">{property.title}</Typography>
              <Typography variant="h6" color="textSecondary">
                ${property.price.toLocaleString()} - {property.size} m²
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {property.description}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                📍 {property.location}
              </Typography>
            </CardContent>
          </Card>

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
