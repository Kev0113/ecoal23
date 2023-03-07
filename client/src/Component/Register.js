import React, {useState} from "react"
import {Navigate} from "react-router-dom"
import axios from "axios"

import LinkInClass from "./LinkInClass"


function Register (){
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [redirect, setRedirect] = useState(false)

    const handleChange = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value)
        } else if (e.target.name === "password") {
            setPassword(e.target.value)
        } else {
            setEmail(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post(`http://127.0.0.1:8000/api/register`, { name, password, email })
            .then(res => {
                console.log(res)
                setRedirect(true)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Name" value={name} onChange={handleChange} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
            <LinkInClass to="/login">Login</LinkInClass>
            
            {redirect ? <Navigate to="/login" /> : null}
        </div>
    )
}

export default Register;
