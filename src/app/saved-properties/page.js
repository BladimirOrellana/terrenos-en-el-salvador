"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";
import Link from "next/link";

export default function SavedPropertiesPage() {
  const { user, loading } = useUser();
  const [savedProperties, setSavedProperties] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    async function fetchSavedProperties() {
      if (!user) return;
      try {
        const res = await fetch(`/api/saved-properties?userId=${user.uid}`);
        if (!res.ok) throw new Error("Error fetching saved properties");
        const data = await res.json();
        setSavedProperties(data);
      } catch (error) {
        console.error("Error fetching saved properties:", error);
      } finally {
        setLoadingData(false);
      }
    }
    fetchSavedProperties();
  }, [user]);

  if (loading || loadingData) {
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Propiedades Guardadas
      </Typography>

      <Grid container spacing={3}>
        {savedProperties.length > 0 ? (
          savedProperties.map((saved) => (
            <Grid item xs={12} sm={6} md={4} key={saved.propertyId._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="150"
                  image={saved.propertyId.imageUrl || "/placeholder.jpg"}
                  alt={saved.propertyId.title}
                />
                <CardContent>
                  <Typography variant="h6">{saved.propertyId.title}</Typography>
                  <Typography color="textSecondary">
                    ${saved.propertyId.price.toLocaleString()} -{" "}
                    {saved.propertyId.size} m²
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Link href={`/listing/${saved.propertyId._id}`} passHref>
                    <Button variant="contained" color="primary" fullWidth>
                      Ver Detalles
                    </Button>
                  </Link>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary" sx={{ mt: 3 }}>
            No has guardado ninguna propiedad aún.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
