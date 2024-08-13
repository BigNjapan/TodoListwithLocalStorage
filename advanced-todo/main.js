// Wait until the page is fully loaded
// Retrieve 'todos' from local storage or initialize as an empty array
// Get references to the input field for the name and the new todo form
// Get the stored username from local storage and set it as the input field's value
// Add an event listener to save the username when the input field changes
// Add an event listener to the form to handle new todo submissions
// Display the todos on the page

window.addEventListener('load', () => {
    
    /*  localStorage.getItem('todos') tries to get the value stored under the key 'todos'.
        Since localStorage stores everything as strings, 
        JSON.parse is used to convert this string back into an array or object.
        If localStorage.getItem('todos') returns null (meaning there is no such key), 
        JSON.parse(null) would result in an error, 
        but here, the || [] part ensures that if the result is null, 
        it will instead set todos to an empty array ([]).*/
        todos = JSON.parse(localStorage.getItem('todos')) || [];
        const nameInput = document.querySelector('#name');
        const newTodoForm = document.querySelector('#new-todo-form');
    
        const username = localStorage.getItem('username') || '';
    
        nameInput.value = username;
    
        nameInput.addEventListener('change', (e) => { 
            localStorage.setItem('username', e.target.value);
        })
    
        newTodoForm.addEventListener('submit', e => {
            e.preventDefault(); //solving refresh problem and making updatable without refreshing
    
            const todo = {
                content: e.target.elements.content.value,
                category: e.target.elements.category.value,
                done: false, //default is false
                createdAt: new Date().getTime() //stores the exact time that created
            }
    
            todos.push(todo); //adding end of the array a todo item
    
            localStorage.setItem('todos', JSON.stringify(todos));
    
            // Reset the form
            e.target.reset();

            DisplayTodos();
        })


});

//defining displaytodos 

function DisplayTodos() {
    const todoList = document.querySelector('#todo-list')

    todoList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item')

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span')
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done; //?
        span.classList.add('bubble');

        if (todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }
        

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');
        //readonly = cannot change by user
        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`; //made mistake here

        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        //defining class style for done
        if (todo.done) {
            todoItem.classList.add('done');

        }

        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
            //displaying check styles based on the action
            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            DisplayTodos();
        })

        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();

            }) /* Click Event: When the edit button is clicked, it makes the input field editable and focuses on it.
            Editing: The user can then change the text inside the input.
            Blur Event: When the user clicks away from the input (loses focus), the input becomes non-editable again.
            Save Changes: The new content is saved to the todo object and updated in local storage.
            Update Display: The DisplayTodos function is called to refresh the list of to-dos         on the page to show the updated content.*/
            //input.addEventListener('blur', e => { ... }): When the input element loses focus (i.e., the user clicks outside of it or navigates away), the function inside the addEventListener is executed. The e parameter represents the event object for the blur event.
        })

        deleteButton.addEventListener('click', e => {
            todos = todos.filter(t => t != todo); //filtering specific todo from an array and creating new array without that 'todo'
            localStorage.setItem('todos', JSON.stringify(todos)); //saving new todos to localstorage with JSON
            DisplayTodos(); //displaying new version of todolist form

        })


    })
}