"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBar() {
  const { user } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Navigation Links
  const navLinks = user
    ? [
        { text: "Perfil", href: "/profile" },
        { text: "Cerrar Sesión", href: "/logout" },
      ]
    : [
        { text: "Iniciar Sesión", href: "/login" },
        { text: "Registrarse", href: "/signup" },
      ];

  // Mobile Drawer (Sidebar Menu)
  const drawer = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "#0a0a0a",
        height: "100vh",
        color: "#fff",
      }}
    >
      <List>
        {navLinks.map((link, index) => (
          <ListItem button key={index} onClick={handleDrawerToggle}>
            <Link href={link.href} passHref>
              <ListItemText primary={link.text} sx={{ textAlign: "center" }} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* App Bar */}
      <AppBar position="static" sx={{ backgroundColor: "#0a0a0a" }}>
        <Toolbar>
          {/* Hamburger Icon for Mobile */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo / Title */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link href="/" passHref>
              Terrenos en El Salvador
            </Link>
          </Typography>

          {/* Desktop Navigation (Hidden on Small Screens) */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {navLinks.map((link, index) => (
              <Link key={index} href={link.href} passHref>
                <Button color="inherit">{link.text}</Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Sidebar */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
}
