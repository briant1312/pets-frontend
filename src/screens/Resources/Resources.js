import { useParams } from 'react-router-dom'
import PostList from '../../components/PostList/PostList'

export default function Resources() {
    const { resource } = useParams()
    return (
        <div>
            <h1>resource</h1>
            <PostList />
        </div>
    )
}
