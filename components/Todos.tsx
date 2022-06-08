import { TodosStyled } from '../styles/styled-components'
import Todo from './todo'
import { useSelector } from 'react-redux'
import { StateType } from '../redux/reducer'

export const Todos = () => {
    const todos = useSelector((state: StateType) => state.todos.data)

    return (
        <TodosStyled>
            {todos && todos.map((todo) => <Todo item={todo} key={todo.id} />)}
        </TodosStyled>
    )
}
