import { ITodo, IUser, IAuth } from '../types'
import { Dispatch } from 'redux'
import axios, { AxiosResponse } from 'axios'
import { GetTodosData } from '../pages/api/gettodos'
import { withTokensCheck } from '../utilities'
import { ServerController } from '../server-controller'

type AddTodoType = { name: string; dispatch: Dispatch }
type OnTopType = { id: number | undefined; dispatch: Dispatch }
type UpdateTodoNameType = { id: number; name: string; dispatch: Dispatch }
type ToggleAuthType = { status: IAuth['status']; dispatch: Dispatch }
type LogoutType = { dispatch: Dispatch }

export const actionCreators = {
    addTodo: (name: string) => {
        const todo = { name, priority: 0, isEdit: false }
        return { type: 'ADD_TODO', todo } as const
    },
    setTodos: (todos: ITodo[]) => ({ type: 'SET_TODOS', todos } as const),
    setTodosError: (message = 'Error in fetching todos') =>
        ({ type: 'SET_TODOS_ERROR', message } as const),
    setTodosLoading: (loading: boolean) =>
        ({ type: 'SET_TODOS_LOADING', loading } as const),
    setError: (message = 'Some error occured') =>
        ({ type: 'SET_ERROR', message } as const),
    setLoading: (loading: boolean) =>
        ({ type: 'SET_LOADING', loading } as const),
    onTop: (id: number) => ({ type: 'ON_TOP', id } as const),
    setUser: (user: IUser | false) => ({ type: 'SET_USER', user } as const),
    signin: () => ({ type: 'AUTH_SIGN_IN' } as const),
    signup: () => ({ type: 'AUTH_SIGN_UP' } as const),
    hideAuth: () => ({ type: 'AUTH_HIDE' } as const),
    logout: () => ({ type: 'LOGOUT' } as const),
    updateTodoName: ({ id, name }: { id: number; name: string }) =>
        ({ type: 'UPDATE_TODO_NAME', name, id } as const),
    updateTodoIsEdit: ({ id, isEdit }: { id: number; isEdit: boolean }) =>
        ({ type: 'UPDATE_TODO_IS_EDIT', isEdit, id } as const),
    deleteTodo: (id: number) => ({ type: 'DELETE_TODO', id } as const),
    noUser: () => ({ type: 'NO_USER' } as const),
}

export const logout = async ({ dispatch }: LogoutType) => {
    dispatch(actionCreators.setLoading(true))
    withTokensCheck({
        cb: async () => {
            await ServerController.logout()
            dispatch(actionCreators.setLoading(false))
            dispatch(actionCreators.setTodos([]))
            dispatch(actionCreators.setUser(false))
        },
        err: (error) => {
            dispatch(actionCreators.setError('unsuccessful logout'))
        },
    })
}

export const toggleAuth = async ({ status, dispatch }: ToggleAuthType) => {
    if (status === 'SIGN_IN') dispatch(actionCreators.signup())
    else {
        dispatch(actionCreators.signin())
    }
}

export const onTop = async ({ id, dispatch }: OnTopType) => {
    console.log({ id })
    if (!id) return
    dispatch(actionCreators.setTodosLoading(true))
    dispatch(actionCreators.onTop(id))
    withTokensCheck({
        cb: async () => {
            await ServerController.onTop(id)
            dispatch(actionCreators.setTodosLoading(false))
        },
        err: (error) => {
            dispatch(actionCreators.setTodosError('on top todo error.'))
        },
    })
}

export const updateTodoName = async ({
    id,
    name,
    dispatch,
}: UpdateTodoNameType) => {
    dispatch(actionCreators.setTodosLoading(true))
    withTokensCheck({
        cb: async () => {
            await ServerController.updateTodoName({ id, name })
            dispatch(actionCreators.updateTodoName({ id, name }))
            dispatch(actionCreators.updateTodoIsEdit({ id, isEdit: false }))
            dispatch(actionCreators.setTodosLoading(false))
        },
        err: (error) => {
            dispatch(actionCreators.setTodosError('Updating name error.'))
            dispatch(actionCreators.updateTodoIsEdit({ id, isEdit: false }))
        },
    })
}

export const addTodo = async ({ name, dispatch }: AddTodoType) => {
    dispatch(actionCreators.addTodo(name))
    dispatch(actionCreators.setTodosLoading(true))

    withTokensCheck({
        cb: async () => {
            const todos: ITodo[] = await ServerController.createTodo({
                name,
            })
            dispatch(actionCreators.setTodos(todos))
            dispatch(actionCreators.setTodosLoading(false))
        },
        err: (error) => {
            dispatch(actionCreators.setTodosError('Adding todo error.'))
        },
    })
}

export const deleteTodo = async ({
    id,
    dispatch,
}: {
    id: number
    dispatch: Dispatch
}) => {
    dispatch(actionCreators.deleteTodo(id))
    dispatch(actionCreators.setTodosLoading(true))

    withTokensCheck({
        cb: async () => {
            await ServerController.deleteTodo(id)
            dispatch(actionCreators.setTodosLoading(false))
        },
        err: (error) => {
            dispatch(actionCreators.setTodosError('Deleteing todo error.'))
        },
    })
}

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never

type ActionCreatorsType = typeof actionCreators

type PropertiesTypeACT = PropertiesType<ActionCreatorsType>

export type ActionType = ReturnType<PropertiesTypeACT>
