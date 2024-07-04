let taskInput = document.getElementById("tesk-input");
let addButton = document.getElementById("add-button");
let taps = document.querySelectorAll(".task-taps div" );
let taskList = [];
let mode ="all";
let filterList = [];
let underLine = document.getElementById("under-line");


addButton.addEventListener('click',addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
    addTask(event);
    }
    });

for(let i= 1; i < taps.length; i++){
    taps[i].addEventListener("click",function(event){
        filter(event)})
}

function addTask(){
    if(taskInput.value==''){
        alert("내용을 입력해주세요!");
        return
    }

    let task = {
        id : randomIdGenerate(),
        taskContent : taskInput.value,
        isComplete : false
    }
    taskList.push(task);
    
    taskInput.value = "";
    console.log(taskList);
    
    render();
}

function render(){
    let list = [];
    if(mode === "all"){
        list = taskList;
    } else if(mode === "ongoing" || mode === "done"){
        list = filterList;
    } 


    let resultHTML = "";
    for (let i = 0; i < list.length; i++) {
        if(list[i].isComplete==true){
            resultHTML += `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check check-icon" style="text-decoration: line-through;"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-xmark"></i></button>
        </div>
    </div>`;
        } else{
        resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-xmark"></i></button>
        </div>
    </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
    console.log(taskList)
}

function deleteTask(id){
    for(let i = 0; i < taskList.length;i++){
        if(taskList[i].id ==id){
            taskList.splice(i,1);
            
        }
    }
    filter();
    console.log(taskList)
}

function filter(event){
    
    if (event) {
        mode = event.target.id;
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top = event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
        }
    filterList = [];
    // if(mode === "all"){
    //     render();
    // } else 
    if(mode === "ongoing"){
        for(let i = 0; i<taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        // render()
    } else if(mode === "done"){
        for(let i = 0; i<taskList.length; i++){
            if(taskList[i].isComplete){
                filterList.push(taskList[i]);
            }
        }
        
    }
    render();
}

function randomIdGenerate(){
    return '_' + Math.random().toString(36).substring(2.9);
}

