//task planner

//task planner

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
const deleteDoneButton = document.querySelector("#deleteDone");
const deleteAllButton = document.querySelector("#deleteAll");

const noTasksChecker = () => {
  const hasTasks = document.querySelectorAll(".task").length > 0;
  noTasksHeader.style.display = hasTasks ? "none" : "block";
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
  const temp = unloadTask();
  if (temp.length > 0 && task) {
    if (flag === 0) Object.assign(temp[index], task);
    else if (flag === 1) temp.splice(index, 1);
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
    taskId: `${Math.floor(Math.random() * 10)}f`,
    paragraphStatus: "",
    paragraphContent: text,
  };
  displayTaskOnAddNew(task);
  noTasksChecker();
  storeLocal(task);
};

const unloadTask = () => JSON.parse(localStorage.getItem("tasks")) || [];

const checkInpt = textTT => textTT.length > 5 && isNaN(Number(textTT[0]));

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
        setTimeout(() => (inputEditNote.style.display = "none"), 3000);
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

const displayTasks = () => unloadTask().forEach(displayTaskOnAddNew);

addNewTaskButton.onclick = () => {
  const text = mainInput.value.trim();
  if (checkInpt(text)) {
    addNewTask(text);
    inputNote.style.display = "none";
  } else {
    inputNote.style.display = "block";
    setTimeout(() => (inputNote.style.display = "none"), 3000);
  }
};

const setFilter = filterType => {
  [allButton, doneButton, todoButton].forEach(btn => btn.classList.remove("hoverEffect"));
  const taskList = Array.from(document.getElementsByClassName("task"));
  switch (filterType) {
    case "all":
      allButton.classList.add("hoverEffect");
      taskList.forEach(task => (task.style.display = ""));
      break;
    case "done":
      doneButton.classList.add("hoverEffect");
      taskList.forEach(task => (task.style.display = task.id[1] === "t" ? "" : "none"));
      break;
    case "todo":
      todoButton.classList.add("hoverEffect");
      taskList.forEach(task => (task.style.display = task.id[1] === "f" ? "" : "none"));
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
  const target = event.target;
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
      const newText = flag[1];
      taskEl.querySelector("p").textContent = newText;
      tasks[taskIndex].paragraphContent = newText;
      storeTaskChange(tasks[taskIndex], taskIndex, 0);
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
