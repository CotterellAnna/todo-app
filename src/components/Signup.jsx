import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, db} from './firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// login function
function Signup(){
    const { setUserId } = useUser();

    // hr line style object
    const hrStyle ={
        width: "45%",
        height: "1.5px",
        backgroundColor: "#000000"
    }

    // use state for email, password and error message
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    // creating navigate for redirecting
    const navigate = useNavigate();

    // handle signup errors
    const handleError = (errMsg)=>{
        if(errMsg === "Firebase: Error (auth/email-already-in-use)."){
            return("Email is already in use*")
        }else if( errMsg === "Firebase: Password should be at least 6 characters (auth/weak-password)."){
            return("Password should be at least 6 characters*")
        }
    }

    // create new user in db
    const createNewListForUser = async(userId)=>{
        await setDoc(doc(db, "users", userId), {
            Email: email,
            tasks:[]
        });
        setUserId(userId);
        navigate('/TodoApp')
    }

    // check if user exist in db
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

    // signIn with email and password
    const signIn = async(e)=>{
        e.preventDefault()
        try{
            await createUserWithEmailAndPassword(auth, email, password)
                .then((cred)=>{
                    checkOrCreateUserList(cred.user.uid)
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
    }

    // signIn with google
    const signInWithGoogle = async(e)=>{
        e.preventDefault();
        try{
            signInWithPopup(auth, googleProvider)
                .then((cred)=>{
                    checkOrCreateUserList(cred.user.uid)
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
    }

    return(
        
        <div className="App rounded container mx -auto my-3 p-2">
            <Header />
            <form className='my-3'>
                
                <div className="form-floating mb-3">
                    <input required type="email" className="form-control" id="email" placeholder="" 
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                    />
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input required type="password" className="form-control" id="password" placeholder="Password" 
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
                    <button className='btn btn-primary' type='submit' onClick={signIn}>Sign In</button>
                </div>
                <div className='form-floating mb-3'>
                    Already have an account? <button type='button' className='text-primary bg-transparent border border-0' onClick={()=>{navigate('/login')}}>Login</button>
                </div>
            </form>
            
            <div className='position-relative my-4 text-center'>
                <hr className='position-absolute start-0' style={hrStyle} />
                <hr className='position-absolute end-0' style={hrStyle} />
                <span className='text-center px-3'>
                    OR
                </span>
            </div>

            <div className='text-center'>
                <button className='btn shadow-lg p-2 px-3' onClick={signInWithGoogle}><i className="bi bi-google me-2"></i> Sign In with Google</button>
            </div>
        </div>
    )
};

export default Signup;