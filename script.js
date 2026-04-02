const inputBox = document.querySelector("#input-box");
const addBtn = document.querySelector("#add-btn");
const ul = document.querySelector("ul");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    addTask();
  }
});

const savetask = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const render = () => {
  ul.innerHTML = "";

  tasks.forEach((task) => {
    let className = "";

    if (task.completed === true) {
      className = "completed";
    }
    ul.innerHTML += `
         <li>
              <span onclick="strikeThrough(${task.id})" class="${className}">${task.text}</span>
                <button  onclick="delTask(${task.id})"  class="del-btn">Delete</button>
            </li>
        `;
  });
};

const strikeThrough = (id) => {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      task.completed = !task.completed;
    }

    return task;
  });
  savetask();
  render();
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
