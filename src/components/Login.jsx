import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login(){

    const navigate = useNavigate();

    // hr line style object
    // const hrStyle ={
    //     width: "45%",
    //     height: "1.5px",
    //     backgroundColor: "#000000"
    // }

    const { setUserId } = useUser();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [errorMessage, setErrorMessage ] = useState("");


    const handleError = (errMsg)=>{
        if(errMsg === "Firebase: Error (auth/invalid-email)."){
            return("Invalid email or password*")
        }
    };

    const handleLogIn = async(e)=>{
        e.preventDefault()

        try{
            await signInWithEmailAndPassword(auth, email, password)
            .then((cred)=>{
                const user = cred.user;
                setUserId(user.uid);
                navigate('/TodoApp')
            })
            .catch((err)=>{
                setErrorMessage(handleError(err.message));

            })
        }catch(err){
            setErrorMessage(handleError(err.message));
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
                    <button className='btn btn-primary' type='submit' onClick={handleLogIn}>Log In</button>
                </div>
                <div className='form-floating mb-3'>
                    Don't have an account? <a href='./Signup'>Signup</a>
                </div>
            </form>
            
            {/* <div className='position-relative my-4 text-center'>
                <hr className='position-absolute start-0' style={hrStyle} />
                <hr className='position-absolute end-0' style={hrStyle} />
                <span className='text-center px-3'>
                    OR
                </span>
            </div>

            <div className='text-center'>
                <button className='btn shadow-lg p-2 px-3' onClick={signInWithGoogle}><i className="bi bi-google me-2"></i> Log In with Google</button>
            </div> */}
        </div>
    )
}

export default Login