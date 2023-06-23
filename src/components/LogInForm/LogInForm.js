import { useState } from "react"
import { logIn } from "../../utilities/users-api"
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
    // setUser(userToLogIn)
    } catch {
        setError('Error Loggin In')
    }
}

    return (
        <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
            <label>Email</label>
            <input 
                type='email'
                name='email'
                value={credentials.email}
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