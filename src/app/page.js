"use client";

import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#0a0a0a",
        backgroundImage: "url('/images/coming-soon-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      />

      {/* Content */}
      <Container sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
            🌎 Terrenos en El Salvador
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.8, mb: 4 }}>
            Estamos construyendo algo increíble para ti. ¡Muy pronto podrás
            comprar tu terreno ideal!
          </Typography>

          {/* Notify Me Button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="mailto:info@terrenosenelsalvador.com"
            sx={{ mt: 4 }}
          >
            Notificarme 📩
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
}
