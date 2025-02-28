"use client";

import Link from "next/link";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";

export default function NavBar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#0a0a0a" }}>
      <Toolbar>
        {/* Logo / Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" passHref>
            Terrenos en El Salvador
          </Link>
        </Typography>

        {/* Navigation Links */}
        <Box>
          <Link href="/login" passHref>
            <Button color="inherit">Iniciar Sesión</Button>
          </Link>
          <Link href="/signup" passHref>
            <Button color="inherit">Registrarse</Button>
          </Link>
          <Link href="/profile" passHref>
            <Button color="inherit">Profile</Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
