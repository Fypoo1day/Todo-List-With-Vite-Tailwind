import { v4 } from "uuid";
import "./style.css";

const taskForm = document.querySelector<HTMLFormElement>("#taskForm");
const taskList = document.querySelector<HTMLDivElement>("#tasksList");

interface Task {
  id: string;
  title: string;
  description: string;
}

let tasks: Task[] = [];

taskForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskForm["title"] as unknown as HTMLInputElement;
  const description = taskForm["description"] as unknown as HTMLTextAreaElement;

  tasks.push({
    title: title.value,
    description: description.value,
    id: v4(),
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks(tasks);

  taskForm.reset();
  title.focus();
});

document.addEventListener("DOMContentLoaded", () => {
  tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  renderTasks(tasks);
});

function renderTasks(tasks: Task[]) {
  taskList!.innerHTML = "";

  tasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className =
      "bg-zinc-800 mb-1 p-4 rounded-lg hover:bg-zinc-700 hover:cursor-pointer";

    const header = document.createElement("header");
    header.className = "flex justify-between";

    const title = document.createElement("span");
    title.innerText = task.title;

    const btnDelete = document.createElement("button");
    btnDelete.className = "bg-red-500 px-2 py-1 rounded-md";
    btnDelete.innerText = "Delete";

    header.append(title);

    header.append(btnDelete);

    const description = document.createElement("p");
    description.innerText = task.description;

    taskElement.append(header);
    taskElement.append(description);

    taskList?.append(taskElement);
  });
}
