import React from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";

interface LeftNavBarProps {
  selectedContent: string;
  onContentChange: (content: string) => void;
}

const LeftNavBar: React.FC<LeftNavBarProps> = ({ selectedContent, onContentChange }) => {
  const menuItems = ["Dashboard", "Student", "Settings", "Reports"];

  return (
    <List>
      {menuItems.map((item) => (
        <ListItemButton
          key={item}
          onClick={() => onContentChange(item)}
          sx={{
            backgroundColor: selectedContent === item ? "rgba(255, 255, 255, 0.2)" : "transparent",
            color: "white",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
            borderRadius: "8px",
            margin: "5px",
          }}
        >
          <ListItemText primary={item} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default LeftNavBar;
