import { useDispatch } from 'react-redux'
import { useRef, useEffect } from 'react'
import { withTokensCheck } from '../utilities'
import { actionCreators } from '../redux/action-creators'
import { IAxiosError } from '../types'
import axios from 'axios'
import { ServerController } from '../server-controller'

function useFetchUser() {
    const dispatch = useDispatch()

    const isFirstLoad = useRef(true)

    useEffect(() => {
        if (isFirstLoad.current) {
            getUser()
            isFirstLoad.current = false
        }

        async function getUser() {
            dispatch(actionCreators.setLoading(true))

            withTokensCheck({
                cb: async () => {
                    const res = await ServerController.getUser()
                    dispatch(
                        actionCreators.setUser({
                            id: res.id + '',
                            username: res.username,
                        })
                    )
                    dispatch(actionCreators.setTodos(res.todos))
                    console.log({ res })
                },
                err: (error) => {
                    console.log({ error })
                    dispatch(actionCreators.setTodos([]))
                    if (error.message === 'No access') {
                        dispatch(actionCreators.noUser())
                    } else {
                        dispatch(
                            actionCreators.setError(
                                error.message || 'Something went wrong'
                            )
                        )
                    }
                },
            })
        }
    }, [])
}

export { useFetchUser }
