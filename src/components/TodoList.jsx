import { useEffect, useState } from 'react';
import TodoItem from "./TodoItem";
import { db } from './firebase'
import { getDoc, doc } from 'firebase/firestore';
import { useUser } from './UserContext';

function TodoList(){

    const { userId } = useUser();
    const [taskList, setTaskList] = useState([]);

    useEffect(()=>{
        const getTaskList = async ()=>{
        try {

            const userDocRef = doc(db, 'users', userId);
            const userSnap = await getDoc(userDocRef);
            const filteredData = userSnap.data().tasks.map((doc)=>({...doc, id:doc.id}))
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
                        complete = {task.complete}
                    />
            ))}
        </div>
    )
};

export default TodoList;