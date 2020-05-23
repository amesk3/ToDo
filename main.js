const addButton = document.querySelector('.addButton')
let inputVal = document.querySelector('.input')
const container = document.querySelector('.container')

class Todo {
  constructor(name) {
    this.createTodo(name)
  }
  
  remove(todo) {
    container.removeChild(todo) 
  }

  createTodo(name) {
    let todoContainer = document.createElement('div')
    todoContainer.classList.add('todo')
    
    let input = document.createElement('input')
    input.value = name
    input.type = "text"
    inputVal.value = ""  //refreshes the input bar after a todo has been created
    
    let deleteButton = document.createElement('button')
    deleteButton.classList.add('deleteButton')
    deleteButton.innerHTML="Delete"

    let todoItem = document.createElement('div')
    todoItem.classList.add('todo')    
    
    container.appendChild(todoItem)
    
    todoItem.appendChild(input)
    todoItem.appendChild(deleteButton)
    
    deleteButton.addEventListener('click', () => this.remove(todoItem))
   
  }

}

function validation() {
  if (inputVal.value !== '') {
    new Todo(inputVal.value)
  }
}

addButton.addEventListener('click', validation)