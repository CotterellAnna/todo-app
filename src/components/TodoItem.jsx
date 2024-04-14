import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { InputGroup } from 'react-bootstrap';
import { db } from './firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useUser } from './UserContext';
import Swal from 'sweetalert2';

function TodoItem(props){
    const [isChecked, setIsChecked] = useState(props.complete);
    const [ tasks, setTasks] = useState([]);
    const {userId} = useUser();
    const userDocRef = doc(db, 'users', userId);
    const Swal = require("sweetalert2");

    useEffect(()=>{
        const getTasks = async ()=>{
        try {
            const userSnap = await getDoc(userDocRef);
            const filteredData = userSnap.data().tasks.map((doc)=>({...doc, id:doc.id}))
            setTasks(filteredData)
        } catch (error) {
            console.log(error);
        } 
        }
        getTasks();
    })
    
    const handleChange = ()=>{
        setIsChecked(!isChecked);
        updateTask(!isChecked)
    };

    const taskIndex = (tasks)=>{
        const taskIndex = tasks.findIndex(task => task.id === props.id);

        return taskIndex
    }

    const updateTask = async(newStatus)=>{
        try {

            const index = taskIndex(tasks)

            if (index !== -1) {
                // Update the task at the found index with the updated task
                tasks[index] = { ...tasks[index], complete : newStatus };
            
                // Update the tasks array in the user's document
                await updateDoc(userDocRef, { tasks });
              }

        } catch (error) {
            console.log(error);
        }
    }

    const editTask = ()=>{
        const index = taskIndex(tasks)
        const task = tasks[index].title

        Swal.fire({
            confirmButtonColor: "#d33",
            confirmButtonText: "Save changes",
            showCancelButton: true,
            cancelButtonColor: "#3F72AF",
            title: "Edit task",
            input: "text",
            inputValue: task,
        }).then(async(result)=>{
            if(result.isConfirmed){
                try{
                    tasks[index] = { ...tasks[index], title : result.value };
                    await updateDoc(userDocRef, { tasks })
                        .then(()=>{
                            Swal.fire({
                                icon: "success",
                                title: "Task updated successfully",
                                confirmButtonColor: "#3F72AF"
                            })
                        })
                    
                }catch(error){
                    console.log(error);
                }
            }
        })
    };

    const deleteTask = ()=>{
        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            confirmButtonText: "Delete",
            confirmButtonColor: "#d33",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            cancelButtonColor: "#3F72AF"
        }).then(async(result)=>{
            if(result.isConfirmed){
                try {

                    const newTasks = tasks.filter(task => task.id !== props.id);
                    setTasks(newTasks);
                    await updateDoc(userDocRef, {tasks: newTasks})
                    .then(()=>{
                        Swal.fire({
                            title: "Deleted!",
                            text: "Task has been deleted.",
                            icon: "success",
                            confirmButtonColor: "#3F72AF"
                        });
                    })
        
                } catch (error) {
                    console.log(error);
                }
            }
        })      
    }

    return(
        <Row className='item p-3 rounded my-3'>
            <Col className='col-10'>
                <InputGroup>
                    <Form.Check
                        onChange= {handleChange}
                        type='checkbox'
                        checked={props.complete}
                        id={props.id}
                    />
                    <label
                        className='mx-2 col-10  h-auto text-wrap overflow-x-hidden'
                        htmlFor={props.id}
                        style={{ textDecoration: isChecked ? 'line-through' : 'none' }}
                    >
                        {props.value}
                    </label>
                </InputGroup>
            </Col>
            <Col className='col-2 text-end p-0'>
                <i className="bi bi-pencil-square me-2 action-btn d-inline-block" onClick={editTask}></i>
                <i className="bi bi-trash3 p-0 delete-btn action-btn d-inline-block" onClick={deleteTask}></i>
            </Col>
        </Row>
    )
};

export default TodoItem;