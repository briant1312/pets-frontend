import { useState } from "react"
import { savePost } from "../../utilities/users-api"
import saveImg from "../assets/Save.svg"
import "./SaveIcon.scss"

export default function SaveIcon({ post, user, userSaved }) {

const [save, setSave] = useState(false)




const handleSavePost = async (e) => {
    e.stopPropagation()
    try {
        await savePost(post._id)
        setSave(true)
    } catch(err) {
        console.error(err)
    }
}
    return (
        <div >
            <img src={saveImg} className="saved" onClick={handleSavePost} height="20px" alt="save" />
        </div>
    )
}