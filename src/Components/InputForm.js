import React, { useState } from "react";
import Button from "@mui/material/Button";
import Result from "./Result";
import DialogComponent from "./DialogComponent";

function InputForm() {
  let [todo, setTodo] = useState("");
  let [todoArray, setTodoArray] = useState(
    JSON.parse(localStorage.getItem("todos"))
  );

  let [showAlert, setAlert] = useState(false);
  let [alertMsg, setAlertMsg] = useState("");
  let [severity, setSeverity] = useState("");

  function update(t) {
    if (todo.trim().length !== 0) {
      setTodoArray((v) => {
        localStorage.setItem("todos", JSON.stringify([...v, t]));
        return [...v, t];
      });
      setTodo("");
      setAlertMsg("Task Added");
      setSeverity("success");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1200);
    }
  }

  return (
    <>
      <div className="container">
        <input
          value={todo}
          className="Input"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              let t = { value: todo, isCompleted: false };
              update(t);
            }
          }}
        />
        <Button
          className="btn"
          disableElevation
          onClick={() => {
            let t = { value: todo, isCompleted: false };
            update(t);
          }}
          variant="contained"
        >
          Add Todo
        </Button>
      </div>

      {showAlert && <DialogComponent msg={alertMsg} type={severity} />}

      <Result
        value={[todo, setTodo]}
        arr={[todoArray, setTodoArray]}
        alert={[showAlert, setAlert]}
        msg={[alertMsg, setAlertMsg]}
        type={[severity, setSeverity]}
      />
    </>
  );
}

export default InputForm;
