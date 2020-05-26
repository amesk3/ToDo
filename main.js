let localStorage = window.localStorage
let toDoList = [] //inputs are submitted as an array.

let pastToDos = localStorage.getItem("todos")
pastToDos = pastToDos ? pastToDos.replace(/[\[\]\"\"]+/g, "") : pastToDos
if (pastToDos !== null) {
  pastToDos.split(',').forEach(word => { if (word.length > 0) return toDoList.push(word) })
}

const submitButton = document.querySelector(".submitButton")
const addButton = document.querySelector(".addButton")
let inputVal = document.querySelector(".inputMain")
const container = document.querySelector(".container")

class ToDo {
  constructor(name) {
    this.createToDo(name)
    this.submitToDo()
  }
  
  remove(toDo) {
    container.removeChild(toDo) 
    localStorage.removeItem(toDo)
    let deleteIdx = toDoList.indexOf(toDo)
    toDoList.splice(deleteIdx, 1)
    localStorage.setItem("todos", JSON.stringify(toDoList))
  }
  
  complete() {

    //submit should not do anything since we don't have a backend
    console.log('To do list submission', toDoList)
  
    localStorage.clear() //clears the list since current items were submitted


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
  
  submitToDo() {
    submitButton.addEventListener("click", ()=> this.complete())
  }

}
function validation() {
     let cleanVal = inputVal.value.replace(/[\^#%&$\*:<>\?/\{\|\}]/g, "")
  if (cleanVal !== "") {
    new ToDo(cleanVal)
    toDoList.push(cleanVal)
    localStorage.setItem("todos", JSON.stringify(toDoList))
    inputVal.value = ""

  } else {
    alert("Illegal values detected. You cannot use illegal values.")
  }
 }



for (let i = 0; i < toDoList.length; i++) {
  new ToDo(toDoList[i])
}
localStorage.setItem("todos", JSON.stringify(toDoList)) //need it to work for more than 2 refreshes

addButton.addEventListener("click", validation)
submitButton.addEventListener("click", ToDo.submitToDo)