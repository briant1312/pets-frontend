import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom"
import App from "./App"
import SignUpForm from './components/SignUpForm/SignUpForm'
import LogInForm from "./components/LogInForm/LogInForm"

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<App/>}>
            <Route
                path="signup"
                element={<SignUpForm/>}/>
            <Route
                path="login"
                element={<LogInForm/>}/>
        </Route>
    </>
))

export default router


{/* <Route path="/" element={<App/>}>
            <Route
                path=""
                loader={indexLoader}
                element={<Index/>}/>
            <Route
                path="todo/:id"
                loader={showLoader}
                element={<Show/>}/>
            <Route
                path="create"
                action={createAction}/>
            <Route
                path="update/:id"
                action={updateAction}/>
            <Route 
                path="delete/:id"
                action={deleteAction}/>
    </Route> */}