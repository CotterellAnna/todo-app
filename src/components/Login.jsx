import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Swal from 'sweetalert2';


function Login(){

    const navigate = useNavigate();
    const Swal = require('sweetalert2');

    const { setUserId } = useUser();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [errorMessage, setErrorMessage ] = useState("");
    const [ spinner, setSpinner ] = useState("d-none");
    const [ loginText, setLoginText] = useState("");


    const handleError = (errMsg)=>{
        if(errMsg === "Firebase: Error (auth/invalid-email)."){
            return("Invalid email or password*")
        }
    };

    const handleLogIn = async(e)=>{
        e.preventDefault()

        setSpinner("");
        setLoginText("d-none");

        try{
            await signInWithEmailAndPassword(auth, email, password)
            .then((cred)=>{
                Swal.fire({
                    icon: "success",
                    text: "Login successful",
                    confirmButtonColor: "#3F72AF"
                })
                const user = cred.user;
                setUserId(user.uid);
                navigate('/TodoApp')
            })
            .catch((err)=>{
                setErrorMessage(handleError(err.message));
                setSpinner("d-none");
                setLoginText("")

            })
        }catch(err){
            setErrorMessage(handleError(err.message));
            setSpinner("d-none");
            setLoginText("")
        }
        
    }


    return(
        <div className="App rounded container mx -auto my-3 p-2">
            <Header />
            <form className='my-3'>
                
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" placeholder="" 
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                    />
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Password" 
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <div className='form-floating mb-3 text-danger'>
                    {errorMessage}
                </div>
                <div className='form-floating mb-3 text-center'>
                    <button className='btn btn-primary w-25' type='submit' onClick={handleLogIn}> 
                        <span className={`${loginText}`}>Log In</span>
                        <div className={`spinner-border spinner-border-sm text-light ${spinner}`} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </button>
                </div>
                <div className='form-floating mb-3'>
                    Don't have an account? <button type='button' className='text-primary bg-transparent border border-0' onClick={()=>{navigate('/')}}>Signup</button>
                </div>
            </form>
        </div>
    )
}

export default Login