// import { Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./components/SignUpForm/SignUpForm.js";
import LogInForm from "./components/LogInForm/LogInForm.js"
import Home from './screens/Home/Home.js'

function App() {
  return (
    <div className="App">
      {/* <Outlet/> */}
      <Routes>
        <Route 
                path="/" 
                element={<Home/>}/>
        <Route
                path="signup"
                element={<SignUpForm/>}/>
        <Route
                path="login"
                element={<LogInForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
