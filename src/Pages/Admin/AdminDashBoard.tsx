import React, { useState } from "react";
import { 
  AppBar, Toolbar, IconButton, Drawer, Divider, Box, CssBaseline 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LeftNavBar from "../../component/LeftNavBar";
import ActivityArea from "../../component/ActivityArea";

const drawerWidth = 250; // Sidebar width
const navBarHeight = 64; // Standard Navbar height

const AdminDashBoard: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true); // Sidebar open by default

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <CssBaseline />

      {/* Top Navigation Bar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#fff",
          color: "#000",
          zIndex: 1201,
          width: "100%", 
          transform: open ? `translateX(${drawerWidth}px)` : "translateX(0)", // Smooth shift
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)", // Smooth animation
          height: `${navBarHeight}px`,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar sx={{ minHeight: `${navBarHeight}px` }}>
          {/* Menu Button */}
          <IconButton
            onClick={toggleDrawer}
            sx={{
              color: "#000",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Left Sidebar (Drawer) */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            height: "100vh",
            position: "fixed",
            top: 0,
            zIndex: 1200,
            backgroundColor: "#1976d2",
            color: "white",
            transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)", // Smooth opening
            transform: open ? "translateX(0)" : `translateX(-${drawerWidth}px)`, // Hide sidebar
          },
        }}
      >
        {/* Sidebar Header with Elearn Title */}
        <Box
          sx={{
            textAlign: "center",
            padding: "16px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Elearn
        </Box>
        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.3)" }} />
        <Box role="presentation">
          <LeftNavBar />
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box
        sx={{
          transform: open ? `translateX(${drawerWidth}px)` : "translateX(0)", // Move smoothly
          transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)", // Smooth effect
          marginTop: `${navBarHeight}px`,
          padding: "20px",
        }}
      >
        <ActivityArea />
      </Box>
    </>
  );
};

export default AdminDashBoard;
