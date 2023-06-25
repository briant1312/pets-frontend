import {logOut} from "../../utilities/users-service.js"
import { useNavigate } from 'react-router-dom';

export default function SignOut({setUser}) {
    const navigate = useNavigate()


    const signOutUser = ()=> {
        setUser(null)
        try {
            logOut()
            navigate("/login")
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <>
            <button onClick={signOutUser}>Sign Out</button>
        </>
    )}
