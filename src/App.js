// import { Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./components/SignUpForm/SignUpForm.js";
import LogInForm from "./components/LogInForm/LogInForm.js"
import SignOutForm from "./components/SignOutForm/SignOutForm.js"
import Home from './screens/Home/Home.js'
import { getUser } from "./utilities/users-service.js"
import { useState } from "react"

function App() {
  const [user, setUser] = useState(getUser())
  return (
    <div className="App">
      {/* <Outlet/> */}
      <Routes>
        <Route 
                path="/" 
                element={<Home setUser={setUser}/>}/>
        <Route
                path="signup"
                element={<SignUpForm setUser={setUser}/>}/>
        <Route
                path="login"
                element={<LogInForm setUser={setUser}/>}/>
        <Route
                path="signout"
                element={<SignOutForm setUser={setUser}/>}/>
      </Routes>
    </div>
  );
}

export default App;
