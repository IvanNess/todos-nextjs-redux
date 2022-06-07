import { StateType } from '.'
import { ActionType } from '../action-creators'
import { ITodo } from '../../types'

type Todos = {
    data: Array<ITodo>
    error: string | null
    loading: boolean
}

type UpdateTodoType = (state: any, action: ActionType) => Todos

const updateTodos: UpdateTodoType = (state: StateType, action: ActionType) => {
    if (state === undefined) {
        return {
            data: [],
            error: null,
            loading: false,
        }
    }
    switch (action.type) {
        case 'ADD_TODO':
            console.log(state.todos)
            return {
                ...state.todos,
                data: [...state.todos.data, action.todo],
                error: null,
            }

        case 'SET_TODOS':
            return {
                error: null,
                loading: false,
                data: action.todos,
            }

        case 'SET_TODOS_LOADING':
            return { ...state.todos, loading: action.loading }

        case 'SET_TODOS_ERROR':
            return { ...state.todos, error: action.message, loading: false }

        case 'ON_TOP':
            const maxPriority = state.todos.data[0].priority + 1
            let _data: Array<ITodo> = []
            state.todos.data.forEach((todo) => {
                if (todo.id === action.id) {
                    _data = [{ ...todo, priority: maxPriority }, ..._data]
                } else {
                    _data.push(todo)
                }
            })

            return { ...state.todos, data: _data, error: null }

        case 'UPDATE_TODO_NAME':
            const __data: Array<ITodo> = state.todos.data.map((todo) => {
                if (action.id === todo.id) {
                    todo.name = action.name
                }
                return todo
            })
            return { ...state.todos, data: __data, error: null }

        case 'UPDATE_TODO_IS_EDIT':
            const ___data: Array<ITodo> = state.todos.data.map((todo) => {
                if (action.id === todo.id) {
                    todo.isEdit = action.isEdit
                }
                return todo
            })
            return { ...state.todos, data: ___data, error: null }

        case 'DELETE_TODO':
            const withDelete = state.todos.data.filter(
                (item) => item.id !== action.id
            )
            return { ...state.todos, data: withDelete, error: null }

        default:
            return state.todos
    }
}

export { updateTodos }
