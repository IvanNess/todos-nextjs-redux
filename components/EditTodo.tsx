import React, {
    SyntheticEvent,
    useRef,
    FC,
    Dispatch,
    SetStateAction,
    useEffect,
} from 'react'
import { EditTodoStyled } from '../styles/styled-components'
import { ITodo } from '../types'
import { useDispatch } from 'react-redux'
import { actionCreators, updateTodoName } from '../redux/action-creators'

type EditTodoPropType = {
    item: ITodo
}

const EditTodo: FC<EditTodoPropType> = ({ item }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const isEdit = item.isEdit

    const dispatch = useDispatch()

    useEffect(() => {
        if (isEdit) {
            inputRef.current?.focus()
        }
    }, [isEdit])

    const submit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!item.id) return
        if (item.name === inputRef.current!.value.trim()) {
            dispatch(
                actionCreators.updateTodoIsEdit({ id: item.id, isEdit: false })
            )
        }
        if (item.name !== inputRef.current!.value.trim()) {
            updateTodoName({
                id: item.id,
                name: inputRef.current!.value.trim(),
                dispatch,
            })
        }
    }

    const cancel = () => {
        console.log('cancel')
        if (!item.id) return
        dispatch(
            actionCreators.updateTodoIsEdit({
                id: item.id,
                isEdit: false,
            })
        )
    }

    return (
        <EditTodoStyled>
            <form onSubmit={submit}>
                <input
                    type="text"
                    name="edit"
                    ref={inputRef}
                    defaultValue={item.name}
                />
                <input type="submit" value="SAVE" />
                <input type="button" value="CANCEL" onClick={cancel} />
            </form>
        </EditTodoStyled>
    )
}

export default EditTodo
