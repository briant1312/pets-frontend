import SignOut  from "../../components/SignOutForm/SignOutForm.js"
const cats = require('../../data/cats.json')
const dogs = require('../../data/dogs.json')

export default function Home({setUser}){
    console.log(cats)
    console.log(dogs)
    return (
    <>
    <h1>Home</h1>
    <SignOut setUser={setUser}/>
    
    </>
)}