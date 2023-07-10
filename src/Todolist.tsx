import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styled from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeCheckBoxStatus: (taskId: string, newIsDone: boolean) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState(false)
    const addTask = () => {
        if (title === '') {
            setError(true)
            return
        }
        props.addTask(title.trim());
        setTitle("");
        setError(false)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return <div>
        <h3>{props.title}</h3>

        <div>

            <input value={title}
                   className={error ? styled.error : ''}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error ? <h2 className={styled.errorMessage}>Value is required</h2> : null}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeCheckBoxStatus(t.id, e.currentTarget.checked)
                    }
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
