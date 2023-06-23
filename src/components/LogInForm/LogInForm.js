import { useState } from "react"
import { logIn } from "../../utilities/users-api"
import { getUser } from "../../utilities/users-service.js"
import './LogInForm.scss'

// export default function LogInForm(){
//     return <h1>LogInForm</h1>
// }

export default function LogInForm(){
    const [credentials, setCredentials] = useState({
        userName: '',
        password: ''
    })
    const [error, setError] = useState('')

function handleChange(event){
    setCredentials({
        ...credentials,
        [event.target.name]: event.target.value,
    })
}

async function handleSubmit (event){
    try{
    event.preventDefault()
    const userToLogIn = await logIn(credentials)
    window.localStorage.setItem('token', userToLogIn)
    console.log(userToLogIn)
    const user = getUser()
    console.log(user)
    // setUser(userToLogIn)
    } catch {
        setError('Error Loggin In')
    }
}

    return (
        <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
            <label>userName</label>
            <input 
                type='text'
                name='userName'
                value={credentials.userName}
                onChange={handleChange}
                required
            />
              <label>Password</label>
            <input 
                type='password'
                name='password'
                value={credentials.password}
                onChange={handleChange}
                required
            />
            <button type="submit">Log In</button>
        </form>
        <p className="error-message">{error}</p>
    </div>
    )
    
}