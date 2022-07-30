import "./App.css";
import { useEffect, useState } from "react";
import { AddCircle } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [detail, setDetail] = useState("");
  const [status, setStatus] = useState("notStarted");
  const [filter, setFilter] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  const handleTodoChange = (e) => {
    setText(e.target.value);
  };

  const handleAddClick = () => {
    if (!text) return;

    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const hours = today.getHours();
    const minutes = today.getMinutes().toString().padStart(2, "0");
    const currentTime = `${date}-${month}-${year} ${hours}:${minutes}`;

    const newTodo = {
      text: text,
      id: new Date().getTime(), //random,(index)
      detail: detail,
      status: "notStarted",
      createAt: currentTime,
    };

    setTodos([...todos, newTodo]);

    setText("");
    setDetail("");
  };

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  };

  const handleStatusChange = (id, status) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));
    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.status = status;
        console.log("status=", status);
        console.log("todo.status=", todo.status);
      }
      return todo;
    });
    setTodos(newTodos);
    console.log(newTodos);
  };

  const handleDeleteClick = (id) => {
    // const deepCopy = todos.map((todo) => ({ ...todo }));
    // const newTodos = deepCopy.filter((todo) => {//?
    //   return todo.id !== id;
    // });
    const newTodos = todos.filter((todo) => {
      return todo.id !== id; //? Where are they?
    });
    setTodos(newTodos);
  };

  const handleEditTextChange = (id, text) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));
    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.text = text;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleEditDetailChange = (id, detail) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));
    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.detail = detail;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        case "notStarted":
          setFilteredTodos(
            todos.filter((todo) => todo.status === "notStarted")
          );
          break;

        case "inProgress":
          setFilteredTodos(
            todos.filter((todo) => todo.status === "inProgress")
          );
          break;

        case "done":
          setFilteredTodos(todos.filter((todo) => todo.status === "done"));
          break;

        default:
          setFilteredTodos(todos);
      }
    };
    filteringTodos();
  }, [filter, todos]); //?todos

  return (
    <Container
      maxWidth="xs"
      sx={{
        background: "#fff",
        width: "calc(100% - 40px)",
        minHeight: "400px",
        margin: "0 auto",
        padding: "40px 20px",
        boxShadow: "5px 5px 20px #999",
        borderRadius: "10px",
      }}
    >
      <Typography
        variant="h1"
        fontSize="32px"
        fontWeight="bold"
        textAlign="center"
        sx={{ mb: "24px" }}
      >
        All Tasks
      </Typography>

      <Box>
        <Typography variant="h2" fontSize="20px" fontWeight="bold" mb="8px">
          Title
        </Typography>
        <TextField
          id="filled-basic"
          label="Task Title"
          variant="filled"
          type="text"
          value={text}
          sx={{ mb: "24px", width: "100%" }}
          onChange={handleTodoChange}
        />

        <Typography variant="h2" fontSize="20px" fontWeight="bold" mb="8px">
          Details
        </Typography>
        <TextField
          id="filled-basic"
          label="Task Detail"
          variant="filled"
          value={detail}
          sx={{ mb: "24px", width: "100%" }}
          onChange={handleDetailChange}
        >
          {detail}
        </TextField>

        <AddCircle
          sx={{
            color: "#2196f3",
            fontSize: "48px",
            cursor: "pointer",
            display: "block",
            m: "0 auto 24px",
          }}
          onClick={handleAddClick}
        />

        <FormControl variant="filled" sx={{ minWidth: 200, mb: "24px" }}>
          <InputLabel id="demo-simple-select-filled-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="notStarted">Not Started</MenuItem>
            <MenuItem value="inProgress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </FormControl>

        <ul>
          {filteredTodos.map((todo) => {
            return (
              <li key={todo.id}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="text"
                  value={todo.text}
                  sx={{ mr: 1, width: "45%" }}
                  onChange={(e) => {
                    handleEditTextChange(todo.id, e.target.value);
                  }}
                />

                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={todo.detail}
                  sx={{ width: "45%" }}
                  onChange={(e) => {
                    handleEditDetailChange(todo.id, e.target.value);
                  }}
                />

                <FormControl sx={{ mt: "8px" }}>
                  <Select
                    value={todo.status} //!
                    onChange={(e) => {
                      handleStatusChange(todo.id, e.target.value);
                    }}
                  >
                    <MenuItem value="notStarted">Not Started</MenuItem>
                    <MenuItem value="inProgress">In Progress</MenuItem>
                    <MenuItem value="done">Done</MenuItem>
                  </Select>
                </FormControl>

                <Box sx={{ mt: "8px" }}>{todo.createAt}</Box>

                <CancelIcon
                  sx={{
                    color: "#f44336",
                    fontSize: "48px",
                    cursor: "pointer",
                    display: "block",
                  }}
                  onClick={() => handleDeleteClick(todo.id)}
                >
                  Delete
                </CancelIcon>
              </li>
            );
          })}
        </ul>
      </Box>
    </Container>
  );
}

export default App;
