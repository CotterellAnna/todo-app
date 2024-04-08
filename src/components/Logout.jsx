import 'bootstrap/dist/css/bootstrap.min.css';
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";


function Logout(){
    const navigate = useNavigate();

    const handleLogout = async()=>{
        signOut(auth)
            .then(()=>{
                navigate('/Login')
            }).catch((err)=>{
                console.log(err);
            });
    };

    return(
        <div className="d-flex justify-content-end">
            <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout