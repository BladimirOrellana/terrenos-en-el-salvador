"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { usePathname } from "next/navigation"; // ✅ Import to detect current route
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
  const pathname = usePathname(); // ✅ Get current route

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // **Navigation Links for Logged-in Users**
  const userLinks = [
    { text: "Inicio", href: "/" },
    { text: "Perfil", href: "/profile" },
    { text: "Mis Terrenos", href: "/dashboard" },
    { text: "Agregar Terreno", href: "/add-listing" },
    { text: "Terrenos", href: "/listings" },
    { text: "Contacto", href: "/contact" },
    { text: "Nosotros", href: "/about" },
  ];

  // **Navigation Links for Guests**
  const guestLinks = [
    { text: "Inicio", href: "/" },
    { text: "Terrenos", href: "/listings" },
    { text: "Contacto", href: "/contact" },
    { text: "Nosotros", href: "/about" },
    { text: "Iniciar Sesión", href: "/login" },
  ];

  // ✅ **Using Ternary (`? :`) to include `commonLinks`**
  const navLinks = user ? userLinks : guestLinks;

  // ✅ **Dynamic background color (transparent on home, dark on others)**
  const navBackground = pathname === "/" ? "transparent" : "#0a0a0a";

  // **Mobile Drawer (Sidebar Menu)**
  const drawer = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "#0a0a0a",
        height: "100vh",
        color: "#fff",
        paddingTop: "env(safe-area-inset-top)",
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
      <AppBar
        position="fixed"
        sx={{ backgroundColor: navBackground, boxShadow: "none" }}
      >
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
