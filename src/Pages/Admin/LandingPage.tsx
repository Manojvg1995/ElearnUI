import React, { useEffect, useState } from "react";
import { 
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button 
} from "@mui/material";

interface Quiz {
  quiz_id: number;
  quiz_title: string;
  quiz_createddate: string;
}

const LandingPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("http://localhost/elearnapi/getQuiz.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "ALL" }),
        });
        const data = await response.json();
        if (data.code === 200) {
          setQuizzes(data.quizzes);
        } else {
          console.error("Failed to fetch quizzes", data.message);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchQuizzes();
  }, []);

  const handleUpdate = (id: number) => {
    console.log("Update quiz with ID:", id);
  };

  return (
    <Box p={3}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell>Quiz Name</TableCell>
              <TableCell>Quiz Created Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizzes.map((quiz, index) => (
              <TableRow key={quiz.quiz_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{quiz.quiz_title}</TableCell>
                <TableCell>{quiz.quiz_createddate}</TableCell>
                <TableCell>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleUpdate(quiz.quiz_id)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LandingPage;
