const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const quoteBox = document.getElementById('quote');

let tasks = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const task = input.value.trim();
  if (task === "") {
    alert("Task cannot be empty!");
    return;
  }
  tasks.push(task);
  renderTasks();
  input.value = "";
});

function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;
    li.addEventListener('click', () => {
      li.classList.toggle('completed');
    });

    const delBtn = document.createElement('button');
    delBtn.textContent = "❌";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
    };
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// Fetch quote from API
fetch('https://api.quotable.io/random?tags=productivity|inspirational')
  .then(res => res.json())
  .then(data => {
    quoteBox.textContent = `"${data.content}" — ${data.author}`;
  })
  .catch(() => {
    quoteBox.textContent = "Stay focused. Crush your goals.";
  });
