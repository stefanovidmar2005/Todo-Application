"use strict";
// SELECTIONS
// Todo alert message
const alertMessage = document.querySelector(".main__content-alert");
// todos list
const todoList = document.querySelector(".main__content-todos");
// Todo Add Button
const todoAdd = document.querySelector(".input__form-button");
// Todo Delete All Button
const deleteAllTodos = document.querySelector(".main__content-delete-button");

// Todo Text Box

const todoInputField = document.querySelector(".input__form-text");

// Generates a random Id for each todo so we can delete it and edit it

function getRandomId() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

// Array to keep track of all todos
let todos = [];
let targetTodo;

// Init Function to reset the container of todos to be empty so we can generate new ones && remove alert Messages
const init = function () {
  alertMessage.innerHTML = "";
  todoList.innerHTML = "";
};
init();

// setting a timeout on the alert Message

const alertMessageTimeout = function () {
  setTimeout(() => {
    alertMessage.textContent = "";
  }, 2000);
};

// Displaying Todo when user clicks on the plus symbol
const displayTodo = () => {
  // Edit Functionality

  //     1. when the user clicks on the checkbox the todo should be changed to the new value the user inputted & the todo array should also be updated with the new value
  if (todoAdd.innerHTML === "✅" && todoInputField.value !== "") {
    todos.forEach((todo) => {
      let td = targetTodo.querySelector("p").textContent;
      let todoDescription = todo.innerHTML;
      const newStr = todoDescription.replace(td, todoInputField.value);
      targetTodo.querySelector("p").innerHTML = todoInputField.value;
      todoInputField.blur();
      todoAdd.innerHTML = "+";
      alertMessage.innerHTML = "Your Todo Has Been Edited!";
      alertMessageTimeout();
      if (alertMessage.classList.contains("error")) {
        alertMessage.classList.remove("error");
      }
      alertMessage.classList.add("success");
    });
    todoInputField.value = "";
  } else if (todoInputField.value === "") {
    alertMessage.textContent = "Todo Cannot Be Blank!";
    alertMessageTimeout();
    alertMessage.classList.add("error");
  } else {
    // TODO add an interval that display's this message for only one second
    alertMessage.textContent = "Todo Successfully Added!";
    alertMessageTimeout();
    if (alertMessage.classList.contains("error")) {
      alertMessage.classList.remove("error");
    }
    alertMessage.classList.add("success");
    todoList.insertAdjacentHTML(
      "afterbegin",
      ` <li class="main__content-todos-item">
<p class="main__content-todos-item-value">${todoInputField.value.trim()}</p>
<div class="main__content-todos-item-buttons">
<button class="edit">Edit</button>
<button class="delete">Delete</button>
</div>
</li>`
    );
    const listItems = document.querySelectorAll(".main__content-todos > li");
    const listItem = document.querySelector(".main__content-todos-item");
    listItems.forEach((list) => (list.dataset.id = getRandomId()));
    todos.push(listItem);
    todoInputField.value = "";
  }
};
todoAdd.addEventListener("click", () => {
  displayTodo();
});

// Delete All Todos Functionality
deleteAllTodos.addEventListener("click", function (e) {
  e.preventDefault();
  if (todos.length > 0) {
    if (alertMessage.classList.contains("error")) {
      alertMessage.classList.remove("error");
    }
    alertMessage.textContent = "All Todos Removed";
    alertMessageTimeout();
    alertMessage.classList.add("success");
    todos = [];
    todoList.innerHTML = "";
  } else {
    if (alertMessage.classList.contains("success")) {
      alertMessage.classList.remove("success");
    }

    alertMessage.textContent = "There Are No Todos To Clear";
    alertMessageTimeout();
    alertMessage.classList.add("error");
  }
});

// delete only on the todo clicked on to delete

// event Delegation

todoList.addEventListener("click", function (e) {
  // Delete Individual Todo Functionality
  if (e.target.classList.contains("delete")) {
    // Element value for the lookup inside the array
    const target = e.target.parentElement.parentElement.querySelector(
      ".main__content-todos-item-value"
    ).textContent;

    // todoList.forEach((todo) => (todo.dataset.id = getRandomId()));
    const targetEl = e.target.parentElement.parentElement;
    // All List Items within the Unordered List
    const listItems = [...targetEl.parentElement.querySelectorAll("li")];

    const filteredTodos = listItems.filter(
      (list) => list.dataset.id !== targetEl.dataset.id
    );
    todos = filteredTodos;
    targetEl.remove();
  }
  // Edit Todo Functionality
  if (e.target.classList.contains("edit")) {
    targetTodo = e.target.parentElement.parentElement;
    todoAdd.innerHTML = "✅";
    todoInputField.value = targetTodo.querySelector("p").textContent;
  } else return;
});
