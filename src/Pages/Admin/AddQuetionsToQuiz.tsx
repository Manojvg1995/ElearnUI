import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  TextField,
  IconButton as MuiIconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const drawerWidth = 240; // Sidebar width

const AddQuestionsToQuiz = () => {
  const [questions, setQuestions] = useState<{ id: number; text: string; options: { text: string; correct: boolean }[] }[]>([]); // Store added questions
  const [questionText, setQuestionText] = useState(""); // Input field state for question
  const [options, setOptions] = useState<{ text: string; correct: boolean }[]>([]); // Store options for the current question
  const [optionText, setOptionText] = useState(""); // Input field state for options
  const [selectedQuestion, setSelectedQuestion] = useState<{ id: number; text: string; options: { text: string; correct: boolean }[] } | null>(null); // Track selected question

  // Handle adding a new question
  const handleAddQuestion = () => {
    if (questionText.trim() !== "" && options.length > 0) {
      const newQuestion = {
        id: questions.length + 1,
        text: questionText,
        options: options,
      };
      setQuestions([...questions, newQuestion]);
      setSelectedQuestion(newQuestion); // Set the newly added question as selected
      setQuestionText(""); // Clear input field after adding question
      setOptions([]); // Clear options
    }
  };

  // Handle adding a new option
  const handleAddOption = () => {
    if (optionText.trim() !== "") {
      setOptions([...options, { text: optionText, correct: false }]);
      setOptionText(""); // Clear the option input field after adding
    }
  };

  // Handle deleting an option
  const handleDeleteOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  // Handle selecting a question from the sidebar
  const handleSelectQuestion = (question: { id: number; text: string; options: { text: string; correct: boolean }[] }) => {
    setSelectedQuestion(question);
    setOptions(question.options);
    setQuestionText(question.text); // Set the question text in the input field
  };

  // Handle updating an existing question
  const handleUpdateQuestion = () => {
    if (selectedQuestion) {
      const updatedQuestions = questions.map((q) =>
        q.id === selectedQuestion.id
          ? { ...q, text: questionText, options: options }
          : q
      );
      setQuestions(updatedQuestions);
      setSelectedQuestion(null); // Clear the selected question after saving
      setQuestionText(""); // Clear the question input field
      setOptions([]); // Clear options
    }
  };

  // Handle deleting a question from the list
  const handleDeleteQuestion = (id: number) => {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
    setSelectedQuestion(null); // Clear selected question after deletion
  };

  // Handle resetting the form to add a new question
  const handleAddNewQuestion = () => {
    setSelectedQuestion(null); // Clear the selected question
    setQuestionText(""); // Clear the question input field
    setOptions([]); // Clear options
  };

  // Handle updating the option text
  const handleUpdateOption = (index: number, newText: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = { ...updatedOptions[index], text: newText }; // Update the option text
    setOptions(updatedOptions);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Full Width Top Navigation Bar */}
      <AppBar position="fixed" sx={{ width: "100%", backgroundColor: "#1976d2" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
            <ArrowBackIcon /> {/* Back button */}
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Add Question
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar (Left Navigation Bar) */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box", mt: "64px" }, // Prevents overlap
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", height: "calc(100vh - 64px)" }}>
          <Typography variant="h6" sx={{ p: 2 }}>
            Previous Questions
          </Typography>
          <Divider />
          <List sx={{ overflowY: "auto", maxHeight: "calc(100vh - 160px)" }}>
    {questions.length === 0 ? (
      <Typography sx={{ p: 2, textAlign: "center" }}>No Questions Added</Typography>
    ) : (
      questions.map((q) => (
        <ListItem
          key={q.id}
          component="button" // Use the component prop to make it a button
          onClick={() => handleSelectQuestion(q)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "left",
            width: "100%",
          }}
        >
          <ListItemText
            primary={`Q${q.id}: ${q.text}`}
            sx={{
              maxHeight: "40px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          />
          <MuiIconButton
            onClick={(e) => {
              e.stopPropagation(); // Prevent the ListItem onClick from firing
              handleDeleteQuestion(q.id);
            }}
            edge="end"
          >
            <DeleteIcon />
          </MuiIconButton>
        </ListItem>
      ))
    )}
    </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: "64px", ml: `${drawerWidth}px`, width: `calc(100% - ${drawerWidth}px)` }}>

        <Typography variant="h5" sx={{ mb: 2 }}>Add Question to Quiz</Typography>
        <TextField
          label="Enter Question"
          variant="outlined"
          fullWidth
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Add Options */}
        <Typography variant="h6" sx={{ mt: 3 }}>Add Options</Typography>
        <Box sx={{ maxHeight: "300px", overflowY: "auto", mb: 2 }}>
          {options.map((option, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <TextField
                value={option.text}
                onChange={(e) => handleUpdateOption(index, e.target.value)} // Update option text when changed
                variant="outlined"
                fullWidth
              />
              <MuiIconButton onClick={() => handleDeleteOption(index)} sx={{ ml: 1 }}>
                <DeleteIcon />
              </MuiIconButton>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <TextField
            label="Enter Option"
            variant="outlined"
            fullWidth
            value={optionText}
            onChange={(e) => setOptionText(e.target.value)}
            sx={{ mr: 1 }}
          />
          <Button variant="contained" color="secondary" onClick={handleAddOption}>
            <AddIcon />
          </Button>
        </Box>

        {/* Save or Update Button */}
        {selectedQuestion ? (
          <>
            <Button variant="contained" color="success" onClick={handleUpdateQuestion}>
              Update Question
            </Button>
            {/* Button to reset the form and add a new question */}
            <Button variant="outlined" color="primary" onClick={handleAddNewQuestion} sx={{ ml: 2 }}>
              Add New Question
            </Button>
          </>
        ) : (
          options.length > 0 && (
            <Button variant="contained" color="success" onClick={handleAddQuestion}>
              Save Question
            </Button>
          )
        )}

        {/* Display selected question */}
        {selectedQuestion && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Selected Question</Typography>
            <Typography>Q{selectedQuestion.id}: {selectedQuestion.text}</Typography>
            <Typography variant="subtitle1">Options</Typography>
            {selectedQuestion.options.map((option, index) => (
              <Typography key={index}>- {option.text}</Typography>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AddQuestionsToQuiz;
