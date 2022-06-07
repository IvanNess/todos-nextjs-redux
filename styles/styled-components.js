import styled from 'styled-components'

export const TodosStyled = styled.div``

export const TodoStyled = styled.div`
    background: grey;
    display: flex;
    padding: 5px 0;
    .todo-name {
        padding: 0px 10px 0px 10px;
    }
    .delete-btn {
        background: orangered;
        color: white;
        border: none;
        &:hover {
            background: red;
        }
    }
`

export const AuthStyled = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    width: 100vw;
    height: 100vh;
    .close-auth {
        width: 100%;
        height: 100%;
    }
    .auth {
        margin: auto;
        position: relative;
        top: 20%;
        max-width: 300px;
        padding: 20px;
        background: white;
        form {
            display: flex;
            flex-direction: column;
        }
        input {
            height: 30px;
            width: 100%;
            margin-top: 10px;
        }
        .withErr {
            position: relative;
            display: flex;
        }
        .formError {
            position: absolute;
            top: 3px;
            left: 5px;
            height: 10px;
            color: red;
            font-size: 10px;
            z-index: 1;
            background-color: white;
        }
    }
`

export const EditTodoStyled = styled.div`
    display: flex;
    input[type='text'] {
        padding-left: 10px;
    }
`

export const TodoFormStyled = styled.div`
    padding: 20px 0 10px 0;
`

export const HomeStyled = styled.div`
    padding: 20px;
    .ant-spin-container,
    .ant-spin-nested-loading {
        position: static;
    }
`
