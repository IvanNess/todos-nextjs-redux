import { IUser, ITodo } from '../../types'
import { ActionType } from '../action-creators'
import { StateType } from '.'

type User = {
    error: String | null
    loading: boolean
    data: IUser | false | null
}

type UpdateUserType = (state: any, action: ActionType) => User

export const updateUser: UpdateUserType = (
    state: StateType,
    action: ActionType
) => {
    if (state === undefined) {
        return {
            error: null,
            loading: false,
            data: null,
        }
    }
    switch (action.type) {
        case 'SET_USER':
            return {
                error: null,
                loading: false,
                data: action.user,
            }
        case 'SET_LOADING':
            return { ...state.user, loading: action.loading }

        case 'SET_ERROR':
            return { error: action.message, loading: false, data: false }

        case 'LOGOUT':
            return { error: null, loading: false, data: false }

        case 'NO_USER':
            return { error: null, loading: false, data: false }
        default:
            return state.user
    }
}
