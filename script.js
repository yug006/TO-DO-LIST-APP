const inputBox = document.querySelector("#input-box");
const addBtn = document.querySelector("#add-btn");
const ul = document.querySelector("ul");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const savetask = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const render = () => {
  ul.innerHTML = "";

  tasks.forEach((task) => {
    ul.innerHTML += `
         <li>
                <span>${task.text}</span>
                <button  onclick="delTask(${task.id})"  class="del-btn">Delete</button>
            </li>
        `;
  });
};

const delTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  savetask();
  render();
};

const addTask = () => {
  let text = inputBox.value.trim();

  if (text === "") return;

  tasks.push({
    id: Date.now(),
    text: text,
    completed: false,
  });

  inputBox.value = "";
  savetask();
  render();
};

addBtn.addEventListener("click", addTask);
render();
