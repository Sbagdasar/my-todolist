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
    filter: FilterValueType
}
export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<null | string>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        let trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addTask(trimmedTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }

    }

    const allFilterHandler = () => props.changeFilter('all')
    const activeFilterHandler = () => props.changeFilter('active')
    const completedFilterHandler = () => props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <div>
                    <input value={title}
                           onChange={onChangeHandler}
                           onKeyUp={onKeyUpHandler} className={error ? 'error' : ''}/>
                    <button onClick={addTaskHandler}>+</button>
                </div>
                {error && <span className={'error-message'}>{error}</span>}
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
                            return (<li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler}/>
                                <span>{t.title}</span>
                                <button onClick={removeTaskHandler}>X</button>
                            </li>)
                        }
                    )
                }
            </ul>
            <div>
                <button onClick={allFilterHandler} className={props.filter === 'all' ? 'active-filter' : ''}>All
                </button>
                <button onClick={activeFilterHandler}
                        className={props.filter === 'active' ? 'active-filter' : ''}>Active
                </button>
                <button onClick={completedFilterHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
                </button>
            </div>
        </div>
    );
};
