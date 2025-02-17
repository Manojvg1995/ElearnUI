import React, { useState } from "react";
import { 
  AppBar, Toolbar, IconButton, Drawer, Divider, Box, CssBaseline 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LeftNavBar from "../../component/LeftNavBar";
import ActivityArea from "../../component/ActivityArea";

const drawerWidth = 250;
const navBarHeight = 64;

const AdminDashBoard: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [selectedContent, setSelectedContent] = useState<string>("Dashboard"); // Default selection

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#fff",
          color: "#000",
          zIndex: 1201,
          width: "100%", 
          transform: open ? `translateX(${drawerWidth}px)` : "translateX(0)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          height: `${navBarHeight}px`,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar sx={{ minHeight: `${navBarHeight}px` }}>
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
            transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: open ? "translateX(0)" : `translateX(-${drawerWidth}px)`,
          },
        }}
      >
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
          <LeftNavBar 
            selectedContent={selectedContent} 
            onContentChange={setSelectedContent} 
          />
        </Box>
      </Drawer>

      {/* Container for ActivityArea - Fixed to Top-Left */}
      <Box
        sx={{
          position: "absolute",
          top: `${navBarHeight}px`,
          left: open ? `${drawerWidth}px` : "0px",
          transition: "left 0.4s ease",
          width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
          padding: "10px",
        }}
      >
        <ActivityArea selectedContent={selectedContent} />
      </Box>
    </>
  );
};

export default AdminDashBoard;
