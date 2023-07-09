/* 
    Complete the JavaScript file below.
    You have full control over this JavaScript file.
    You may use jQuery or stick with vanilla JavaScript. 
*/

const submitBtn = document.querySelector("#submitBtn");

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // TODO: Write the code for the `Task Creation` functionality
    // get the task name and priority from the input fields
  const taskNameInput = document.querySelector("#taskName");
  const taskPriorityInput = document.querySelector("#taskPriority");

  // validate if the task name is not blank
  if (taskNameInput.value.trim() !== "") {
    // create a new task item
    const newItem = document.createElement("div");
    newItem.classList.add("todo-item");

    // create the left-hand side of the task item
    const lhsContainer = document.createElement("div");
    lhsContainer.classList.add("todo-lhs");

    // create the priority indicator
    const priorityDiv = document.createElement("div");
    const selectedPriority = taskPriorityInput.options[taskPriorityInput.selectedIndex].value;
    priorityDiv.classList.add("todo-prio", selectedPriority);

    // create the task name
    const taskNameSpan = document.createElement("span");
    taskNameSpan.classList.add("todo-task");
    taskNameSpan.textContent = taskNameInput.value;

    // append the priority indicator and task name to the left-hand side container
    lhsContainer.appendChild(priorityDiv);
    lhsContainer.appendChild(taskNameSpan);

    // create the checkbox
    const checkboxInput = document.createElement("input");
    checkboxInput.classList.add("todo-markBtn");
    checkboxInput.type = "checkbox";

    // append the left-hand side container and checkbox to the task item
    newItem.appendChild(lhsContainer);
    newItem.appendChild(checkboxInput);

    // append the new task item to the items container
    const itemsContainer = document.querySelector("#itemsContainer");
    itemsContainer.appendChild(newItem);

    // reset the input fields
    taskNameInput.value = "";
    taskPriorityInput.selectedIndex = 0;

    // hide the error message (if visible)
    const errorMessage = document.querySelector("#error-message");
    errorMessage.style.display = "none";
  } else {
    // display error message if the task name is blank
    const errorMessage = document.querySelector("#error-message");
    errorMessage.style.display = "block";
  }
});

// TODO: Write the code for the `Toggle Mark as Done` functionality
const itemsContainer = document.querySelector("#itemsContainer");
itemsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("todo-markBtn")) {
    const taskItem = e.target.parentNode;
    const checkbox = e.target;
    const todoTask = taskItem.querySelector(".todo-task");
    
    // Toggle the 'done' class on the task item
    todoTask.classList.toggle("done");

    // Toggle the checkbox style
    checkbox.classList.toggle("marked");

    // Set the checkbox color to green when checked
    if (checkbox.checked) {
      checkbox.style.backgroundColor = "green";
    } else {
      checkbox.style.backgroundColor = "transparent";
    }
  }
});


// TODO, BONUS: Write the code for the `Sort Task by ..` functionality
const sortTodoSelect = document.querySelector("#sortTodo");
sortTodoSelect.addEventListener("change", function () {
  const sortBy = sortTodoSelect.value;

  // get all the task items
  const taskItems = Array.from(document.querySelectorAll(".todo-item"));

  // sort the task items based on the selected option
  if (sortBy === "task") {
    taskItems.sort((a, b) => {
      const taskNameA = a.querySelector(".todo-task").textContent.toLowerCase();
      const taskNameB = b.querySelector(".todo-task").textContent.toLowerCase();
      return taskNameA.localeCompare(taskNameB);
    });
  } else if (sortBy === "priority") {
    taskItems.sort((a, b) => {
      const priorityMap = { high: 1, medium: 2, low: 3 };
      const priorityA = a.querySelector(".todo-prio").classList[1];
      const priorityB = b.querySelector(".todo-prio").classList[1];
      return priorityMap[priorityA] - priorityMap[priorityB];
    });
  } else if (sortBy === "status") {
    taskItems.sort((a, b) => {
      const doneA = a.querySelector(".todo-task").classList.contains("done");
      const doneB = b.querySelector(".todo-task").classList.contains("done");
      return doneA - doneB;
    });
  }

  // reorder the task items in the container
  taskItems.forEach((item) => itemsContainer.appendChild(item));

});