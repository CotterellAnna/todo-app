import { useEffect, useState } from 'react';
import TodoItem from "./TodoItem";

import { db } from './firebase'
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

function TodoList(){

    const [taskList, setTaskList] = useState([]);
    const taskListRef = collection(db, "tasks");

    useEffect(()=>{
        const getTaskList = async ()=>{
        try {

            const tasksQuery = query(taskListRef, orderBy('createdAt', 'asc'))
            const querySnapshot = await getDocs(tasksQuery)
            const filteredData = querySnapshot.docs.map((doc)=>({...doc.data(), id: doc.id}))
            setTaskList(filteredData)

        } catch (error) {
            console.log(error);
        } 
        }
        getTaskList();
    })

    return(
        <div className="todo_list p-3 pt-0 container">
            {taskList.map((task) => (
                    <TodoItem
                        key={task.id}
                        id= {task.id}
                        value = {task.title}
                        isDone = {task.isDone}
                    />
            ))}
        </div>
    )
};

export default TodoList;