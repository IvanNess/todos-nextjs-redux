import { NextApiRequest } from 'next'
import { GetTodosData } from './pages/api/gettodos'

export interface ITodo {
    name: string
    priority: number
    id?: number
    userId?: number
    isEdit: boolean
}

export interface IUser {
    username: string
    id: string
}

export interface IAuth {
    status: 'SIGN_IN' | 'SIGN_UP' | 'HIDDEN'
}

export interface NextApiRequestWithHeaders extends NextApiRequest {
    headers: any
}

export interface IAxiosError {
    response: {
        data: {
            message: string
        }
    }
}

export interface IgetUserRes {
    id: number
    username: string
    todos: ITodo[]
}

export interface IgetUserAxiosRes {
    user: IgetUserRes
}

export interface IServerControllerError {
    message: string
}

// export interface IServerController {
//     getUser: () => Promise<IgetUserRes>
//     onTop: (id: number) => Promise<void>
//     logout: () => Promise<void>
//     getTokens: () => Promise<void>
//     createTodo: ({ name }: { name: string }) => Promise<ITodo[]>
// }
