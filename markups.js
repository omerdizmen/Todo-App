export const listElementMarkup = function(todoText, id){
    return `
    <div data-list-id="${id}" class="list-element" id="list__element_${id}">
        <div class="checkbox-container">                    
            <input type="checkbox" id="check-todo-${id}" name="check-todo" class="todo-checkbox">
            <label for="check-todo" class="todo-label"></label>
        </div>
        <div class="todo-task">
            <span class="todo-text ">${todoText}</span>
            <input type="text"  style="width: 100%;" class="hidden">
        </div>
        <div class="todo-options-container">
            ...
            <div class="todo-options hidden ">
                <button class="options-button edit hover-link">edit1</button>
                <button class="options-button delete hover-link">delete</button>
            </div>
        </div>
    </div>`
}