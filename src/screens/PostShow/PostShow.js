import PostShowItem from "../../components/PostShowItem/PostShowItem"
import { useParams } from "react-router-dom"

export default function PostShow() {
    const { resourceId } = useParams()

    return (
        <div>
            <PostShowItem resourceId={resourceId} />
        </div>
    )
}
