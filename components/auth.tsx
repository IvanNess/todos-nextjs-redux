import React, { SyntheticEvent, useRef, FormEvent, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StateType } from '../redux/reducer'
import { Spin } from 'antd'
import { toggleAuth, actionCreators } from '../redux/action-creators'
import axios from 'axios'
import { AuthStyled } from '../styles/styled-components'

type FormType = {
    username: { value: String; focus: Function }
    password: { value: String; focus: Function }
    repeat: { value: String; focus: Function }
}

// interface FormElement extends HTMLFormElement {
//     username: { value: String; focus: Function }
//     password: { value: String; focus: Function }
//     repeat: { value: String; focus: Function }
// }

interface FormElement extends HTMLFormElement {}
interface FormElement extends FormType {}

const Auth = () => {
    const dispatch = useDispatch()

    const status = useSelector((state: StateType) => state.auth.status)
    const loading = useSelector((state: StateType) => state.user.loading)

    const usernameErrRef = useRef<HTMLDivElement>(null)
    const passwordErrRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<FormElement>(null)

    const changeStatus = () => {
        toggleAuth({ status, dispatch })
    }

    useEffect(() => {
        if (
            status !== 'HIDDEN' &&
            formRef.current &&
            (formRef.current.username.value !== '' ||
                formRef.current.password.value !== '')
        ) {
            formCheck(formRef.current)
        }
    }, [status])

    const close = (e: SyntheticEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement
        if (target.classList.contains('close-auth'))
            dispatch(actionCreators.hideAuth())
    }

    function formCheck(
        target: (EventTarget & FormType) | HTMLFormElement
    ): boolean {
        usernameErrRef.current!.innerHTML = ''
        passwordErrRef.current!.innerHTML = ''
        if (target.username.value.trim() === '') {
            target.username.focus()
            usernameErrRef.current!.innerHTML =
                '<span>&nbsp;Required Field&nbsp;</span>'
            return false
        }
        if (target.password.value.length < 6) {
            target.password.focus()
            passwordErrRef.current!.innerHTML =
                '<span>&nbsp;Password should not be less 6 signs.&nbsp;</span>'
            return false
        }
        if (
            status === 'SIGN_UP' &&
            target.password.value !== target.repeat.value
        ) {
            target.repeat.focus()
            passwordErrRef.current!.innerHTML =
                '<span>&nbsp;Password and Repeat password fields should be equal.&nbsp;</span>'
            return false
        }
        return true
    }

    const submit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.target as typeof e.target & FormType
        if (!formCheck(target)) return
        dispatch(actionCreators.setLoading(true))
        try {
            const res = await axios({
                url: status === 'SIGN_UP' ? '/api/createuser' : '/api/login',
                method: 'POST',
                withCredentials: true,
                data: {
                    username: target.username.value.trim(),
                    password: target.password.value,
                },
            })
            console.log({ res })
            dispatch(actionCreators.setUser(res.data.user))
            dispatch(actionCreators.setTodos(res.data.user.Todos))
            dispatch(actionCreators.hideAuth())
        } catch (error) {
            alert('Error')
            console.log({ error })
            dispatch(
                actionCreators.setError(
                    status === 'SIGN_UP'
                        ? 'Create user error'
                        : 'Wrong credentials'
                )
            )
        }
    }

    const formChanged = (e: SyntheticEvent<HTMLFormElement>) => {
        const target = e.target as HTMLFormElement
        switch (target.name) {
            case 'username':
                usernameErrRef.current!.innerHTML = ''
            case 'password':
                passwordErrRef.current!.innerHTML = ''
        }
    }

    if (status === 'HIDDEN') return null

    return (
        <AuthStyled>
            <Spin spinning={loading}>
                <div className="close-auth" onClick={close}>
                    <div className="auth">
                        <form
                            onSubmit={submit}
                            onChange={formChanged}
                            ref={formRef}
                        >
                            <div className="withErr">
                                <div
                                    className="formError"
                                    ref={usernameErrRef}
                                ></div>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="username"
                                />
                            </div>
                            <div className="withErr">
                                <div
                                    className="formError"
                                    ref={passwordErrRef}
                                ></div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                />
                            </div>
                            {status === 'SIGN_UP' && (
                                <>
                                    <div className="formError"></div>
                                    <input
                                        type="password"
                                        name="repeat"
                                        placeholder="repeat password"
                                    />
                                </>
                            )}
                            <input type="submit" value="send" />
                        </form>
                        <a onClick={changeStatus}>
                            {status === 'SIGN_IN' ? 'Sign Up' : 'Sign In'}
                        </a>
                    </div>
                </div>
            </Spin>
        </AuthStyled>
    )
}

export default Auth
