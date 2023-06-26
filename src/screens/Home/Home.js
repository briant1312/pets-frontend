import SignOut from "../../components/SignOutForm/SignOutForm.js"
import { useEffect, useState } from "react"
import { getSavedResources } from "../../utilities/users-api.js"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./Home.scss"
import headlineImg from '../../components/assets/headline-article-img.jpg'
import groomingImg from '../../components/assets/grooming-img.jpg'
import saveIcon from '../../components/assets/Save.svg'

export default function Home({ setUser, user }) {
    const [resources, setResources] = useState([])
    const [comments, setComments] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        async function getResources() {
            try {
                const resources = await getSavedResources()
                setResources(resources.savedResources)
                setComments(resources.comments)
            } catch (err) {
                console.error(err)
            }
        }
        getResources()
    }, [user])

    const handleShowPost = (postId) => {
        navigate(`/show/${postId}`)
    }

    return (
        <div>

            <div className="headline-div">
                <div className="headline-article-container">
                    <div className="text">
                        <h1>Today's Headline Article</h1>
                        <p>How to help your pet beat the summer heat</p>
                    </div>
                    <img className="home-img" src={headlineImg} alt="dog" />
                </div>

                <div className="grooming-article-container">
                    <img className="home-img" src={groomingImg} alt="dog" />
                    <div className="text">
                        <h1>Grooming</h1>
                        <p>Everything you need to know about grooming your pet, all in one place.</p>
                        <Link to="/resources/grooming">
                            <button>Learn More About Pet Grooming →</button>
                        </Link>
                    </div>

                </div>

            </div>


            {user &&
                <div className="dashboard">
                    <div className="profile-info">
                        <p><b>Profile</b> <img src={user.imageUrl} height="20px" alt="profile picture"/> @{user.userName}</p>
                        <p><b>Status Omega</b></p>
                    </div>

                    <div className="saved-section">
                        <div className="save-heading-div">
                        <img src={saveIcon} alt=""
/>                        <h2>Saved Resources</h2>
</div>
                        <div className="resource-container">
                            {resources.map(resource => {
                                return <div key={resource._id} className="resource-item" onClick={() => handleShowPost(resource._id)}>
                                    <img src={resource.imageUrl} alt="resource image" />
                                    <p><b>{resource.title}</b></p>
                                </div>
                            })}
                        </div>
                    </div>
                    <h2>Reflections</h2>
                    <div className="comments-container">
                        {comments.map(comment => {
                            return <div key={comment._id} className="comment-item" >
                                <span>Resource: </span>
                                <Link key={comment.postId?._id} to={`/show/${comment.postId?._id}`}> {comment.postId?.title}</Link>
                                <p>{comment.text}</p>
                                <hr />
                            </div>
                        })}
                    </div>
                </div>
            }
        </div>
    )
}
