import PostShowItem from "../../components/PostShowItem/PostShowItem"
import { useParams } from "react-router-dom"
import "./PostShow.scss"

export default function PostShow({ user, setUser }) {
    const { resourceId } = useParams()

    return (
        <div>
            <PostShowItem resourceId={resourceId} setUser={setUser} user={user}/>
        </div>
    )
}
