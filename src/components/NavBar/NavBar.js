import { Link } from "react-router-dom"
import { logOut } from "../../utilities/users-service"
import { useRef, useState, useEffect } from "react"
import './NavBar.scss'
import '../global.scss'
import logo from '../assets/GrayLogo.svg'
import arrow from '../assets/arrow.svg'
const cats = require('../../data/cats.json')
const dogs = require('../../data/dogs.json')


export default function NavBar({ setUser, user }) {
    const resources = ["Training", "Nutrition", "Healthcare", "Grooming", "Other"]

    const [openCatDropdown, setOpenCatDropdown] = useState(false)
    const [openDogDropdown, setOpenDogDropdown] = useState(false)
    const [openResourceDropdown, setOpenResourceDropdown] = useState(false)

    const handleCatHeaderClick = (e) => {
        e.stopPropagation()
        setOpenDogDropdown(false)
        setOpenResourceDropdown(false)
        setOpenCatDropdown(!openCatDropdown)
    }

    const handleDogHeaderClick = (e) => {
        e.stopPropagation()
        setOpenCatDropdown(false)
        setOpenResourceDropdown(false)
        setOpenDogDropdown(!openDogDropdown)
    }

    const handleResourceHeaderClick = (e) => {
        e.stopPropagation()
        setOpenDogDropdown(false)
        setOpenCatDropdown(false)
        setOpenResourceDropdown(!openResourceDropdown)
    }

    const handleLinkClick = () => {
        setOpenCatDropdown(false)
        setOpenDogDropdown(false)
        setOpenResourceDropdown(false)
    }

    useEffect(() => {
        window.addEventListener("click", handleLinkClick)
        return () => window.removeEventListener("click", handleLinkClick)
    }, [])

    const handleSignOut = () => {
        logOut()
        setUser(null)
    }

    return (
        <nav>
            <div className="outer-div">

                <Link to="/"><img src={logo} className="logo" /></Link>


                <div className="nav-categories">

                    <div>
                        <div onClick={handleCatHeaderClick} className="cats-nav">
                            <h1>Cats</h1>
                            <img src={arrow}
                                className="arrow" />
                        </div>

                        <div className={`cat-dropdown ${openCatDropdown ? '' : 'hidden'}`}>
                            {cats.map((cat) => (
                                <Link
                                    className="breed-link"
                                    to={`cat-breeds/${cat.name}`}
                                    onClick={handleLinkClick}
                                    key={cat.id}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div onClick={handleDogHeaderClick} className="dogs-nav">
                            <h1>Dogs</h1>
                            <img src={arrow}
                                className="arrow" />
                        </div>

                        <div className={`dog-dropdown ${openDogDropdown ? '' : 'hidden'}`}>
                            {dogs.map((dog) => (
                                <Link
                                    className="breed-link"
                                    to={`dog-breeds/${dog.name}`}
                                    onClick={handleLinkClick}
                                    key={dog.id}
                                >
                                    {dog.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div onClick={handleResourceHeaderClick} className="resources-nav">
                            <h1>Resources</h1>
                            <img src={arrow}
                                className="arrow" />
                        </div>

                        <div className={`resource-dropdown ${openResourceDropdown ? '' : 'hidden'}`}>
                            {resources.map((resource) => (
                                <Link to={`/resources/${resource}`} className="breed-link" key={resource} onClick={handleLinkClick}>{resource}</Link>
                            ))}

                            {/* <Link to="resources/training">Training</Link>
                            <Link to="resources/nutrition">Nutrition</Link>
                            <Link to="resources/healthcare">Health Care</Link>
                            <Link to="resources/grooming">Grooming</Link>
                            <Link to="resources/other">Other</Link> */}
                        </div>
                    </div>

                    {user ? <h1 onClick={handleSignOut} className="log-out-link">Log Out</h1> : <Link to="/login"><h1>Register/Sign In</h1></Link>}




                </div>

            </div>
        </nav>
        // <nav>
        //     <Link to="/">Home</Link>
        //     <Link to="/searchbybreed">Search By Breed</Link>
        //     <Link to="/resources">Resources</Link>
        //     <Link to="/profile">Profile</Link>
        //     <Link to="/login">Log In</Link>
        //     <Link to="/signup">Sign Up</Link>
        //     <Link to="posts">Posts</Link>
        //     <Link onClick={handleSignOut} to="/">Sign Out</Link>
        // </nav>
    )
}
