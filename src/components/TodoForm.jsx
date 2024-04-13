import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { collection, getDoc, updateDoc, doc, addDoc } from "firebase/firestore"; 
import { useUser } from './UserContext';
import { useState } from 'react';
import { db } from './firebase';



function TodoForm(){
    const [task, setTask] = useState("");
    const { userId } = useUser();
    const [ spinner, setSpinner ] = useState("d-none");
    const [ addBtn, setAddBtn] = useState("");


    const handleInputChange = (e) =>{
        setTask(e.target.value);
    }

    const addTask = async(e) => {
        e.preventDefault()
        setSpinner("");
        setAddBtn("d-none");
        
        if (task.trim().length !== 0){
            try {
                const userDocRef = doc(db, 'users', userId);
                const userSnap = await getDoc(userDocRef);
                const currentTasks = userSnap.data().tasks;

                const newTask = {
                    title: task,
                    complete: false
                }

                const newTaskRef = await addDoc(collection(userDocRef, 'tasks'), newTask);         
                const newTaskId = newTaskRef.id;
            
                const newTasks = [...currentTasks, { id: newTaskId, ...newTask }];
                await updateDoc(userDocRef, { tasks: newTasks });
                setTask("")
            } catch (error) {
                console.log(error);
            }
        }  

        setSpinner("d-none");
        setAddBtn("");
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
                            <span className={`${addBtn}`}><i className="bi bi-plus-lg"></i></span>
                            <div className={`spinner-border spinner-border-sm text-light ${spinner}`} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
        </Form>
    )
}

export default TodoForm;