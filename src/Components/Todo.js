import React from "react";
import Title from "./Title";
import InputForm from "./InputForm";

function Todo() {
  if (!localStorage.getItem("todos")) {
    localStorage.setItem("todos", JSON.stringify([]));
  }

  return (
    <>
      <Title />
      <InputForm />
    </>
  );
}

export default Todo;
