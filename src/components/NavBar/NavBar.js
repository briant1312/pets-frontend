import { Link } from "react-router-dom"
import { logOut } from "../../utilities/users-service"
import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import './NavBar.scss'
import '../global.scss'
import logo from '../assets/GrayLogo.svg'
import arrow from '../assets/arrow.svg'
const cats = require('../../data/cats.json')
const dogs = require('../../data/dogs.json')


export default function NavBar({ setUser }) {
    const dogRef = useRef("")
    const catRef = useRef("")
    const resourceRef = useRef("")

    const navigate = useNavigate()

    const handleDogBreedChange = (e) => {
        catRef.current = ""
        dogRef.current = e.target.value
        navigate(`/dog-breeds/${dogRef.current}`)
    }

    const handleCatBreedChange = (e) => {
        dogRef.current = ""
        catRef.current = e.target.value
        navigate(`/cat-breeds/${catRef.current}`)
    }

    const handleResouceChange = (e) => {
        resourceRef.current = e.target.value
        navigate(`/resources/${resourceRef.current}`)
    }

    const handleSignOut = () => {
        logOut()
        setUser(null)
    }

    return (
        <nav>
            <div className="outer-div">

                <img src={logo} className="logo" />

                <div class="nav-categories">

                    <div>
                        <div className="cats-nav">
                            <h1>Cats</h1>
                            <img src={arrow}
                                className="arrow" />
                        </div>

                        <select className="cat-select" value={catRef} onChange={handleCatBreedChange}>
                            {cats.map((cat) => (
                                <option key={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <div className="dogs-nav">
                            <h1>Dogs</h1>
                            <img src={arrow}
                                className="arrow" />
                        </div>
                        <select className="dog-select" value={dogRef} onChange={handleDogBreedChange}>
                            {dogs.map((dog) => (
                                <option key={dog.id}>{dog.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <div className="resources-nav">
                            <h1>Resources</h1>
                            <img src={arrow}
                                className="arrow" />
                        </div>
                        <select className="resources-select" onChange={handleResouceChange} value={resourceRef.current}>
                            <option>Training</option>
                            <option>Nutrition</option>
                            <option value="Healthcare">Health Care</option>
                            <option>Grooming</option>
                            <option>Other</option>
                        </select>
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
