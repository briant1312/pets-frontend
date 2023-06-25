import { Link } from "react-router-dom"
import { logOut } from "../../utilities/users-service"
import { useRef, useState, useEffect } from "react"
import './NavBar.scss'
import '../global.scss'
import logo from '../assets/GrayLogo.svg'
import arrow from '../assets/arrow.svg'
const cats = require('../../data/cats.json')
const dogs = require('../../data/dogs.json')


export default function NavBar({ setUser }) {
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
                        <div className="cats-nav">
                            <h1 onClick={handleCatHeaderClick}>Cats</h1>
                            <img src={arrow}
                                className="arrow" />
                        </div>

                        <div className={`cat-dropdown ${openCatDropdown ? '' : 'hidden'}`}>
                            {cats.map((cat) => (
                                <Link 
                                    to={`cat-breeds/${cat.name}`} 
                                    onClick={handleLinkClick}>
                                        {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="dogs-nav">
                            <h1 onClick={handleDogHeaderClick}>Dogs</h1>
                            <img src={arrow}
                                className="arrow" />
                        </div>

                        <div className={`dog-dropdown ${openDogDropdown ? '' : 'hidden'}`}>
                            {dogs.map((dog) => (
                                <Link 
                                    to={`dog-breeds/${dog.name}`}
                                    onClick={handleLinkClick}>
                                        {dog.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="resources-nav">
                            <h1 onClick={handleResourceHeaderClick}>Resources</h1>
                            <img src={arrow}
                                className="arrow" />
                        </div>

                        <div className={`resource-dropdown ${openResourceDropdown ? '' : 'hidden'}`}>
                            {resources.map((resource) => (
                                <Link to={`/resources/${resource}`} onClick={handleLinkClick}>{resource}</Link>
                            ))}

                            {/* <Link to="resources/training">Training</Link>
                            <Link to="resources/nutrition">Nutrition</Link>
                            <Link to="resources/healthcare">Health Care</Link>
                            <Link to="resources/grooming">Grooming</Link>
                            <Link to="resources/other">Other</Link> */}
                        </div>
                    </div>

                    <Link to="/login"><h1>Register/Sign In</h1></Link>
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
