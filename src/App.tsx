import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

export type FilterValueType = 'all'|'active'|'completed'
function App() {
    const [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "ReactJS", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValueType>('all')

    let tasksForTodolist = tasks
    if(filter === 'active'){
        tasksForTodolist = tasks.filter(t=> !t.isDone)
    }
    if(filter === 'completed'){
        tasksForTodolist = tasks.filter(t=> t.isDone)
    }
    const removeTask = (taskId: number) => {
        setTasks([...tasks.filter(t => t.id !== taskId)])
    }
    const changeFilter = (filter:FilterValueType)=>{
        setFilter(filter)
    }
    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
