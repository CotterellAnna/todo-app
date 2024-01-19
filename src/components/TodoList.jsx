import { useEffect, useState } from 'react';
import TodoItem from "./TodoItem";

import { db } from './firebase'
import { collection, onSnapshot } from 'firebase/firestore';

function TodoList(){

    const [taskList, setTaskList] = useState([]);
    const taskListRef = collection(db, "tasks");

    useEffect(()=>{
        const getTaskList = async ()=>{
        try {
            // const data = await getDocs(taskListRef);
            // const filteredData = data.docs.map((doc)=>({...doc.data(), id: doc.id}))
            // setTaskList(filteredData);

            await onSnapshot(taskListRef, (snapshot) => {
                const filteredData = snapshot.docs.map((doc)=>({...doc.data(), id: doc.id}));
                setTaskList(filteredData)
            } )

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