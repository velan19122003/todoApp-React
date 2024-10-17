/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../assets/css/style.css";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Button } from "@mui/material";
function EditableComponent(props) {
  let [edit, setEdit] = props.value;
  let [editTodo, makeEdit] = useState(props.task.value);
  let [todoArr, setTodoArr] = props.arr;
  let [index] = props.index;
  let [isChecked] = props.check;
  let [showAlert, setAlert] = props.alert;
  let [alertMsg, setAlertMsg] = props.msg;
  let [severity, setSeverity] = props.type;

  // console.log(isChecked);

  function update(val, index, check) {
    // console.log(val);
    // console.log(index);
    // console.log(check);
    let t = { value: val, isCompleted: check[index] ?? false };
    setTodoArr((v) => {
      v.splice(index, 1, t);
      return [...v];
    });

    localStorage.setItem("todos", JSON.stringify(todoArr));
    setAlertMsg("Task Edited");
    setSeverity("success");
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 1200);
  }

  return (
    <>
      <div
        className="PopUp"
        onKeyUp={(e) => {
          if (e.key === "Escape") setEdit(!edit);
        }}
      >
        <CloseRoundedIcon
          htmlColor="red"
          className="closeIcon"
          onClick={(e) => {
            setEdit(!edit);
          }}
        />
        <input
          type="text"
          autoFocus
          value={editTodo}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              makeEdit(e.target.value);
              update(editTodo, index, isChecked);
              setEdit(!edit);
            }
          }}
          onChange={(e) => {
            makeEdit(e.target.value);
          }}
          name=""
          id=""
          className="EditTodo"
        />
        <Button
          disableElevation
          variant="contained"
          onClick={(e) => {
            makeEdit(e.target.value);
            update(editTodo, index, isChecked);
            setEdit(!edit);
          }}
        >
          Edit
        </Button>
      </div>
    </>
  );
}

export default EditableComponent;
