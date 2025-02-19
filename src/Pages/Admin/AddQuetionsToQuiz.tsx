import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from '@mui/material/IconButton';
import { Container } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { List, ListItem, ListItemText, ListItemButton, TextField, Radio } from "@mui/material";

const AddQuetionsToQuiz : React.FC = () => {

  const [options, setOptions] = useState<string[]>([""]);

  const handleAddOption = () => {
    if (options[options.length - 1].trim() !== "") {
      setOptions([...options, ""]); // Add new option only if the last one is filled
    }
  };

  const handleDeleteOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index)); // Remove selected option
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };


  return (
    <Container sx={{ display: 'flex',flexDirection: "column", maxWidth: "100% !important",padding: "0 !important",alignItems: "stretch"}}>
      <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
          <AppBar position="static" >
            <Toolbar>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, }} >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Add Question
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Box sx={{ display: "flex", height: "100vh" }}>
          <Box sx={{flex: 0.25, display: "flex", flexDirection: "column",overflow: "hidden",paddingTop:10,}}>
            <Box sx={{ flex: 1, overflowY: "auto", maxHeight: "100vh", p: 1, scrollbarWidth: "none", padding:0, "&::-webkit-scrollbar": { display: "none" }}}>
              <List sx={{ padding:0 }}>
                {[...Array(20)].map((_, index) => (
                  <ListItem key={index} sx={{ padding:0.2 }}>
                    <ListItemButton onClick={() => console.log(`Clicked on Item ${index + 1}`)}>
                      <ListItemText primary={`Item ${index + 1}`} />
                      <ArrowForwardIosIcon sx={{ fontSize: 16, color: "gray" }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>

          <Box sx={{ flex: 1, display: "flex", p: 1, paddingTop: "6%" }}>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", p: 1 }}>
              <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                Add Question
              </Typography>
              <TextField fullWidth label="Add Question" variant="outlined" sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TextField fullWidth label="Enter your option" variant="outlined" sx={{ maxWidth: "60%", fontSize: "0.875rem" }} />
                <Radio />
                <IconButton color="primary" sx={{ backgroundColor: "#e0e0e0", borderRadius: 1, p: 1 }}>
                  <AddIcon />
                </IconButton>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
      </Box>
    </Container>
 
  );
}

export default AddQuetionsToQuiz;