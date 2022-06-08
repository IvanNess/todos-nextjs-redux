import { ITodo } from '../types'
import { TodoStyled } from '../styles/styled-components'
import {
    onTop,
    logout,
    actionCreators,
    deleteTodo,
} from '../redux/action-creators'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import EditTodo from './EditTodo'
import { StateType } from '../redux/reducer'
import { Modal } from 'antd'

const Todo: React.FC<{ item: ITodo }> = ({ item }) => {
    const dispatch = useDispatch()

    const isEdit = item.isEdit

    const [showModal, setShowModal] = useState<boolean>(false)

    const onTopClicked = () => {
        console.log({ id: item.id })
        onTop({ id: item.id, dispatch })
    }

    const editClicked = () => {
        if (item.id) {
            dispatch(
                actionCreators.updateTodoIsEdit({ id: item.id, isEdit: true })
            )
        }
    }

    const deleteClicked = () => {
        setShowModal(true)
    }

    const onOk = () => {
        setShowModal(false)
        if (item.id) deleteTodo({ dispatch, id: item.id })
    }

    const onCancel = () => {
        setShowModal(false)
    }

    return (
        <TodoStyled>
            {!isEdit && <div className="todo-name">{item.name}</div>}
            {isEdit && <EditTodo item={item} />}
            {/* <p>{item.priority + ''}</p> */}
            {!isEdit && <button onClick={() => onTopClicked()}>ON TOP</button>}
            {!isEdit && <button onClick={() => editClicked()}>EDIT</button>}
            {!isEdit && (
                <button className="delete-btn" onClick={() => deleteClicked()}>
                    Delete
                </button>
            )}
            <Modal
                title="Warning"
                visible={showModal}
                onOk={onOk}
                onCancel={onCancel}
            >
                <p>Do you really want to delete this item?</p>
            </Modal>
        </TodoStyled>
    )
}

export default Todo
