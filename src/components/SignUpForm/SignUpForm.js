import { Component } from "react";
import { signUp } from "../../utilities/users-service"
import { setUser } from "../../pages/App/AuthPage/AuthPage"
import './SignUpForm.scss'

export default class SignUpForm extends Component {
    // state is just a POJO(plain old javascript object)
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error:''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            error: ''
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        // alert(JSON.stringify(this.state))
        // try something, if it works GREAT, if not go to catch(error handling)
        try {
            // taking the state and making a copy of the state and assigning a variable 'formData'
            const formData = {...this.state}
            delete formData.error
            delete formData.confirm
            console.log(formData)

            // wait for a response back from the server
            const user = await signUp(formData)
            // just for right now console.log
            // console.log(user)
            this.props.setUser(user)

        }catch(error){
            console.log(error)
            this.setState({
                error: 'Sign up failed - Try again later'
            })
        }
    }

    render(){
        const disable = this.state.password != this.state.confirm
        return (
            <div className="form-container">
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input 
                        type='text'
                        name='name'
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                    />
                      <label>Email</label>
                    <input 
                        type='email'
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
                      <label>Password</label>
                    <input 
                        type='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
                      <label>Confirm</label>
                    <input 
                        type='password'
                        name='confirm'
                        value={this.state.confirm}
                        onChange={this.handleChange}
                        required
                    />
                    <button type="submit" disabled={disable}>Sign Up</button>
                </form>
                <p className="error-message">{this.state.error}</p>
            </div>
        )
    }
}