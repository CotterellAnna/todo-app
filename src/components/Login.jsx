import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth, db, googleProvider } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence, signInWithPopup } from 'firebase/auth';
import Swal from 'sweetalert2';


function Login(){

    const hrStyle ={
        width: "45%",
        height: "1.5px",
        backgroundColor: "#000000"
    };

    const navigate = useNavigate();
    const Swal = require('sweetalert2');

    const { setUserId } = useUser();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [errorMessage, setErrorMessage ] = useState("");
    const [ spinner, setSpinner ] = useState("d-none");
    const [ loginText, setLoginText] = useState("");

    const createNewListForUser = async(userId)=>{
        await setDoc(doc(db, "users", userId), {
            Email: email,
            tasks:[]
        });
        setUserId(userId);
        navigate('/TodoApp')
    };

    const checkOrCreateUserList = async (userId) => {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc._document === null) {
          // User document does not exist, create a new list
          await createNewListForUser(userId);
        }else{
            setUserId(userId);
            navigate('/TodoApp')
        }
    };

    const handleError = (errMsg)=>{
        if(errMsg === "Firebase: Error (auth/invalid-email)."){
            return("Invalid email or password*")
        }
    };

    const handleLogIn = (e)=>{
        e.preventDefault()

        setSpinner("");
        setLoginText("d-none");

        setPersistence(auth, browserSessionPersistence)
            .then(async()=>{
                try{
                    await signInWithEmailAndPassword(auth, email, password)
                    .then((cred)=>{
                        Swal.fire({
                            icon: "success",
                            title: "Login successful",
                            confirmButtonColor: "#3F72AF"
                        })
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
            }).then(()=>{
                setSpinner("d-none");
                setLoginText("")
            })
            .catch((err)=>{
                console.log(err)
            })
        
        
    }

    const signInWithGoogle = (e)=>{
        e.preventDefault();
    
        setPersistence(auth, browserSessionPersistence)
            .then(async()=>{
                try{
                    signInWithPopup(auth, googleProvider)
                        .then((cred)=>{
                            checkOrCreateUserList(cred.user.uid)
                            Swal.fire({
                                icon: "success",
                                title: "Log In successful",        
                                confirmButtonColor: "#3F72AF"
                            })
                            .then(()=>{
                                setEmail("")
                                setPassword("")
                                setUserId(cred.user.uid)
                            })
                            .catch((err)=>{
                                setErrorMessage(handleError(err.message));
                            })
                        })
                        .catch((err)=>{
                            setErrorMessage(handleError(err.message));
                        })
                }catch(err){
                    setErrorMessage(handleError(err.message));
                }
            })
        
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
                <div className='position-relative my-4 text-center'>
                    <hr className='position-absolute start-0' style={hrStyle} />
                    <hr className='position-absolute end-0' style={hrStyle} />
                    <span className='text-center px-3'>
                        OR
                    </span>
                </div>

                <div className='text-center'>
                    <button className='btn shadow-lg p-2 px-3' onClick={signInWithGoogle}><i className="bi bi-google me-2"></i> Log In with Google</button>
                </div>
            </form>
        </div>
    )
}

export default Login