import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import { db } from './firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

function TodoItem(props){
    const [isChecked, setIsChecked] = useState(props.isDone)

    const handleChange = ()=>{
        setIsChecked(!isChecked);
        updateTask(!isChecked)
    };

    const updateTask = async(newStatus)=>{
        try {
            const taskDocRef = doc(db, "tasks", props.id)
            await updateDoc(taskDocRef, {
                isDone: newStatus
            })
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTask = async()=>{
        try {
            await deleteDoc(doc(db, "tasks", props.id))
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
                        checked={props.isDone}
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