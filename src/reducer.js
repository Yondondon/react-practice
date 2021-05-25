const initialState = {
  user: {
    isUser: false,
    username: null
  },
  todo_app: {
    todos: [],
    completed_todos: [],
    user: {
      isUser: false,
      username: ""
    }
  },
  counter: 42
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case "INCREMENT":
      return {
        ...state,
        counter: state.counter + 1
      }
    case "DECREMENT":
      return {
        ...state,
        counter: state.counter - 1
      }
    case "ADD_TODO":
      return {
        ...state,
        todo_app: {
          ...state.todo_app,
          todos: state.todo_app.todos.concat(action.payload)
        }
      };
    case "COMPLETE_TODO":
      return {
        ...state,
        todo_app: {
          ...state.todo_app,
          // todos: state.todo_app.todos.slice(0, action.payload).concat(state.todo_app.todos.slice(action.payload + 1, state.todo_app.todos.length)),
          todos: state.todo_app.todos.filter(elem => elem.id !== state.todo_app.todos[action.payload].id),
          completed_todos: state.todo_app.todos.splice(action.payload, 1).concat(state.todo_app.completed_todos)
        }
      }
    case "UNCOMPLETE_TODO":
      return {
        ...state,
        todo_app: {
          ...state.todo_app,
          todos: state.todo_app.todos.concat(state.todo_app.completed_todos.splice(action.payload, 1)),
          completed_todos: state.todo_app.completed_todos.slice(0, action.payload).concat(state.todo_app.completed_todos.slice(action.payload, state.todo_app.completed_todos.length)),
        }
      }
    case "REMOVE_TODO":
      return {
        ...state,
        todo_app: {
          ...state.todo_app,
          ...action.payload
        }
      }
    case "RENDER_TODOS_LIST":
      return {
        ...state,
        todo_app: {
          ...state.todo_app,
          todos: action.payload.todos,
          completed_todos: action.payload.completed_todos
        }
      }
    case "TODO_USER":
      return {
        ...state,
        todo_app: {
          ...state.todo_app,
          user: {
            isUser: action.payload.isUser,
            username: action.payload.username
          }
        }
      }
    case "USER_LOGIN":
      return {
        ...state,
        user: {
          isUser: action.payload.isUser,
          username: action.payload.username
        }
      }
    default:
      return state;
  }
}

export default reducer;