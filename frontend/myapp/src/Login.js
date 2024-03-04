import React, { useState } from 'react'
import axios from 'axios'


const Login = () => {

    const MY_SERVER = 'http://127.0.0.1:8000/login/'
    const [username, setusername] = useState("")
    const [password, setpassword] = useState('')
    const [token, settoken] = useState("")
    const [logged, setlogged] = useState(false)
    
    const handleLogin = async () => {
        await axios.post(MY_SERVER, { username, password }).then(res => settoken(res.data.access))
        setlogged(true)
        localStorage.setItem("token", token)
    }

    const handleLogOut = () => {
        setlogged(false)
    }

    // const handleGetMemeberOnlyData = () => {
    //     const MEMEBERS_ONLY = "http://127.0.0.1:8000/members"
    //     const axiosConfig = {
    //         headers: {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'application/json',
    //         },
    //     };
    //     axios.get(MEMEBERS_ONLY, axiosConfig).then(res => console.log('Response:', res.data))
    // }

    return (
        <div>
            {logged ?
                <div>
                    <button onClick={() => handleLogOut()}>Logout</button>
                    {/* <button onClick={() => handleGetMemeberOnlyData()}>members only</button> */}
                </div> :
                <form  >
                    <h1>Login Form</h1>
                    <label htmlFor="username">Username:</label>
                    <input onChange={(e) => setusername(e.target.value)} /><br />

                    <label htmlFor="password">Password:</label>
                    <input type="password" onChange={(e) => setpassword(e.target.value)} /><br />

                    <input type="button" onClick={() => handleLogin()} value="Login" />
                </form>}
            {/* {token} */}
        </div>
    )
}

export default Login