import saveImg from "../assets/Save.svg"
import "./SaveIcon.scss"

export default function SaveIcon({ userSaved }) {


    return (
        <div >
            <img src={saveImg} className="saved"  height="20px" alt="save" />
            <span>{userSaved ? "Saved" : "Save"}</span>
        </div>
    )
}
