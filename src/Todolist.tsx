import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import styled from './Todolist.module.css'
import {Checkbox} from "./components/Checkbox";

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

    const [title, setTitle] = useState("")
    const [error, setError] = useState<null | string>(null)
    const [buttonName, setButtonName] = useState('all')

    const addTaskHandler = () => {
        if (title.trim()) {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTaskHandler()
        }
    }

    const changeButtonFilter = (value: FilterValuesType) => {
        props.changeFilter(value)
        setButtonName(value)
    }

    const onChangeStatusHandler = (tID: string, newIsDone: boolean) => {
        props.changeCheckBoxStatus(tID, newIsDone)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   className={error ? styled.error : ''}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTaskHandler}>+</button>
            {error ? <h2 className={styled.errorMessage}>{error}</h2> : null}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)
                    return <li key={t.id} className={t.isDone ? styled.isDone : ''}>
                        <Checkbox isDone={t.isDone}
                                  callBack={(newIsDone) => onChangeStatusHandler(t.id, newIsDone)}
                        />
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
