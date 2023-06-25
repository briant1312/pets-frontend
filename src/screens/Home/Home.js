import SignOut  from "../../components/SignOutForm/SignOutForm.js"

export default function Home({setUser}){
    return (
        <>
            <h1>Home</h1>
            <SignOut setUser={setUser}/>

        </>
    )}
