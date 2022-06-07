import { useEffect } from "react"
import useFetch from "./useFetch"
import { useDispatch } from "react-redux"
import { actionCreators } from "../redux/action-creators"

function useFetchTodos() {

    const {data, error, loading} = useFetch('/api/gettodos')

    const dispatch = useDispatch()

    useEffect(() => {
      if (data !== null) {
        dispatch(actionCreators.setTodos(data))
      }
    }, [data])

    useEffect(() => {
      if (error !== null) {
        dispatch(actionCreators.setTodosError(error))
      }
    }, [error])

    useEffect(() => {
      dispatch(actionCreators.setTodosLoading(loading))
    }, [loading])
}

export default useFetchTodos