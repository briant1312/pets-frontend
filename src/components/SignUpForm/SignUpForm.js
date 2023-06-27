import { signUp } from "../../utilities/users-service"
import { useState } from 'react'
import './SignUpForm.scss'
import { Link, useNavigate } from "react-router-dom"


export default function SignUpForm({ setUser }) {
    // state is just a POJO(plain old javascript object)
    const [state, setState] = useState({
        userName: '',
        password: '',
        confirm: '',
        error: ''
    })

    const navigate = useNavigate()


    const handleChange = (event) => 
        setState({
            ...state,
            [event.target.name]: event.target.value,
            error: ''
        })
    

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            // taking the state and making a copy of the state and assigning a variable 'formData'
            const formData = {userName: state.userName, password: state.password}
           
            // wait for a response back from the server
            const user = await signUp(formData)
            setUser(user)
            navigate('/')
        } catch (error) {
            console.error(error)
            setState({
                ...state,
                error: 'Sign up failed - Try again later'
            })
        }
    }

    const disable = state.password != state.confirm
    return (
        <div className="form-container">
            <form autoComplete="off" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type='text'
                    name='userName'
                    value={state.userName}
                    onChange={handleChange}
                    required
                />
                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    value={state.password}
                    onChange={handleChange}
                    required
                />
                <label>Confirm</label>
                <input
                    type='password'
                    name='confirm'
                    value={state.confirm}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            <p>Have an account? <Link to="/login">Sign in</Link></p>
            <p className="error-message">{state.error}</p>
        </div>
    )
}
