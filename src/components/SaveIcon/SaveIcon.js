import saveImg from "../assets/Save.svg"
import savedImg from "../assets/Saved.svg"
import "./SaveIcon.scss"

export default function SaveIcon({ userSaved }) {


    return (
        <div className="save-icon-container">
            <img src={userSaved ?savedImg : saveImg} height="20px" alt="save" />
            <span>{userSaved ? "Saved" : "Save"}</span>
        </div>
    )
}
