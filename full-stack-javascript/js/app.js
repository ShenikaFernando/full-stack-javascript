var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder  = document.getElementById("completed-tasks");

//New task list item
var createNewTaskElement = function(taskString){
  //Create list Items
  var listItem = document.createElement("li");
      
  //input (checkbox)
  var checkBox = document.createElement("input"); //type - checkbox
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input"); // type= text  
  //button.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");
  
  //Each elements needs modifing 
  
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString;
  
   listItem.appendChild(checkBox);
   listItem.appendChild(label);
   listItem.appendChild(editInput);
   listItem.appendChild(editButton);
   listItem.appendChild(deleteButton);
  
  //Each elements needsappended    
  
    return listItem;
}

//Add a new task
var addTask = function() {
  console.log("Add task...");
  //Create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  //Append list item to incompleteTaskHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  
  //Clear the value in input
  taskInput.value = "";
  
}

//Edit an existing task
var editTask = function(){
  console.log("Edit task...");
  
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");
  
  //if the class of the parent is .editMode
  if(containsClass){
    //Switch from .editMode
    //label text become the input's value
    label.innerText = editInput.value;  
  }else{
    //Switch to .editMode
    //Input value becomes the label's text
    editInput.value = label.innerText;
  }
  
  //Toggle .editMode on the list item
  listItem.classList.toggle("editMode");
}

//Delete an existing task
var deleteTask = function() {
  console.log("delete task...");
  //Remove parent list item from ul
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
  
}

//Mark a task as complete
var taskCompleted = function() {
  console.log("Add completed task...");
  //Apend the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//Mark a task as incomplete
var taskIncomplete = function() {
  console.log("Task Incomplete ...");
  //Apend the task list item to the #incompleted-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  
  //bind editTask to edit button
  editButton.onclick = editTask;
  
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  
  //bind checkboxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function() {
 console.log("AJAX request"); 
}

//set the click handler to the addTask function
//addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//Cycle over incompleteTaskHolder ul lists items
for (var i =0; i<incompleteTasksHolder.children.length; i++) {
  //bind events to the list chicldren(taskcomplete)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//Cycle over completedTaskHolder ul lists items
for (var i =0; i<completedTasksHolder.children.length; i++) {
  //bind events to the list chicldren(taskincomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}