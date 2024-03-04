import axios from 'axios'
import React, { useState } from 'react'
const Register = () => {
    const MY_SERVER = 'http://127.0.0.1:8000/register'
    const [username, setusername] = useState("")
    const [password, setpassword] = useState('')
    const handleRegister = async () => {
        await axios.post(MY_SERVER, { username, password,"email":"eamil@aaa.com" }).then(res => console.log(res.data))
    }
    return (
        <div>

            <h1>Register Form</h1>
            <label htmlFor="username">Username:</label>
            <input onChange={(e) => setusername(e.target.value)} /><br />

            <label htmlFor="password">Password:</label>
            <input type="password" onChange={(e) => setpassword(e.target.value)} /><br />

            <input type="button" onClick={() => handleRegister()} value="Register" />
        </div>
    )
}

export default Register