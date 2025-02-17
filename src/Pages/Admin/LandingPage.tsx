import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableSortLabel,
  TablePagination,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { styled } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Container = styled(Box)({
  padding: "10px 5px", // Reduced padding
  maxWidth: "1000px", // Reduced max width
  margin: "auto",
});

const AddButton = styled(Button)({
  marginBottom: "8px", // Reduced margin
  backgroundColor: "#3f51b5",
  color: "#fff",
  padding: "6px 12px", // Reduced padding
  borderRadius: "6px", // Reduced border radius
  "&:hover": {
    backgroundColor: "#303f9f",
  },
});

const SearchInput = styled(TextField)({
  marginBottom: "10px", // Reduced margin
  width: "100%",
  "& .MuiInputBase-root": {
    borderRadius: "6px", // Reduced border radius
    backgroundColor: "#f5f5f5",
    paddingLeft: "10px", // Reduced padding
  },
});

const TableStyled = styled(Table)({
  minWidth: "600px", // Reduced min width
  backgroundColor: "#fff",
});

const TableCellStyled = styled(TableCell)({
  fontWeight: 600,
  padding: "6px", // Reduced padding
  fontSize: "12px", // Reduced font size
  color: "#333",
});

const TableHeadStyled = styled(TableHead)({
  backgroundColor: "#f5f5f5",
  borderBottom: "1px solid #ddd", // Reduced border size
});

const TableRowStyled = styled(TableRow)({
  "&:hover": {
    backgroundColor: "#f9f9f9",
  },
});

const TableContainerStyled = styled(TableContainer)({
  maxHeight: "350px", // Reduced height
});

interface Quiz {
  quiz_id?: number;
  quiz_title: string;
  quiz_description: string;
  quiz_exp_date: string;
  admin_createdby: number;
  quiz_createddate?: string;
}

const LandingPage: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<keyof Quiz>("quiz_title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Quiz>({
    quiz_title: "",
    quiz_description: "",
    quiz_exp_date: "",
    admin_createdby: 1,
  });

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const getQuizUrl = `${API_BASE_URL}getQuiz.php`;
      const response = await fetch(getQuizUrl, {
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

  const handleEdit = (quiz: Quiz) => {
    setFormData(quiz);
    setOpen(true);
  };

  const handleAdd = () => {
    setFormData({
      quiz_title: "",
      quiz_description: "",
      quiz_exp_date: "",
      admin_createdby: 1,
    });
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      const addOrUpdateUrl = `${API_BASE_URL}addOrUpdateQuiz.php`;
      const response = await fetch(addOrUpdateUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.code === 200) {
        console.log(data.message);
        fetchQuizzes(); // Refresh list
        setOpen(false);
      } else {
        console.error("Failed to save quiz", data.message);
      }
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handleSort = (column: keyof Quiz) => {
    const isAsc = sortBy === column && sortOrder === "asc";
    setSortBy(column);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.quiz_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {
    const isAsc = sortOrder === "asc";
    const valueA = a[sortBy]?.toString() ?? "";
    const valueB = b[sortBy]?.toString() ?? "";
    return isAsc
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  });

  const paginatedQuizzes = sortedQuizzes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container>
      <AddButton onClick={handleAdd}>Add Quiz</AddButton>
      <SearchInput
        label="Search Quiz"
        variant="outlined"
        size="small"
        fullWidth
        onChange={handleSearch}
        placeholder="Search by Quiz Title"
      />
      <TableContainerStyled>
        <TableStyled>
          <TableHeadStyled>
            <TableRow>
              <TableCellStyled>Sl No</TableCellStyled>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "quiz_title"}
                  direction={sortOrder}
                  onClick={() => handleSort("quiz_title")}
                >
                  Quiz Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "quiz_createddate"}
                  direction={sortOrder}
                  onClick={() => handleSort("quiz_createddate")}
                >
                  Quiz Created Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "quiz_exp_date"}
                  direction={sortOrder}
                  onClick={() => handleSort("quiz_exp_date")}
                >
                  Expiry Date
                </TableSortLabel>
              </TableCell>
              <TableCellStyled>Action</TableCellStyled>
            </TableRow>
          </TableHeadStyled>
          <TableBody>
            {paginatedQuizzes.map((quiz, index) => (
              <TableRowStyled key={quiz.quiz_id}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{quiz.quiz_title}</TableCell>
                <TableCell>{quiz.quiz_createddate}</TableCell>
                <TableCell>{quiz.quiz_exp_date || "N/A"}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={handleAdd}>
                    <AddIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleEdit(quiz)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRowStyled>
            ))}
          </TableBody>
        </TableStyled>
      </TableContainerStyled>
      <TablePagination
        component="div"
        count={filteredQuizzes.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Rows per page"
      />
      {/* Modal for Adding/Editing Quiz */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>{formData.quiz_id ? "Update Quiz" : "Add Quiz"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Quiz Title"
            fullWidth
            margin="dense"
            value={formData.quiz_title}
            onChange={(e) => setFormData({ ...formData, quiz_title: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="dense"
            value={formData.quiz_description}
            onChange={(e) => setFormData({ ...formData, quiz_description: e.target.value })}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Quiz Expiry Date"
              value={formData.quiz_exp_date ? new Date(formData.quiz_exp_date) : null}
              onChange={(date) => setFormData({ ...formData, quiz_exp_date: date?.toISOString() || "" })}
              format="yyyy/MM/dd"
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {formData.quiz_id ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LandingPage;
