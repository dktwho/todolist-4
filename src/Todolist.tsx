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
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<null | string>(null)
    const [buttonName, setButtonName] = useState('all')

    const addTask = () => {
        if (title === '') {
            setError('Title is required')
            return
        }
        props.addTask(title.trim());
        setTitle('');
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const changeButtonFilter = (value: FilterValuesType) => {
        props.changeFilter(value)
        setButtonName(value)
    }


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
            <button className={buttonName === 'all' ? styled.activeFilter : ''}
                    onClick={() => changeButtonFilter('all')}>All
            </button>
            <button className={buttonName === 'active' ? styled.activeFilter : ''}
                    onClick={() => changeButtonFilter('active')}>Active
            </button>
            <button className={buttonName === 'completed' ? styled.activeFilter : ''}
                    onClick={() => changeButtonFilter('completed')}>Completed
            </button>
        </div>
    </div>
}
