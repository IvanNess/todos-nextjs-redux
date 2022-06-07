import { IAuth } from "../../types"
import { ActionType } from "../action-creators"
import { StateType } from "."

type UpdateAuthType = (state: any, action: ActionType) => IAuth

export const updateAuth: UpdateAuthType = (state: StateType, action: ActionType)=>{
    if(state===undefined){
        return {status: 'HIDDEN'}
    }
    switch(action.type){
        case 'AUTH_SIGN_IN':
            return { status: 'SIGN_IN'}
        case 'AUTH_SIGN_UP':
            return { status: 'SIGN_UP'}
        case 'AUTH_HIDE':
            return { status: 'HIDDEN'}
        default: 
            return state.auth
    }
}