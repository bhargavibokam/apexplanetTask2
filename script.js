// Navbar toggle
const toggleBtn = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const heading = document.getElementById("heading");

toggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  heading.style.marginTop = navLinks.classList.contains("show") ? "100px" : "30px";
});

// Plan Trip: Pending Tasks
const planTripSelect = document.getElementById("planTripSelect");

planTripSelect.addEventListener("change", function () {
  const value = this.value;

  if (value === "pending") {
    const pendingTasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

    if (pendingTasks.length === 0) {
      alert("No pending tasks found.");
    } else {
      let taskMessage = "Pending Tasks:\n" + pendingTasks.map((task, i) => `${i + 1}. ${task}`).join("\n");
      alert(taskMessage);
    }

    this.value = ""; // Reset select box
  }
});

// To-Do List Logic
const addBtn = document.getElementById("add-btn");
const defaultList = document.querySelectorAll(".default-list");

function savedTasks() {
  const taskList = [];
  document.querySelectorAll("#todo-list li:not(.default-task)").forEach(li => {
    taskList.push(li.firstChild.textContent);
  });
  localStorage.setItem("todoTasks", JSON.stringify(taskList));
}

function createtask(taskText) {
  const tasks = document.getElementById("todo-list");
  const task = document.createElement("li");
  task.textContent = taskText;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("delete-btn");
  delBtn.addEventListener("click", () => {
    tasks.removeChild(task);
    savedTasks();
  });

  task.appendChild(delBtn);
  tasks.appendChild(task);
}

function addNewTask(event) {
  event.preventDefault();
  const taskInput = document.getElementById("new-task");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    createtask(taskText);
    savedTasks();
    taskInput.value = "";
  } else {
    alert("Please enter a task");
  }
}

addBtn.addEventListener("click", addNewTask);

// Handle default to-do list
defaultList.forEach(item => {
  item.addEventListener("click", () => {
    const taskText = item.textContent.trim();
    createtask(taskText);
    savedTasks();
    item.remove();

    const removedDefaults = JSON.parse(localStorage.getItem("removedDefaults")) || [];
    if (!removedDefaults.includes(taskText)) {
      removedDefaults.push(taskText);
      localStorage.setItem("removedDefaults", JSON.stringify(removedDefaults));
    }
  });
});

// Restore tasks on page load
window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
  savedTasks.forEach(taskText => {
    createtask(taskText);
  });

  const removedDefaults = JSON.parse(localStorage.getItem("removedDefaults")) || [];
  document.querySelectorAll(".default-list").forEach(item => {
    const taskText = item.textContent.trim();
    if (removedDefaults.includes(taskText)) {
      item.remove();
    }
  });
};

// Contact Form Handling
const form = document.getElementById("contact-form");
const otherTextAreaDiv = document.getElementById("other-textarea");
const otherTextArea = document.getElementById("other-subject");

subject.addEventListener("change", () => {
  if (subject.value === "other") {
    otherTextAreaDiv.style.display = "block";
    otherTextArea.setAttribute("required", "required");
  } else {
    otherTextAreaDiv.style.display = "none";
    otherTextArea.removeAttribute("required");
  }
});

const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", (event) => {
  if (!form.checkValidity()) return;

  event.preventDefault();
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("subject").value = "";
  otherTextAreaDiv.style.display = "none";
  otherTextArea.removeAttribute("required");

  alert("Thanks for reaching out! 😊\nWe'll be in touch very soon.");
});
