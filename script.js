import { listElementMarkup } from "./markups";
import * as model from "./model";

const todoList = document.querySelector(".todo-list");
const addNewTask = document.getElementById("todo");

const statusAll = document.getElementById("All-Todo");
const statusPending = document.getElementById("Pending-Todo");
const statusCompleted = document.getElementById("Completed-Todo");

let lastOpenedOptions;
let id = 3;

const addCheckedEvent = function(e){
    const listElement = e.target.closest(".list-element");
    
    if(listElement === null){
        return;
    }
    
    const checkButton = listElement.querySelector("input");
    const todoTask = listElement.querySelector(".todo-task");
    const id = listElement.dataset.listId;

    if(e.target === checkButton){
        if(checkButton.checked){
            todoTask.style.textDecorationLine = "line-through";
            model.updateTodoStatus(id, "c");
        }
        else{
            todoTask.style.textDecorationLine = "none";
            model.updateTodoStatus(id, "p");
        }
    }
}

const addEditEvent = function(e){
    const edit = e.target.closest(".edit");
    
    if(edit === null){
        return;
    }

    const listElement = edit.closest(".list-element");
    const todoTask = listElement.querySelector(".todo-task");
    const textValue = todoTask.querySelector(".todo-text");
    const taskInput = todoTask.querySelector("input");

    textValue.classList.add("hidden");
    taskInput.classList.remove("hidden");

    taskInput.addEventListener("keyup", addSubmitOnEnterEvent);
}

const addDeleteEvent = function(e){
    const edit = e.target.closest(".delete");

    if(edit === null){
        return;
    }

    const listElement = edit.closest(".list-element");    
    listElement.remove();
}

const addSubmitOnEnterEvent = function(e){                
    const textValue = this.parentNode.querySelector(".todo-text");
    const listElement = this.closest(".list-element");
    const id = listElement.dataset.listId;
    
    if(e.key === "Enter"){
        textValue.innerHTML = this.value;
        model.updateTodoText(id, this.value);
        this.value = "";
        
        textValue.classList.remove("hidden");
        this.classList.add("hidden");
        this.removeEventListener("keyup", addSubmitOnEnterEvent);
    }
    else if(e.key === "Escape"){           
        this.value = ""; 
        textValue.classList.remove("hidden");
        this.classList.add("hidden");
        this.removeEventListener("keyup", addSubmitOnEnterEvent);
    }
}

const addOpenOptionsMenuEvent = function(e){    
    const options = e.target.closest(".todo-options-container");

    if(options === null) return;
    const optionsMenu =  e.target.querySelector(".todo-options");
    
    if(optionsMenu){
        optionsMenu.classList.toggle("hidden");
    }    
}

const main = document.querySelector("#main");

document.addEventListener("click", function(e){
    if(main.contains(e.target)){
        return;
    }
});

const addCloseOutsideClickEvent = function(e){
    const closestOptions = e.target.closest(".todo-options-container");

    if(closestOptions){
        if(lastOpenedOptions){
            if(lastOpenedOptions !== closestOptions){
                const todoTask = lastOpenedOptions.closest(".list-element").querySelector(".todo-task");

                const todoInput = todoTask.querySelector("input");
                todoInput.classList.add("hidden");
                todoInput.removeEventListener("keyup", addSubmitOnEnterEvent);

                todoTask.querySelector(".todo-text").classList.remove("hidden");
                lastOpenedOptions.querySelector(".todo-options").classList.add("hidden");
            }                
        }
    }
    else{
        
        if(lastOpenedOptions){
            if(e.target !== lastOpenedOptions.closest(".list-element").querySelector(".todo-task").querySelector("input")){
                const todoTask = lastOpenedOptions.closest(".list-element").querySelector(".todo-task");

                const todoInput = todoTask.querySelector("input");
                todoInput.classList.add("hidden");
                todoInput.removeEventListener("keyup", addSubmitOnEnterEvent);

                todoTask.querySelector(".todo-text").classList.remove("hidden");
            }
            lastOpenedOptions.querySelector(".todo-options").classList.add("hidden");
        }        
    }

    if(closestOptions){
        lastOpenedOptions = closestOptions;
    }
}

const addTodoEvent = function(e){
    if(e.key === "Enter"){        
        const markup = listElementMarkup(this.value, id);

        model.createTodo(id,"p", this.value);
        incrementId();
        todoList.insertAdjacentHTML("afterbegin", markup);
        this.value = "";
    }
}

const incrementId = function(){
    id++;
}

const showAllTodoEvent = function(e){
    
    todoList.innerHTML = "";

    const data = model.getElementsByStatus("a");
    const markup = data.map(element => listElementMarkup(element.todoText, element.id)).join("");
    console.log( data.map(element => listElementMarkup(element.todoText, element.id)));
    todoList.insertAdjacentHTML("afterbegin", markup);
}

const showPendingTodoEvent = function(e){
    const data = model.getElementsByStatus("p");
    const markup = data.map(element => listElementMarkup(element.todoText, element.id)).join("");
    console.log( data.map(element => listElementMarkup(element.todoText, element.id)));
    todoList.insertAdjacentHTML("afterbegin", markup);
}

const showCompletedTodoEvent = function(e){
    const data = model.getElementsByStatus("c");
    const markup = data.map(element => listElementMarkup(element.todoText, element.id)).join("");
    console.log( data.map(element => listElementMarkup(element.todoText, element.id)));
    todoList.insertAdjacentHTML("afterbegin", markup);
}

document.addEventListener("click", addCloseOutsideClickEvent);
todoList.addEventListener("click", addCheckedEvent);
todoList.addEventListener("click", addEditEvent);
todoList.addEventListener("click", addDeleteEvent);
todoList.addEventListener("click", addOpenOptionsMenuEvent);
statusAll.addEventListener("click", showAllTodoEvent);
statusPending.addEventListener("click", showPendingTodoEvent);
statusCompleted.addEventListener("click", showCompletedTodoEvent);
addNewTask.addEventListener("keydown", addTodoEvent);