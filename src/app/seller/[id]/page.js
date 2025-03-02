"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import {
  Container,
  Typography,
  Avatar,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Button,
  Box,
  Paper,
  Rating,
  Divider,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import BusinessIcon from "@mui/icons-material/Business";
import EditIcon from "@mui/icons-material/Edit";

export default function SellerPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useUser();
  const [seller, setSeller] = useState(null);
  const [listings, setListings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSellerData() {
      try {
        const res = await fetch(`/api/sellers/${id}`);
        if (!res.ok) throw new Error("Seller not found");
        const data = await res.json();
        setSeller(data.seller);
        setListings(data.listings);
      } catch (error) {
        console.error("Error fetching seller data:", error);
        setError("Seller not found.");
      } finally {
        setLoading(false);
      }
    }

    fetchSellerData();
  }, [id]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`/api/reviews?sellerId=${id}`);
        if (!res.ok) throw new Error("Error fetching reviews");
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    fetchReviews();
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
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      {seller && (
        <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
          {/* Seller Profile Section */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <Avatar
                src={seller.photoURL || "/default-avatar.png"}
                sx={{ width: 120, height: 120, mr: 3 }}
              />
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {seller.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {seller.businessName || "Vendedor Independiente"}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <PhoneIcon color="primary" />
                  <Typography>{seller.phone || "No disponible"}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <EmailIcon color="primary" />
                  <Typography>{seller.email}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <BusinessIcon color="primary" />
                  <Typography>
                    {seller.address || "Ubicación no especificada"}
                  </Typography>
                </Box>
                <Box display="flex" gap={2} mt={2}>
                  {seller.facebook && (
                    <Link href={seller.facebook} target="_blank">
                      <FacebookIcon sx={{ fontSize: 30, color: "#1877f2" }} />
                    </Link>
                  )}
                  {seller.instagram && (
                    <Link href={seller.instagram} target="_blank">
                      <InstagramIcon sx={{ fontSize: 30, color: "#e4405f" }} />
                    </Link>
                  )}
                </Box>
              </Box>
            </Box>

            {/* Edit Profile Button (Only for the Seller) */}
            {user?.uid === seller.uid && (
              <Link href="/seller/edit" passHref>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<EditIcon />}
                >
                  Editar Perfil
                </Button>
              </Link>
            )}
          </Box>

          {/* Seller Description */}
          <Typography variant="h6" fontWeight="bold" mt={3}>
            Sobre el Vendedor
          </Typography>
          <Typography color="textSecondary" sx={{ mt: 1 }}>
            {seller.description ||
              "Este vendedor aún no ha agregado una descripción."}
          </Typography>
        </Paper>
      )}

      {/* Reviews Section */}
      <Paper sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Opiniones de Clientes
        </Typography>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Box key={review._id} mb={2}>
              <Typography fontWeight="bold">{review.customerName}</Typography>
              <Rating value={review.rating} readOnly />
              <Typography color="textSecondary">{review.comment}</Typography>
              <Divider sx={{ my: 2 }} />
            </Box>
          ))
        ) : (
          <Typography color="textSecondary">Aún no hay opiniones.</Typography>
        )}
      </Paper>

      {/* Properties for Sale */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Propiedades en Venta
      </Typography>

      <Grid container spacing={3}>
        {listings.map((listing) => (
          <Grid item xs={12} sm={6} md={4} key={listing._id}>
            <Card>
              <CardMedia
                component="img"
                height="150"
                image={listing.imageUrl || "/placeholder.jpg"}
                alt={listing.title}
              />
              <CardContent>
                <Typography variant="h6">{listing.title}</Typography>
                <Typography color="textSecondary">
                  ${listing.price.toLocaleString()} - {listing.size} m²
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Link href={`/listing/${listing._id}`} passHref>
                  <Button variant="contained" color="primary" fullWidth>
                    Ver Detalles
                  </Button>
                </Link>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
