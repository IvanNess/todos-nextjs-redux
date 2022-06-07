import { useRef, SyntheticEvent } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../redux/action-creators'
import { TodoFormStyled } from '../styles/styled-components'

export const TodoForm = () => {
    const inputRef = useRef(null)

    const dispatch = useDispatch()

    const submit = (e: SyntheticEvent) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            todo: { value: string }
        }
        console.log('submit')
        if (target.todo.value.trim() === '') return
        addTodo({ name: target.todo.value.trim(), dispatch })
        target.todo.value = ''
    }

    return (
        <TodoFormStyled>
            <form onSubmit={submit}>
                <input ref={inputRef} name="todo" />
                <button type="submit">Add</button>
            </form>
        </TodoFormStyled>
    )
}
