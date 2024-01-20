import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { useState } from 'react';
import { db } from './firebase';



function TodoForm(){
    const [task, setTask] = useState("");

    const handleInputChange = (e) =>{
        setTask(e.target.value);
    }

    const addTask = async(e) => {
        e.preventDefault()
        try {
            await addDoc(collection(db, "tasks"), {
                title: task,
                isDone: false,
                createdAt: serverTimestamp()
            });
            setTask("")
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <Form className='container py-3' onSubmit={addTask}>
            <Row className='justify-content-center'>
                <Col xs="auto">
                    <Form.Label htmlFor="task" visuallyHidden>
                        Task
                    </Form.Label>
                    <InputGroup className="mt-2">
                        <Form.Control
                            className="mb-2 rounded-start"
                            id="task"
                            placeholder="... enter a task"
                            name="task"
                            value={task}
                            onChange={handleInputChange}
                        />
                        <Button type='submit' id='add_task' className="mb-2 rounded-end">
                            <i className="bi bi-plus-lg"></i>
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
        </Form>
    )
}

export default TodoForm;