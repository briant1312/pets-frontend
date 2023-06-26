import SignOut  from "../../components/SignOutForm/SignOutForm.js"
import { useEffect, useState } from "react"
import { getSavedResources } from "../../utilities/users-api.js"
import { useNavigate } from "react-router-dom"

export default function Home({setUser, user}){
    const [resources, setResources] = useState([])
    const [comments, setComments] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        async function getResources() {
            try {
                const resources = await getSavedResources()
                setResources(resources.savedResources)
                setComments(resources.comments)
            } catch(err) {
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
            <h1>Home</h1>
            {user &&
                <>
                    <p>Profile: {user.userName}</p>
                    <h2>Saved Resources</h2>
                    <div className="resource-container">
                        {resources.map(resource => {
                            return <div className="resource-item" onClick={() => handleShowPost(resource._id)}>
                                <p>{resource.title}</p>
                                <p>{resource.text}</p>
                                <hr/>
                            </div>
                        })}
                    </div>
                    <h2>Reflections</h2>
                    <div className="comments-container">
                        {comments.map(comment => {
                            return <div className="comment-item" onClick={() => handleShowPost(comment.postId._id)}>
                                <p>Original post: {comment.postId?.title}</p>
                                <p>{comment.text}</p>
                                <hr/>
                            </div>
                        })}
                    </div>
                </>
            }
            <SignOut setUser={setUser}/>

        </div>
    )}
