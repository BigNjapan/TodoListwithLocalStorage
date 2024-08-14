# TodoList with LocalStorage

## Project Overview
This project is a to-do list application where users can:

- Add, edit, and delete to-do items.
- Mark to-do items as done.
- Filter and categorize to-do items as either "personal" or "business."
- Store the to-do list and user data (like the username) in the browser's local storage.
- Display the username at the top of the page, which can be updated by the user.

## Key Components

### HTML Structure
- The main sections include greeting, form for creating new todos, and the todo list display area.
- The form for creating new todos captures the task content and category.

### JavaScript Functionality
- **Window Load Event**: Loads the stored todos and username from local storage, and initializes the form and event listeners.
- **Event Listeners**:
  - `nameInput.addEventListener('change')`: Saves the updated username to local storage when it is changed.
  - `newTodoForm.addEventListener('submit')`: Handles the submission of new todos, adds them to the todos array, updates local storage, and resets the form.
- **DisplayTodos Function**:
  - Dynamically creates and displays todo items on the page.
  - Adds event listeners for editing and deleting todos.
  - Updates the todo status (done/not done) and reflects this change in the UI and local storage.

### Local Storage
- Used to persist the todos and username across page reloads.
- Todos are stored as an array of objects, each representing a task with attributes like `content`, `category`, `done`, and `createdAt`.

### Interactivity
- Users can edit todo content directly in the list.
- Marking a todo as done adds a visual indication (e.g., line-through text).
- Deleting a todo removes it from both the UI and local storage.

### Username Management
- The username is displayed at the top and can be changed. This change is saved to local storage and persists across sessions.

