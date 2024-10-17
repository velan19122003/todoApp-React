import React, { useState } from "react";
import "../assets/css/style.css";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TodoListGenerator from "./TodoListGenerator";
function Result(props) {
  let [todo, setTodo] = props.value;
  let [todoArray, setTodoArray] = props.arr;
  let [selectValue, setSelectValue] = useState("");
  let [isChecked, setIsChecked] = useState(
    todoArray.length > 0
      ? todoArray.map((item) => {
          if (item.isCompleted) return true;
          else return false;
        })
      : []
  );

  let [showAlert, setAlert] = props.alert;
  let [alertMsg, setAlertMsg] = props.msg;
  let [severity, setSeverity] = props.type;

  function deleteTask(isAll = false) {
    setSeverity("error");
    if (isAll) {
      setAlertMsg("All tasks are deleted");
      setTodoArray((v) => {
        v = [];
        localStorage.setItem("todos", JSON.stringify(v));
        return v;
      });
      setIsChecked((v) => {
        v = [];
        return v;
      });
    } else {
      setAlertMsg("Done tasks are deleted");

      setTodoArray((v) => {
        // eslint-disable-next-line array-callback-return
        let t = v.filter((value, index) => {
          if (!value.isCompleted) return true;
        });
        localStorage.setItem("todos", JSON.stringify(t));
        return [...t];
      });

      setIsChecked((v) => {
        // eslint-disable-next-line array-callback-return
        let check = todoArray.filter((value, index) => {
          if (!value.isCompleted) return value.isCompleted;
        });
        return [...check];
      });
    }

    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 1200);
  }

  return (
    <>
      <div className="filterbox">
        <h3>Your Tasks</h3>
        <FormControl sx={{ width: 180 }}>
          <InputLabel id="filter">Filter</InputLabel>
          <Select
            sx={selectValue === 2 ? { color: "red" } : { color: "black" }}
            labelId="filter"
            label="Filter"
            autoWidth
            className="select"
            value={selectValue}
            id="filterbox"
            onChange={(e) => {
              setSelectValue(e.target.value);
            }}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={1}>Completed</MenuItem>
            <MenuItem value={2}>Not Completed</MenuItem>
          </Select>
        </FormControl>
      </div>
      <section className="deleteBtns">
        <Button
          variant="contained"
          disableElevation
          disabled={
            todoArray.length === 0 || isChecked.length === 0 ? true : false
          }
          startIcon={<CheckRoundedIcon />}
          onClick={(e) => {
            deleteTask();
          }}
        >
          Delete Done Tasks
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={(e) => {
            deleteTask(true);
          }}
          disabled={todoArray.length === 0 ? true : false}
          endIcon={<DeleteRoundedIcon />}
        >
          Delete All
        </Button>
      </section>
      <TodoListGenerator
        value={[todo, setTodo]}
        isFiltered={{
          isFiltered: selectValue !== "" ? true : false,
          value: selectValue,
        }}
        checked={[isChecked, setIsChecked]}
        arr={[todoArray, setTodoArray]}
        alert={[showAlert, setAlert]}
        msg={[alertMsg, setAlertMsg]}
        type={[severity, setSeverity]}
      />
    </>
  );
}

export default Result;
