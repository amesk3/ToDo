let localStorage = window.localStorage
let toDoList = []

let pastToDos = localStorage.getItem("todos").replace(/[\[\]\"\"]+/g, "")
pastToDos.split(',').forEach(word => toDoList.push(word))

const addButton = document.querySelector(".addButton")
let inputVal = document.querySelector(".inputMain")
const container = document.querySelector(".container")

class ToDo {
  constructor(name) {
    this.createToDo(name)
  }
  
  remove(toDo) {
    container.removeChild(toDo) 
    localStorage.removeItem(toDo)
    let deleteIdx = toDoList.indexOf(toDo)
    toDoList.splice(deleteIdx, 1)
    localStorage.setItem("todos", JSON.stringify(toDoList))
  }

  createToDo(name) {
    let input = document.createElement("input")
    input.value = name
    input.type = "text"
    localStorage.setItem("todos", name)
    
    let deleteButton = document.createElement("button")
    deleteButton.classList.add("deleteButton")
    deleteButton.innerHTML="Delete"

    let toDoItem = document.createElement("div")
    toDoItem.classList.add("toDo")    
    
    container.appendChild(toDoItem)
    
    toDoItem.appendChild(input)
    toDoItem.appendChild(deleteButton)
    
    deleteButton.addEventListener("click", () => this.remove(toDoItem))
    
   
  }

}
 function validation() {
     let cleanVal = inputVal.value.replace(/^.*?(?=[\^#%&$\*:<>\?/\{\|\}]).*$/g, "")
   if (cleanVal !== "") {
     new ToDo(cleanVal)
     toDoList.push(cleanVal)
    localStorage.setItem("todos", JSON.stringify(toDoList))
    inputVal.value = "" 

  }
}

for (let i = 0; i < toDoList.length; i++) {
  new ToDo(toDoList[i])
}
localStorage.setItem("todos", JSON.stringify(toDoList)) //need it to work for more than 2 refreshes

addButton.addEventListener("click", validation)