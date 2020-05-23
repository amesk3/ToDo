let localStorage = window.localStorage
let todoList = []

let pastTodos = localStorage.getItem("todos").replace(/[\[\]\"\"\,]+/g, "")
todoList = [...pastTodos]



const addButton = document.querySelector(".addButton")
let inputVal = document.querySelector(".input")
const container = document.querySelector(".container")

class Todo {
  constructor(name) {
    this.createTodo(name)
  }
  
  remove(todo) {
    container.removeChild(todo) 
    localStorage.removeItem(todo)
    let deleteIdx = todoList.indexOf(todo)
    todoList.splice(deleteIdx, 1)
    localStorage.setItem("todos", JSON.stringify(todoList))
  }

  createTodo(name) {
    let input = document.createElement("input")
    input.value = name
    input.type = "text"
    localStorage.setItem("todos", name)
    
    let deleteButton = document.createElement("button")
    deleteButton.classList.add("deleteButton")
    deleteButton.innerHTML="Delete"

    let todoItem = document.createElement("div")
    todoItem.classList.add("todo")    
    
    container.appendChild(todoItem)
    
    todoItem.appendChild(input)
    todoItem.appendChild(deleteButton)
    
    deleteButton.addEventListener("click", () => this.remove(todoItem))
    
   
  }

}
 function validation() {
     let cleanVal = inputVal.value.replace(/^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$/g, "")
   if (cleanVal !== "") {
     new Todo(cleanVal)
     todoList.push(cleanVal)
    localStorage.setItem("todos", JSON.stringify(todoList))
    inputVal.value = "" 

  }
}
let joinedToDoList = todoList.join("")
for (let i = 0; i < joinedToDoList.length; i++) {
  new Todo(joinedToDoList[i])
}

addButton.addEventListener("click", validation)