import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from './firebase';
import { updateProfile } from 'firebase/auth';
import { useState, useEffect } from 'react';
const Swal = require('sweetalert2');

function Greeting(){
    const Swal = require('sweetalert2');

    const [username, setUsername] = useState("");

    useEffect(()=>{
        const getDisplayName = async()=>{
            try{
                await setUsername(auth.currentUser.displayName)
                    .then(()=>{
                        if(!username){
                            Swal.fire({
                                title: "Please enter your preferred username",
                                input: "text",
                                confirmButtonColor: "#3F72AF"
                                }).then((result)=>{
                                if(result.isConfirmed){
                                    const newUsername = result.value;
                                    setUsername(newUsername)
                                    updateProfile(auth.currentUser, { displayName: newUsername });
                                }
                                })
                        }
                    })
            }catch(error){
                console.log(error);
            }
        }
        getDisplayName();
    })

    return(
        <div className='mt-3'>
            <h2 className="text-center mb-0">What's up, {username}!</h2>
        </div>
    );
}

export default Greeting