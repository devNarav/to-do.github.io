var takeTask = document.getElementById("input-new-task");
console.log(takeTask.value);
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("incomplete-tasks");
var completedTaskHolder = document.getElementById("completed-tasks");

//New task list fucntion for creating new task

var createNewTaskElement = function (taskString) {
  var listTask = document.createElement("li");

  //Input checkBox
  var checkBox = document.createElement("input");

  //Create a label element

  var label = document.createElement("label");

  //create a input text
  var editInput = document.createElement("input");

  // Create button.edit
  var editButton = document.createElement("button");

  // Create button.delete
  var deleteButton = document.createElement("button");

  label.innerText = taskString;

  //appending element
  checkBox.type = "checkBox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "remove";
  deleteButton.className = "delete";

  //and appending
  listTask.appendChild(checkBox);
  listTask.appendChild(label);
  listTask.appendChild(editInput);
  listTask.appendChild(editButton);
  listTask.appendChild(deleteButton);
  return listTask;
};

var addTask = function () {
  console.log("Add Task");

  //create a new list item with the test from the #new-task;
  var listTask = createNewTaskElement(takeTask.value);

  //Append listTask to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listTask);
  bindTaskEvents(listTask, taskCompleted);

  takeTask.value = "";
};

//Edit an existing task.

var editTask = function () {
  console.log("Edit Task");
  console.log("change 'edit' to 'save'");

  var listTask = this.parentNode;

  var editInput = listTask.querySelector("input[type=text]");
  var label = listTask.querySelector("label");
  var containsClass = listTask.classList.contains("editMode");
  //if class of the parent is .editMode
  if (containsClass) {
    //switch to .editMode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    console.log(editInput.value);
  } else {
    editInput.value = label.innerText;
    console.log(label.innerText);
  }
  // to toggle editmode for parent element
  listTask.classList.toggle("editMode");
};

// for Delete task

var deleteTask = function () {
  console.log("Delete Task...");

  // Append the task list item to the #completed-tasks
  var listTask = this.parentNode;
  var ul = listTask.parentNode;
  ul.removeChild(listTask);
  // completeTaskHolder.appendChild(listTask);
  // bindTaskEvents(listTask, taskIncomplete);
};

var taskCompleted = function () {
  console.log("Complete Task...");

  var listTask = this.parentNode;
  completedTaskHolder.appendChild(listTask);
  bindTaskEvents(listTask, taskIncomplete);
};

var taskIncomplete = function () {
  console.log("Incomplete Task...");

  //Mark task as incomplete.
  //when the checkBox is unchecked
  //Append the task list item to the #incomplete-task.

  var listTask = this.parentNode;
  incompleteTaskHolder.appendChild(listTask);
  bindTaskEvents(listTask, taskCompleted);
};
var myrequest = function () {
  console.log("Myrequest to hold all event");
};

// to hold everything together

// add click eventlistener handler to the add task button.

// addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", myrequest);

var bindTaskEvents = function (listTaskitm, checkBoxEventHandler) {
  console.log("bind list item events");

  // select tasklist children
  var checkBox = listTaskitm.querySelector("input[type=checkBox]");
  var editButton = listTaskitm.querySelector("button.edit");
  var deleteButton = listTaskitm.querySelector("button.delete");

  //Bind  to edit task to edit button
  editButton.onclick = editTask;

  // bind deletetask to delete button.
  deleteButton.onclick = deleteTask;

  //bind taskimcompleted to checkBoxeventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

//make cycle over imcompleteTaskholder task list items
// for each task list

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//make cycle over completeTaskholder task list items
for (var i = 0; i < completedTaskHolder.children.length; i++) {
  bindTaskEvents(completedTaskHolder.children[i], taskIncomplete);
}
