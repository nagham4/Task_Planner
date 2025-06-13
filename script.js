// Edit content Alert buttons and div
let alertEdit = document.getElementById("confirmEdit");
let confirmOpreationButtonEdit = document.getElementById(
  "confirmOpreationButtonEdit"
);
let cancelOpreationButtonEdit = document.getElementById(
  "cancelOpreationButtonEdit"
);
let inputEdit = document.getElementById("alertEditContentInput");
let inputEditNote = document.getElementById("inputEditNote");

// Alert buttons and div
let alert = document.getElementById("confirmOpreation");
let confirmOpreationButton = document.getElementById("confirmOpreationButton");
let cancelOpreationButton = document.getElementById("cancelOpreationButton");

//Add new task button and input
let mainInput = document.getElementById("mainInput");
let addNewTaskButton = document.getElementById("inputButton");
let inputNote = document.getElementById("inputNote");

//Blue button Click
let allButton = document.getElementById("all");
let doneButton = document.getElementById("done");
let todoButton = document.getElementById("todo");

// Scroll container
let scrollContainerDiv = document.getElementById("scrollContainer");

// No tasks edge case header
let noTasksHeader = document.getElementById("noTasksHeader");

//Task HTML COLLECTION like an array
let taskArr = document.getElementsByClassName("task");

//Red button Click
let deleteDoneButton = document.getElementById("deleteDone");
let deleteAllButton = document.getElementById("deleteAll");

const noTasksChecker = () => {
  console.log("Inside noTasksChecker");
  let taskCount = document.getElementsByClassName("task");
  if (taskCount.length <= 0) {
    noTasksHeader.style.display = "block";
  } else {
    noTasksHeader.style.display = "";
  }
};

const removeTasksHTML = () => {
  let tasks = document.getElementsByClassName("task");
  Array.from(tasks).forEach((task) => {
    task.remove();
  });
};

const removeTasksDoneHTML = () => {
  let tasks = document.getElementsByClassName("task");
  Array.from(tasks).forEach((task) => {
    if (task.id[1] == "t") task.remove();
  });
};

const storeTaskChange = (task, index, flag) => {
  let temp = unloadTask();
  console.log("inside storeTaskChange");

  /**
   *  flag = 0 only content change to local storage
   *  flag = 1 deleting entire object from the array
   *
   *
   */

  if (temp.length > 0 && task != null) {
    switch (flag) {
      case 0:
        temp[index].taskId = task.taskId;
        temp[index].paragraphContent = task.paragraphContent;
        break;

      case 1:
        temp.splice(index, 1);
        break;
    }
    localStorage.setItem("tasks", JSON.stringify(temp));
  }
};

const storeLocal = (task) => {
  let localTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Add the new task to the array
  localTasks.push(task);

  // Save the updated task array back to localStorage
  localStorage.setItem("tasks", JSON.stringify(localTasks));
};

const saveTask = (text) => {
  mainInput.value = "";
  let task = {
    taskId: Math.floor(Math.random() * 5) + "f",
    paragraphStatus: "",
    paragraphContent: text,
  };

  displayTaskOnAddNew(task);
  noTasksChecker();
  storeLocal(task);
};

const unloadTask = () => {
  const tasks = localStorage.getItem("tasks");
  const unloadedTasks = tasks ? JSON.parse(tasks) : [];
  return unloadedTasks;
};

const checkInpt = (textTT) => {
  const check = /^(?!\d)/;

  if (textTT.length > 5 && check.test(textTT)) {
    return true;
  } else {
    return false;
  }
};
