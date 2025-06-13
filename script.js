// Edit content Alert buttons and div
let alertEdit = document.getElementById("confirmEdit");
let confirmOpreationButtonEdit = document.getElementById("confirmOpreationButtonEdit");
let cancelOpreationButtonEdit = document.getElementById("cancelOpreationButtonEdit");
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
let deleteDoneButton = document.getElementById("deleteDone")
let deleteAllButton = document.getElementById("deleteAll")

const noTasksChecker = ()=>{
    console.log("Inside noTasksChecker");
    let taskCount = document.getElementsByClassName("task");
    if(taskCount.length <= 0){
        noTasksHeader.style.display = "block";
    }
    else{
        noTasksHeader.style.display = "";
    }

}

const removeTasksHTML = ()=>{
    let tasks = document.getElementsByClassName("task");
    Array.from(tasks).forEach(task =>{
        task.remove();
    })


}

const removeTasksDoneHTML = ()=>{
    let tasks = document.getElementsByClassName("task");
    Array.from(tasks).forEach(task =>{
        if(task.id[1] == 't')
            task.remove();
    })


}