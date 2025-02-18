import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TableSortLabel,
  TablePagination,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Container = styled(Box)({
  padding: "10px 5px",
  maxWidth: "1000px",
  margin: "auto",
});

const AddButton = styled(Button)({
  marginBottom: "8px",
  backgroundColor: "#3f51b5",
  color: "#fff",
  padding: "6px 12px",
  borderRadius: "6px",
  "&:hover": {
    backgroundColor: "#303f9f",
  },
});

const SearchInput = styled(TextField)({
  marginBottom: "10px",
  width: "100%",
  "& .MuiInputBase-root": {
    borderRadius: "6px",
    backgroundColor: "#f5f5f5",
    paddingLeft: "10px",
  },
});

const TableStyled = styled(Table)({
  minWidth: "600px",
  backgroundColor: "#fff",
});

const TableCellStyled = styled(TableCell)({
  fontWeight: 600,
  padding: "6px",
  fontSize: "12px",
  color: "#333",
});

const TableHeadStyled = styled(TableHead)({
  backgroundColor: "#f5f5f5",
  borderBottom: "1px solid #ddd",
});

const TableRowStyled = styled(TableRow)({
  "&:hover": {
    backgroundColor: "#f9f9f9",
  },
});

const TableContainerStyled = styled(TableContainer)({
  maxHeight: "350px",
});

interface Student {
  student_id: number;
  full_name: string;
  phone_num: string;
  email: string;
  created_at: number;
}

const LandingPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<keyof Student>("full_name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Student>({
    student_id: 0,
    full_name: "",
    phone_num: "",
    email: "",
    created_at: 1,
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}getStudentDetails.php`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
  
      if (data.status === "success") {
        setStudents(data.data); // Update to use `data.data`
      } else {
        console.error("Failed to fetch Students", data.message);
      }
    } catch (error) {
      console.error("Error fetching Students:", error);
    }
  };
  
  // Formatting `created_at` before displaying
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  

  const handleEdit = (student: Student) => {
    setFormData(student);
    setOpen(true);
  };

  const handleAdd = () => {
    setFormData({
      student_id: 0,
      full_name: "",
      phone_num: "",
      email: "",
      created_at: 1,
    });
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}addOrUpdateStudent.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.code === 200) {
        fetchStudents();
        setOpen(false);
      } else {
        console.error("Failed to save student", data.message);
      }
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const handleSort = (column: keyof Student) => {
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

  const filteredStudents = students.filter((student) =>
    student.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateQuestionToStudent = (studentId: number) => {
    if (!studentId) return;
    navigate(`/addQuetionsToStudent/${studentId}`);
  };

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const isAsc = sortOrder === "asc";
    return isAsc
      ? a[sortBy].toString().localeCompare(b[sortBy].toString())
      : b[sortBy].toString().localeCompare(a[sortBy].toString());
  });

  const paginatedStudents = sortedStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container>
      <AddButton onClick={handleAdd}>Add Student</AddButton>
      <SearchInput
        label="Search Student"
        variant="outlined"
        size="small"
        fullWidth
        onChange={handleSearch}
        placeholder="Search by Student Name"
      />
      <TableContainerStyled>
        <TableStyled>
          <TableHeadStyled>
            <TableRow>
              <TableCellStyled>Sl No</TableCellStyled>
              <TableCellStyled>Student Name</TableCellStyled>
              <TableCellStyled>Phone Number</TableCellStyled>
              <TableCellStyled>Email</TableCellStyled>
              <TableCellStyled>Actions</TableCellStyled>
            </TableRow>
          </TableHeadStyled>
          <TableBody>
            {paginatedStudents.map((student, index) => (
              <TableRowStyled key={student.student_id || index}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{student.full_name}</TableCell>
                <TableCell>{student.phone_num}</TableCell>
                <TableCell>{student.email || "N/A"}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => updateQuestionToStudent(student.student_id)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleEdit(student)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRowStyled>
            ))}
          </TableBody>
        </TableStyled>
      </TableContainerStyled>
    </Container>
  );
};

export default LandingPage;
