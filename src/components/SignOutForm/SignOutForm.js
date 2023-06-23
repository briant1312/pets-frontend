import {logOut} from "../../utilities/users-service.js"
import { useNavigate } from 'react-router-dom';

export default function SignOut({setUser}) {
    const navigate = useNavigate()


    const signOutUser = ()=> {
            setUser(null)
            logOut()
            navigate("/login")
        }

    return (
    <>
    <button onClick={signOutUser}>Sign Out</button>
    </>
)}
