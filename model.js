class Todo{
    status;
    todoText;
    id;

    constructor(id,status, todoText){
        this.id = id;
        this.status = status;
        this.todoText = todoText;
    }

}

const todoList = [];

export const createTodo = function(id, status = "p", todoText){
    todoList.push(new Todo(id, status, todoText));
}

export const deleteTodo = function(id){
    let todo;
    let index;
    for(let i = 0; i < todoList.length; i++){
        const element = todoList[i];
        if(id === element.id){
            todo = element;
            index = i;
            return;
        } 
    }    

    if(todo){
        todoList.splice(index, 1);
        console.log("removed");
    }
}

export const updateTodoStatus = function(id, status){
    
    for(let i = 0; i < todoList.length; i++){
        const element = todoList[i];
        if(id === status.id){
            element.status = status;            
            return;
        } 
    }    
}

export const updateTodoText = function(id, text){
    for(let i = 0; i < todoList.length; i++){
        const element = todoList[i];
        if(id === element.id){
            element.text = text;            
            return;
        } 
    }
}

export const getElementsByStatus = function(status){
    if(status === "a"){
        return todoList;
    }

    const data = [];

    todoList.forEach(element => {
        if(element.status === status){
            data.push(element);
        }
    });

    return data;
}