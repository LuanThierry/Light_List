const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

todoButton.addEventListener('click', addTexto)
todoList.addEventListener('click', removeIadd)
filterOption.addEventListener('click', filterTodo)






function addTexto(event) {
  event.preventDefault()

  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo')

  const todoLi = document.createElement('li')
  todoLi.innerText = todoInput.value
  todoLi.classList.add('todo-item')
  todoDiv.appendChild(todoLi)


  const trashButton = document.createElement('button')
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'
  trashButton.classList.add('trash-btn')
  todoDiv.appendChild(trashButton)

  const completeButton = document.createElement('button')
  completeButton.innerHTML = '<i class="fas fa-check"></i>'
  completeButton.classList.add('complet-btn')
  todoDiv.appendChild(completeButton)

  todoList.appendChild(todoDiv)
  startLocalTodos(todoInput.value)
  todoInput.value = ' '
}



function removeIadd(e) {
  const item = e.target
  const todo = item.parentElement
  if (item.classList[0] === 'trash-btn') {
    todo.classList.add('animate')
    todo.addEventListener('transitionend', () => {
      todo.remove()
    })
  }
  if (item.classList[0] === 'complet-btn') {
    todo.classList.toggle('complet')
  }
}




function filterTodo(e) {
  const todos = todoList.childNodes
  todos.forEach( (todo) => {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex'
        break;
      case 'complet':
        if (todo.classList.contains('complet')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break;
      case 'incomplet':
        if (
          todo.classList.contains('incomplet') !=
          todo.classList.contains('complet')
        ) {
          todo.style.display = 'none'
        } else {
          todo.style.display = 'flex'
        }
        break;
    }
  })
}





function startLocalTodos(todo) {

    let todos;

    if(localStorage.getItem('todos') != null) {
        todos = JSON.parse(localStorage.getItem('todos'))
    } else {
        todos = [];
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}