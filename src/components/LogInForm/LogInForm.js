import { useState } from "react"
import { logIn } from "../../utilities/users-api"
import { getUser } from "../../utilities/users-service.js"
import { Link, useNavigate } from 'react-router-dom';
// import './LogInForm.scss'
import paw from "../assets/paw.svg"


export default function LogInForm({ setUser }) {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        userName: '',
        password: ''
    })
    const [error, setError] = useState('')

    function handleChange(event) {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        })
    }
    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const userToLogIn = await logIn(credentials)
            if (userToLogIn) {
                window.localStorage.setItem('token', userToLogIn)
                const user = getUser()
                setUser(user)
                navigate('/')
            } else {
                throw new Error("")
            }
        } catch(err) {
            setError(err.message)
        }
    }

    return (
        <div className="form-container">
            <div className="fetch-heading">
                <h1>Good, Human.</h1>
                <img src={paw} alt="paw" />
            </div>
            <form autoComplete="off" onSubmit={handleSubmit}>

                <label>Username</label>
                <input
                    type='text'
                    name='userName'
                    value={credentials.userName}
                    onChange={handleChange}
                    placeholder="Enter Username"
                    required
                />
                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    required
                />
                <button type="submit">Log In</button>
            </form>
            <p>Need an account? <Link to="/signup">Create an account</Link></p>
            <p className="error-message">{error}</p>
        </div>
    )

}
