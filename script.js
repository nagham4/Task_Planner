// تم التعديل لتضمين مفاهيم DOM والـ ES6 الحديثة بناءً على الروابط المرسلة

// استخدام const و let بدلاً من var
const alertEdit = document.getElementById("confirmEdit");
const confirmOpreationButtonEdit = document.getElementById("confirmOpreationButtonEdit");
const cancelOpreationButtonEdit = document.getElementById("cancelOpreationButtonEdit");
const inputEdit = document.getElementById("alertEditContentInput");
const inputEditNote = document.getElementById("inputEditNote");

const alert = document.getElementById("confirmOpreation");
const confirmOpreationButton = document.getElementById("confirmOpreationButton");
const cancelOpreationButton = document.getElementById("cancelOpreationButton");

const mainInput = document.querySelector("#mainInput");
const addNewTaskButton = document.querySelector("#inputButton");
const inputNote = document.querySelector("#inputNote");

const allButton = document.querySelector("#all");
const doneButton = document.querySelector("#done");
const todoButton = document.querySelector("#todo");

const scrollContainerDiv = document.querySelector("#scrollContainer");
const noTasksHeader = document.querySelector("#noTasksHeader");
const taskArr = document.getElementsByClassName("task");

const deleteDoneButton = document.querySelector("#deleteDone");
const deleteAllButton = document.querySelector("#deleteAll");

const noTasksChecker = () => {
  noTasksHeader.style.display = document.querySelectorAll(".task").length ? "none" : "block";
};

const removeTasksHTML = () => {
  document.querySelectorAll(".task").forEach(task => task.remove());
};

const removeTasksDoneHTML = () => {
  document.querySelectorAll(".task").forEach(task => {
    if (task.id[1] === "t") task.remove();
  });
};

const storeTaskChange = (task, index, flag) => {
  let temp = unloadTask();
  if (temp.length > 0 && task) {
    switch (flag) {
      case 0:
        Object.assign(temp[index], task);
        break;
      case 1:
        temp.splice(index, 1);
        break;
    }
    localStorage.setItem("tasks", JSON.stringify(temp));
  }
};

const storeLocal = task => {
  const localTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  localTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(localTasks));
};

const saveTask = text => {
  mainInput.value = "";

  const task = {
    taskId: `${Math.floor(Math.random() * 5)}f`,

  let task = {
    taskId: Math.floor(Math.random() * 10) + "f",
    paragraphStatus: "",
    paragraphContent: text,
  };
  displayTaskOnAddNew(task);
  noTasksChecker();
  storeLocal(task);
};

const unloadTask = () => JSON.parse(localStorage.getItem("tasks")) || [];

const checkInpt = textTT => textTT.length > 5 && /^(?!\d)/.test(textTT);

const confirmOpreationEdit = () => {
  let flag = ["0"];
  inputEdit.value = "";
  alertEdit.style.display = "flex";
  return new Promise(resolve => {
    const handleConfirm = () => {
      if (checkInpt(inputEdit.value.trim())) {
        flag = ["1", inputEdit.value.trim()];
        alertEdit.style.display = "none";
        resolve(flag);
      } else {
        inputEditNote.style.display = "block";
        setTimeout(() => inputEditNote.style.display = "none", 3000);
      }
    };
    confirmOpreationButtonEdit.onclick = handleConfirm;
    cancelOpreationButtonEdit.onclick = () => {
      alertEdit.style.display = "none";
      resolve(flag);
    };
  });
};

const confirmOpreation = () => {
  alert.style.display = "flex";
  return new Promise(resolve => {
    confirmOpreationButton.onclick = () => {
      alert.style.display = "none";
      resolve(true);
    };
    cancelOpreationButton.onclick = () => {
      alert.style.display = "none";
      resolve(false);
    };
  });
};

const addNewTask = text => saveTask(text);

const createIconButton = (src, alt) => {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  return img;
};

const displayTaskOnAddNew = task => {
  const newTask = document.createElement("div");
  newTask.classList.add("task");
  newTask.id = task.taskId;

  const tempParagraph = document.createElement("p");
  tempParagraph.textContent = task.paragraphContent;

  const iconDiv = document.createElement("div");
  iconDiv.classList.add("icons");

  const tempCheckbox = document.createElement("input");
  tempCheckbox.type = "checkbox";

  const tempImg1 = createIconButton("./icons/pencil-svgrepo-com.svg", "pencilIcon");
  const tempImg2 = createIconButton("./icons/trash-bin-2-svgrepo-com.svg", "deleteIcon");

  [tempCheckbox, tempImg1, tempImg2].forEach(icon => iconDiv.append(icon));
  [tempParagraph, iconDiv].forEach(el => newTask.append(el));

  scrollContainerDiv.append(newTask);
};

const displayTasks = () => {
  unloadTask().forEach(task => displayTaskOnAddNew(task));
};

addNewTaskButton.onclick = () => {
  const text = mainInput.value.trim();
  if (checkInpt(text)) {
    addNewTask(text);
    inputNote.style.display = "none";
  } else {
    inputNote.style.display = "block";
    setTimeout(() => inputNote.style.display = "none", 3000);
  }
};

const setFilter = (filterType) => {
  [allButton, doneButton, todoButton].forEach(btn => btn.classList.remove("hoverEffect"));
  const taskList = Array.from(taskArr);
  switch (filterType) {
    case "all":
      allButton.classList.add("hoverEffect");
      taskList.forEach(task => task.style.display = "");
      break;
    case "done":
      doneButton.classList.add("hoverEffect");
      taskList.forEach(task => task.style.display = task.id[1] === "t" ? "" : "none");
      break;
    case "todo":
      todoButton.classList.add("hoverEffect");
      taskList.forEach(task => task.style.display = task.id[1] === "f" ? "" : "none");
      break;
  }
};

allButton.onclick = () => setFilter("all");
doneButton.onclick = () => setFilter("done");
todoButton.onclick = () => setFilter("todo");

deleteDoneButton.onclick = async () => {
  const unloadedTasks = unloadTask();
  if (unloadedTasks.length) {
    const flag = await confirmOpreation();
    if (flag) {
      const remaining = unloadedTasks.filter(({ taskId }) => taskId[1] !== "t");
      localStorage.setItem("tasks", JSON.stringify(remaining));
      removeTasksDoneHTML();
      noTasksChecker();
    }
  }
};

deleteAllButton.onclick = async () => {
  const unloadedTasks = unloadTask();
  if (unloadedTasks.length) {
    const flag = await confirmOpreation();
    if (flag) {
      localStorage.removeItem("tasks");
      removeTasksHTML();
      noTasksChecker();
    }
  }
};


scrollContainerDiv.addEventListener("click", async event => {
  const { target } = event;
  if (!target.closest(".task")) return;
  const taskEl = target.closest(".task");
  const taskId = taskEl.id;
  let tasks = unloadTask();
  const taskIndex = tasks.findIndex(task => task.taskId === taskId);
  if (target.alt === "deleteIcon") {
    storeTaskChange(tasks[taskIndex], taskIndex, 1);
    taskEl.remove();
    noTasksChecker();
  } else if (target.alt === "pencilIcon") {
    const flag = await confirmOpreationEdit();
    if (flag[0] === "1") {
      taskEl.querySelector("p").textContent = flag[1];
      tasks[taskIndex].paragraphContent = flag[1];
      storeTaskChange(tasks[taskIndex], taskIndex, 0);
 
scrollContainerDiv.addEventListener("click", async (event)=>{
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
  } else if (target.type === "checkbox") {
    const p = taskEl.querySelector("p");
    taskEl.id = taskEl.id[0] + (taskEl.id[1] === "f" ? "t" : "f") + taskEl.id.slice(2);
    tasks[taskIndex].taskId = taskEl.id;
    p.classList.toggle("taskParagraphCrossed");
    storeTaskChange(tasks[taskIndex], taskIndex, 0);
  }
});

window.onload = () => {
  allButton.classList.add("hoverEffect");
  displayTasks();
  noTasksChecker();

};
}
