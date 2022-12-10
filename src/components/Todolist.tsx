import React from 'react';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskUd: number) => void
}
export const Todolist: React.FC<TodolistPropsType> = (props) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const removeTaskHandler = ()=>{
                            props.removeTask(t.id)
                        }
                            return (<li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                                <button onClick={removeTaskHandler}>X</button>
                            </li>)
                        }
                    )
                }
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

