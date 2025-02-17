import { useState, useEffect } from "react";
import { Button, TextField, IconButton, Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const AddQuestionsToQuiz = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ id: 1, text: "" }]);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const quizId = useSelector((state: RootState) => state.quiz.quizId);
  // Function to add a new option
  const handleAddOption = () => {
    setOptions([...options, { id: options.length + 1, text: "" }]);
  };

  // Function to update an option
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index].text = value;
    setOptions(updatedOptions);
  };

  useEffect(() => {
    console.log("quizId",quizId)
  }, []);
  
  // Function to remove an option
  const handleRemoveOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  // Function to handle submitting the question to the quiz
  const handleSubmit = async () => {
    if (!question || options.length < 2 || correctAnswer === null) {
      alert("Please enter a question, at least two options, and select the correct answer.");
      return;
    }

    const newQuestion = {
      quizId,
      question,
      options,
      correctAnswer: options[correctAnswer].text,
    };

    try {
      const response = await fetch("http://localhost:5000/api/quiz/add-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuestion),
      });

      if (response.ok) {
        alert("Question added successfully!");
        setQuestion("");
        setOptions([{ id: 1, text: "" }]);
        setCorrectAnswer(null);
      } else {
        alert("Failed to add question");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding question");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Add Question to Quiz</Typography>

      {/* Question Input */}
      <TextField
        fullWidth
        label="Enter your question"
        variant="outlined"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Options Input */}
      {options.map((option, index) => (
        <Box key={option.id} display="flex" alignItems="center" sx={{ mb: 1 }}>
          <TextField
            fullWidth
            label={`Option ${index + 1}`}
            variant="outlined"
            value={option.text}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
          <input
            type="radio"
            name="correctAnswer"
            onChange={() => setCorrectAnswer(index)}
            checked={correctAnswer === index}
            style={{ marginLeft: "10px" }}
          />
          <IconButton onClick={() => handleRemoveOption(index)} disabled={options.length <= 2}>
            <DeleteIcon color={options.length > 2 ? "error" : "disabled"} />
          </IconButton>
        </Box>
      ))}

      {/* Add Option Button */}
      <Button variant="outlined" onClick={handleAddOption} startIcon={<AddIcon />} sx={{ mb: 2 }}>
        Add Option
      </Button>

      {/* Submit Button */}
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
        Submit Question
      </Button>
    </Box>
  );
};

export default AddQuestionsToQuiz;
