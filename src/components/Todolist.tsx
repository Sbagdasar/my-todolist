import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeFilter: (filter: FilterValueType) => void
}
export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const [title, setTitle] = useState<string>('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        let trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addTask(trimmedTitle)
            setTitle('')
        }

    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyUp={onKeyUpHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                            const removeTaskHandler = () => {
                                props.removeTask(t.id)
                            }
                            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked)
                            }
                            return (<li key={t.id}>
                                <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler}/>
                                <span>{t.title}</span>
                                <button onClick={removeTaskHandler}>X</button>
                            </li>)
                        }
                    )
                }
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};

