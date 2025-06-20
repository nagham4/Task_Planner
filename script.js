// Edit content Alert buttons and div

//./icons/pencil-svgrepo-com (1).svg
//./icons/trash-bin-2-svgrepo-com.svg


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

const confirmOpreationEdit = () => {
  let flag = [];
  flag[0] = "0";
  inputEdit.value = "";
  alertEdit.style.display = "flex";

  return new Promise((resolve, reject) => {
    confirmOpreationButtonEdit.addEventListener("click", () => {
      if (checkInpt(inputEdit.value)) {
        flag[0] = "1";
        flag[1] = inputEdit.value;
        alertEdit.style.display = "none";
        resolve(flag);
      } else {
        inputEditNote.style.display = "block";
        setTimeout(() => {
          inputEditNote.style.display = "none";
        }, 3000);
      }
    });

    cancelOpreationButtonEdit.addEventListener("click", () => {
      alertEdit.style.display = "none";
      resolve(flag);
    });
  });
};
const confirmOpreation = () => {
  let flag = false;
  alert.style.display = "flex";

  /*
    Here is the promise that forces the compiler to wait for input from a diffrent slower part
    of the code.

    NOTE:
    You should declare the function that will deal with promises as ASYNC function
*/

  return new Promise((resolve, reject) => {
    confirmOpreationButton.addEventListener("click", () => {
      alert.style.display = "none";
      flag = true;
      resolve(flag);
    }),
      cancelOpreationButton.addEventListener("click", () => {
        alert.style.display = "none";
        resolve((flag = false));
      });

    /* 
        setTimeout(()=>{
            alert.style.display = "none";
            reject(flag);
    
        }, 5000)
        */
  });
};

const addNewTask = (text) => {
  saveTask(text);
};

//               NOT FINISHED
const displayTaskOnAddNew = (task) => {
  let newTask = document.createElement("div");

  newTask.classList = "task";
  newTask.id = task.taskId;

  //Creating the paragraph to containt the text content
  let tempParagraph = document.createElement("p");
  tempParagraph.textContent = task.paragraphContent;

  //Creating Icondiv and content for the icon div
  let iconDiv = document.createElement("div");
  iconDiv.classList = "icons";

  let tempCheckbox = document.createElement("input");
  tempCheckbox.type = "checkbox";

  let tempImg1 = document.createElement("img");
  tempImg1.src = "./icons/pencil-svgrepo-com.svg";
  tempImg1.alt = "pencilIcon";

  let tempImg2 = document.createElement("img");
  tempImg2.src = "./icons/trash-bin-2-svgrepo-com.svg";
  tempImg2.alt = "deleteIcon";

  //Appending content to the icondiv
  iconDiv.append(tempCheckbox);
  iconDiv.append(tempImg1);
  iconDiv.append(tempImg2);

  //Appending content to the task div
  newTask.append(tempParagraph);
  newTask.append(iconDiv);

  //Appending task to task scroll container
  scrollContainerDiv.append(newTask);
};

const displayTasks = () => {
  //creating the new div
  const unloadedTasks = unloadTask();

  if (unloadedTasks.length > 0) {
    unloadedTasks.forEach((task) => {
      let newTask = document.createElement("div");

      newTask.classList = "task";
      newTask.id = task.taskId;

      //Creating the paragraph to containt the text content
      let tempParagraph = document.createElement("p");
      tempParagraph.textContent = task.paragraphContent;
      if (task.taskId[1] === "t")
        tempParagraph.classList = "taskParagraphCrossed";

      //Creating Icondiv and content for the icon div
      let iconDiv = document.createElement("div");
      iconDiv.classList = "icons";

      let tempCheckbox = document.createElement("input");
      tempCheckbox.type = "checkbox";
      if (task.taskId[1] === "t") tempCheckbox.checked = true;

      let tempImg1 = document.createElement("img");
      tempImg1.src = "./icons/pencil-svgrepo-com.svg";
      tempImg1.alt = "pencilIcon";

      let tempImg2 = document.createElement("img");
      tempImg2.src = "./icons/trash-bin-2-svgrepo-com.svg";
      tempImg2.alt = "deleteIcon";

      //Appending content to the icondiv
      iconDiv.append(tempCheckbox);
      iconDiv.append(tempImg1);
      iconDiv.append(tempImg2);

      //Appending content to the task div
      newTask.append(tempParagraph);
      newTask.append(iconDiv);

      //Appending task to task scroll container
      scrollContainerDiv.append(newTask);
    });
  }
  console.log("This is inside display tasks and these are the tasks :");
  console.log(unloadedTasks);
  //To make sure the no task note isnt shown
};
addNewTaskButton.onclick = () => {
  let text = mainInput.value;

  if (checkInpt(text)) {
    addNewTask(text);
    inputNote.style.display = "";
  } else {
    inputNote.style.display = "block";
    setTimeout(() => {
      inputNote.style.display = "";
    }, 10000);
  }
};
allButton.onclick = () => {
  /* Style*/
  allButton.classList.add("hoverEffect");
  doneButton.classList.remove("hoverEffect");
  todoButton.classList.remove("hoverEffect");

  if (taskArr.length >= 1) {
    for (let task of taskArr) {
      task.style.display = "";
    }
  }
};
doneButton.onclick = () => {
  /* Style*/
  doneButton.classList.add("hoverEffect");
  allButton.classList.remove("hoverEffect");
  todoButton.classList.remove("hoverEffect");

  if (taskArr.length >= 1) {
    for (let task of taskArr) {
      if (task.id[1] === "t") task.style.display = "";
      else task.style.display = "none";
    }
  }
};
todoButton.onclick = () => {
  /* Style*/
  todoButton.classList.add("hoverEffect");
  allButton.classList.remove("hoverEffect");
  doneButton.classList.remove("hoverEffect");

  if (taskArr.length >= 1) {
    for (let task of taskArr) {
      if (task.id[1] === "f") task.style.display = "";
      else task.style.display = "none";
    }
  }
};

/*
    I used here Async to wait for the user to input from the buttons
    as the compiler wont wait for input, either you use timeout callback (Which is hell)
    or you use promise which is the sane easier choice 

    NOTE:
    You should declare the function that will deal with promises as ASYNC function
*/
deleteDoneButton.onclick = async () => {
  const unloadedTasks = unloadTask();

  if (unloadedTasks.length >= 1) {
    let flag = await confirmOpreation();

    if (flag) {
      unloadedTasks.forEach((task, index) => {
        if (task.taskId[1] === "t") {
          storeTaskChange(task, index, 1);
        }

        removeTasksDoneHTML();
        noTasksChecker();
      });
    }
  }
};
/*aya*/
deleteAllButton.onclick = async ()=>
{
    const unloadedTasks = unloadTask();
    if(unloadedTasks.length >= 1)
    {
      let flag =await confirmOpreation();
      if(flag){
        localStorage.removeItem("tasks");
        displayTasks();
        removeTasksHTML();
        noTasksChecker();
      } 
    }
};
///////                Tasks functions 
scrollContainerDiv.addEventListener("click", async (event)=>{
   // Event for deleting task
   if(event.target.alt === "deleteIcon"){
      const taskToDelete = event.target.closest(".task");
      if(taskToDelete){
        unloadedTasks = unloadTask();
        if(unloadedTasks.length > 0){
          let foundTask = unloadedTasks.find(task => taskToDelete.id === task.taskId);
          if(foundTask){
            let foundTaskIndex = unloadedTasks.indexOf(foundTask);
            storeTaskChange(unloadedTasks[foundTaskIndex], foundTaskIndex, 1);
            taskToDelete.remove();
            noTasksChecker();
          }
        }
      }
   }

  // Event for editing task
  if(event.target.alt === "pencilIcon" ){
    let flag = await confirmOpreationEdit();
    if(flag[0] === "1"){
      const taskToEdit = event.target.closest(".task");
      const paragraphToEdit  = taskToEdit.querySelector("p");
      paragraphToEdit.textContent = flag[1];
      if(taskToEdit){
        unloadedTasks = unloadTask();
        if(unloadedTasks.length > 0){
          let foundTask = unloadedTasks.find(task => taskToEdit.id === task.taskId);
          if(foundTask){
            let foundTaskIndex = unloadedTasks.indexOf(foundTask);
             unloadedTasks[foundTaskIndex].paragraphContent = flag[1];
             storeTaskChange(unloadedTasks[foundTaskIndex], foundTaskIndex, 0);
            }
        }

      }
    }
  }
  // Event for marking task done
  if(event.target.type ==="checkbox" && (event.target.checked || !event.target.checked) ){
    const taskToDone = event.target.closest(".task");
    const paragraphToEdit  = taskToDone.querySelector("p");
    if(taskToDone){
      unloadedTasks = unloadTask();
      if(unloadedTasks.length > 0){
        let foundTask = unloadedTasks.find(task => taskToDone.id === task.taskId);
        if(foundTask){
          if(taskToDone.id[1] === 'f'){
             taskToDone.id = taskToDone.id[0] + 't' + taskToDone.id[1].slice(2);
          }
          else if (taskToDone.id[1] === 't') {
             taskToDone.id = taskToDone.id[0] + 'f' + taskToDone.id[1].slice(2);
          }
          let foundTaskIndex = unloadedTasks.indexOf(foundTask);
          unloadedTasks[foundTaskIndex].taskId = taskToDone.id;
          storeTaskChange(unloadedTasks[foundTaskIndex], foundTaskIndex, 0);
          paragraphToEdit.classList.toggle ("taskParagraphCrossed");
        }
      }
    }
  }
});
window.onload = ()=>{
  allButton.classList.add("hoverEffect");
  displayTasks();
  noTasksChecker();
}