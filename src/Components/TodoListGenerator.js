import React, { useState } from "react";
import "../assets/css/style.css";
import { Checkbox, List, ListItem } from "@mui/material";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EditableComponent from "./EditableComponent";

function TodoListGenerator(props) {
  let [edit, setEdit] = useState(false);
  let [editIndex, setEditIndex] = useState(null);
  let [todo, setTodo] = props.value;
  let [todos, setTodoArray] = props.arr;
  let [isChecked, setIsChecked] = props.checked;
  let filter = props.isFiltered;

  let [showAlert, setAlert] = props.alert;
  let [msg, setAlertMsg] = props.msg;
  let [severity, setSeverity] = props.type;
  // console.log(alert);

  function deleteTask(index) {
    setTodoArray((v) => {
      v.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      setIsChecked((v) => {
        v.splice(index, 1);
        return [...v];
      });
      setAlertMsg("Task Deleted");
      setSeverity("error");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1200);
      return [...v];
    });
  }

  function checkTask(item, index) {
    setIsChecked((prev) => {
      const newChecked = [...prev];
      newChecked[index] = !newChecked[index];
      let t = {
        value: item.value,
        isCompleted: newChecked[index],
      };
      todos[index] = t;
      localStorage.setItem("todos", JSON.stringify(todos));
      return newChecked;
    });

    if (!item.isCompleted) {
      setAlertMsg("Task Completed");
      setSeverity("info");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1200);
    }
  }

  function generate(filter) {
    if (filter === 0 || filter === "") {
      return (
        <List className="tasks">
          {todos.map((item, index) => {
            return (
              <ListItem key={index}>
                <p className={isChecked[index] ? "dash" : ""}>{`${index + 1}) ${
                  item.value
                }`}</p>
                <div className="back">
                  <Checkbox
                    key={index}
                    checked={isChecked[index] || false}
                    color="info"
                    onClick={(e) => {
                      checkTask(item, index);
                    }}
                    disableRipple
                  ></Checkbox>
                  <EditRoundedIcon
                    onClick={() => {
                      setEdit(!edit);
                      setEditIndex(index);
                    }}
                  />
                  {editIndex === index && edit ? (
                    <EditableComponent
                      value={[edit, setEdit]}
                      todo={[todo, setTodo]}
                      task={item}
                      check={[isChecked, setIsChecked]}
                      index={[editIndex, setEditIndex]}
                      alert={[showAlert, setAlert]}
                      msg={[msg, setAlertMsg]}
                      type={[severity, setSeverity]}
                      arr={[todos, setTodoArray]}
                    />
                  ) : null}
                  <RemoveCircleOutlineRoundedIcon
                    htmlColor="red"
                    onClick={(e) => {
                      deleteTask(index);
                    }}
                  />
                </div>
              </ListItem>
            );
          })}
        </List>
      );
    } else if (filter === 1) {
      return (
        <List className="tasks">
          {todos.map((item, index) => {
            return isChecked[index] ? (
              <ListItem key={index}>
                <p className={isChecked[index] ? "dash" : ""}>{`${index + 1}) ${
                  item.value
                }`}</p>
                <div className="back">
                  <Checkbox
                    key={index}
                    checked={isChecked[index] || false}
                    color="info"
                    onClick={(e) => {
                      checkTask(item, index);
                    }}
                    disableRipple
                  ></Checkbox>
                  <EditRoundedIcon
                    onClick={() => {
                      setEdit(!edit);
                      setEditIndex(index);
                    }}
                  />
                  {editIndex === index && edit ? (
                    <EditableComponent
                      value={[edit, setEdit]}
                      todo={[todo, setTodo]}
                      task={item}
                      check={[isChecked, setIsChecked]}
                      index={[editIndex, setEditIndex]}
                      arr={[todos, setTodoArray]}
                      alert={[showAlert, setAlert]}
                      msg={[msg, setAlertMsg]}
                      type={[severity, setSeverity]}
                    />
                  ) : null}
                  <RemoveCircleOutlineRoundedIcon
                    htmlColor="red"
                    onClick={(e) => {
                      deleteTask(index);
                    }}
                  />
                </div>
              </ListItem>
            ) : null;
          })}
        </List>
      );
    } else {
      return (
        <List className="tasks">
          {todos.map((item, index) => {
            return !isChecked[index] ? (
              <ListItem key={index}>
                <p className={isChecked[index] ? "dash" : ""}>{`${index + 1}) ${
                  item.value
                }`}</p>
                <div className="back">
                  <Checkbox
                    key={index}
                    checked={isChecked[index] || false}
                    color="info"
                    onClick={(e) => {
                      checkTask(item, index);
                    }}
                    disableRipple
                  ></Checkbox>
                  <EditRoundedIcon
                    onClick={() => {
                      setEdit(!edit);
                      setEditIndex(index);
                    }}
                  />
                  {editIndex === index && edit ? (
                    <EditableComponent
                      value={[edit, setEdit]}
                      todo={[todo, setTodo]}
                      task={item}
                      check={[isChecked, setIsChecked]}
                      index={[editIndex, setEditIndex]}
                      arr={[todos, setTodoArray]}
                      alert={[showAlert, setAlert]}
                      msg={[msg, setAlertMsg]}
                      type={[severity, setSeverity]}
                    />
                  ) : null}
                  <RemoveCircleOutlineRoundedIcon
                    htmlColor="red"
                    onClick={(e) => {
                      deleteTask(index);
                    }}
                  />
                </div>
              </ListItem>
            ) : null;
          })}
        </List>
      );
    }
  }

  if (filter.value === "" || filter.value === 0) {
    return todos.length >= 1 ? (
      generate(filter.value)
    ) : (
      <>
        <h3 className="pending">No pending tasks!</h3>
      </>
    );
  } else if (filter.value === 1) {
    let newArr = todos.filter((item, index) => {
      if (!item.isCompleted) return false;
      else return true;
    });
    return newArr.length > 0 ? (
      generate(filter.value)
    ) : (
      <>
        <h3 className="pending">No Completed tasks!</h3>
      </>
    );
  } else if (filter.value === 2) {
    let newArr = todos.filter((item, index) => {
      if (item.isCompleted) return false;
      else return true;
    });
    return newArr.length > 0 ? (
      generate(filter.value)
    ) : (
      <>
        <h3 className="pending">No pending tasks!</h3>
      </>
    );
  }
}

export default TodoListGenerator;
