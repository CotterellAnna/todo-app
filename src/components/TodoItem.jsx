import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import { db } from './firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useUser } from './UserContext';

function TodoItem(props){
    const [isChecked, setIsChecked] = useState(props.complete)
    const {userId} = useUser();
    
    const handleChange = ()=>{
        setIsChecked(!isChecked);
        updateTask(!isChecked)
    };

    const updateTask = async(newStatus)=>{
        try {
            const userDocRef = doc(db, 'users', userId);
            const userSnap = await getDoc(userDocRef);
            const tasks = userSnap.data().tasks

            const taskIndex = tasks.findIndex(task => task.id === props.id);

            if (taskIndex !== -1) {
                // Update the task at the found index with the updated task
                tasks[taskIndex] = { ...tasks[taskIndex], complete : newStatus };
            
                // Update the tasks array in the user's document
                await updateDoc(userDocRef, { tasks });
              }

        } catch (error) {
            console.log(error);
        }
    }

    const deleteTask = async()=>{
        try {
            const userDocRef = doc(db, 'users', userId);
            const userSnap = await getDoc(userDocRef);
            const tasks = userSnap.data().tasks
            const newTasks = tasks.filter(task => task.id !== props.id);

            await updateDoc(userDocRef, {tasks: newTasks})

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <Row className='item p-3 rounded my-3'>
            <Col className='col-11'>
                <InputGroup>
                    <Form.Check
                        onChange= {handleChange}
                        type='checkbox'
                        checked={props.complete}
                        id={props.id}
                    />
                    <label
                        className='mx-2'
                        htmlFor={props.id}
                        style={{ textDecoration: isChecked ? 'line-through' : 'none' }}
                    >
                        {props.value}
                    </label>
                </InputGroup>
            </Col>
            <Col className='col-1 text-end p-0 delete-btn-container'>
                <i className="bi bi-trash3 p-0 delete-btn" onClick={deleteTask}></i>
            </Col>
        </Row>
    )
};

export default TodoItem;