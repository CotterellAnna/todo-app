import 'bootstrap/dist/css/bootstrap.min.css';
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function Logout(){
    const navigate = useNavigate();
    const Swal = require('sweetalert2');

    const handleLogout = async()=>{

        Swal.fire({
            icon: 'warning',
            title: "Are you sure",
            confirmButtonText: "Yes, Logout &#128532",
            confirmButtonColor: "#d33",
            showCancelButton: true,
            cancelButtonText: "No, stay &#128540",
            cancelButtonColor: "#3F72AF"
        }).then((result)=>{
            if(result.isConfirmed){
                Swal.fire({
                    icon: "success",
                    title: "Logout successful",
                    confirmButtonColor: "#3F72AF"
                })
                signOut(auth)
                .then(()=>{
                    navigate('/Login')
                }).catch((err)=>{
                    console.log(err);
                });
            }
        })

        
    };

    return(
        <div className="d-flex justify-content-end">
            <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout