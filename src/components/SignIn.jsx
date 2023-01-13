import React, { useEffect, useState } from 'react'
import {auth, provider, db} from "../config"
import { signInWithPopup } from "firebase/auth";
import Home from "./Home"

function SignIn(){
    const [uid,setUid] = useState('')
    const [user,setUser] = useState('')
    const [picURL,setPicURL] = useState('')
    const handleClick = () => {
        signInWithPopup(auth,provider).then((data)=>{
            setUid(data.user.uid)
            setUser(data.user.displayName)
            setPicURL(data.user.photoURL)
            localStorage.setItem("uid",data.user.uid)
            localStorage.setItem("email",data.user.displayName)
            localStorage.setItem("pic",data.user.photoURL)
            //console.log(data.user)
        })
    }

    useEffect(()=>{
        setUid(localStorage.getItem('uid'))
        setUser(localStorage.getItem('email'))
        setPicURL(localStorage.getItem('pic'))
    })
    console.log("Login as ", user, uid)

    return (
        <div className="App">
            {uid?<Home 
                db={db}
                uid={uid}
                user={user}
                picURL={picURL}
            />:
            <div className="SignInPage">
                <h1>Keep Track of your Taxs</h1>
                <button onClick={handleClick}><i className="fa fa-google" aria-hidden="true"></i> Google Sign In</button>
            </div>
    }
        </div>
    )
}

export default SignIn