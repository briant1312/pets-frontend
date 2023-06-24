import { Link } from "react-router-dom"
import { logOut } from "../../utilities/users-service"

export default function NavBar({ setUser }) {
    const handleSignOut = () => {
        logOut()
        setUser(null)
    }

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/searchbybreed">Search By Breed</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="posts">Posts</Link>
            <Link onClick={handleSignOut} to="/">Sign Out</Link>
        </nav>
    )
}
