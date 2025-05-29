document.getElementById("todo-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const taskInput = document.getElementById("task");
    const taskValue = taskInput.value.trim();
    if (taskValue === "") return;
  
    const ul = document.getElementById("lst");
  
    const li = document.createElement("li");
  
    const span = document.createElement("span");
    span.textContent = taskValue;
  
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Completed"
    completeBtn.className = "complete-btn";
    completeBtn.onclick = () => {
        span.style.textDecoration="line-through"
    };
  
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      ul.removeChild(li);
    };
  
    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
  
    ul.appendChild(li);
  
    taskInput.value = "";
  });
  