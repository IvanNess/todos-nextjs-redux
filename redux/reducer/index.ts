import { updateTodos } from "./updateTodos"
import { ActionType } from "../action-creators"
import { updateUser } from "./updateUser"
import { updateAuth } from "./updateAuth"

const reducer = (state: any, action: ActionType)=>{
    return{
       todos: updateTodos(state, action),
       user: updateUser(state, action),
       auth: updateAuth(state, action)
    }
}

export type StateType = ReturnType<typeof reducer>

export default reducer