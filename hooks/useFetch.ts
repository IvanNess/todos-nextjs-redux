import { useState, useEffect, useCallback, useRef } from "react"
import axios, { Axios, AxiosPromise, AxiosResponse } from 'axios'
import { ITodo } from "../types"
import {useDispatch} from 'react-redux'
import { actionCreators } from "../redux/action-creators"
import { GetTodosData } from "../pages/api/gettodos"

type DataType = Array<ITodo> | null

const useFetch = (url: string)=>{
    const [data, setData] = useState<DataType>([])
    const [error, setError] = useState<String | null>(null)
    const [loading, setLoading] = useState(false)

    const firstLoading = useRef(true)
    console.log('useFetch')

    useEffect(()=>{

        if(firstLoading.current){
            console.log('firstLoading.current', firstLoading.current)
            getData()
            firstLoading.current = false
        }
        
        async function getData(){
            console.log('getData')
            setLoading(true)
            try {
                const res: AxiosResponse<GetTodosData> = await axios({url})
                const data = res.data.todos
                setData(data) 
                // dispatch(actionCreators.addTodo(data))               
            } catch (error) {
                const message: String = error.response.data.message
                setError(message)
            } finally{
                setLoading(false)
            }
        }
    }, [])

    return {data, error, loading}
}

export default useFetch