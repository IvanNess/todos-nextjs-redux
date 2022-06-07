import { NextPage } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators, logout } from '../redux/action-creators'
import { StateType } from '../redux/reducer'
import Auth from '../components/auth'
import { useFetchUser } from '../hooks/useFetchUser'
import { TodoForm } from '../components/TodoForm'
import { Todos } from '../components/Todos'
import { Spin } from 'antd'
import { HomeStyled } from '../styles/styled-components'

const Home: NextPage = () => {
    const user = useSelector((state: StateType) => state.user.data)
    const userLoading = useSelector((state: StateType) => state.user.loading)
    const todosLoading = useSelector((state: StateType) => state.todos.loading)
    const error = useSelector((state: StateType) => state.user.error)
    const todosError = useSelector((state: StateType) => state.todos.error)

    const dispatch = useDispatch()

    useFetchUser()

    const showAuth = () => {
        dispatch(actionCreators.signin())
    }

    const onLogout = () => {
        logout({ dispatch })
    }

    useEffect(() => {
        if (error) {
            alert(error)
        }
    }, [error])

    useEffect(() => {
        if (todosError) {
            alert(todosError)
        }
    }, [todosError])

    return (
        <HomeStyled>
            <h3>Todo app</h3>
            <Spin
                spinning={
                    user !== null &&
                    user !== false &&
                    (userLoading || todosLoading)
                }
            >
                {user && <button onClick={onLogout}>Log out</button>}
                {user === false && <button onClick={showAuth}>Log in</button>}
                {user && <TodoForm />}
                {user && <Todos />}
                {user === false && <Auth />}
            </Spin>
        </HomeStyled>
    )
}

export default Home
