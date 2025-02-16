import React, { useState } from "react";
import { List, ListItem, ListItemText, ListItemButton, Divider, Box } from "@mui/material";

const menuItems = ["Dashboard", "Courses", "Profile", "Logout"];

const LeftNavBar: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <Box>
      <List>
        {menuItems.map((text, index) => (
          <React.Fragment key={text}>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => handleListItemClick(index)}
                sx={{
                  backgroundColor: selectedIndex === index ? "rgba(255,255,255,0.15)" : "transparent", // Darker selection
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" }, // Lighter hover effect
                  "&.Mui-selected": { backgroundColor: "rgba(255,255,255,0.2) !important" }, // Slightly darker selected state
                  "&.Mui-selected:hover": { backgroundColor: "rgba(255,255,255,0.25) !important" }, // Darker hover for selected
                }}
              >
                <ListItemText primary={text} sx={{ color: "white" }} />
              </ListItemButton>
            </ListItem>
            {index < menuItems.length - 1 && <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />} {/* Darker divider */}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default LeftNavBar;
