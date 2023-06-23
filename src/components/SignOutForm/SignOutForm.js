import {logOut} from "../../utilities/users-service.js"
import { useNavigate } from 'react-router-dom';

export default function SignOut() {
    const navigate = useNavigate()


    const signOutUser = ()=> {
            logOut()
            navigate("/login")
        }

    return (
    <>
    <button onClick={signOutUser}>Sign Out</button>
    </>
)}
