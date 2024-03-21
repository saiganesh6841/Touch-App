import { Route, Routes } from "react-router-dom"
import Login from "../screens/preLoginScreens/login/login"
import Register from "../screens/preLoginScreens/register/register"
import VerifyOtp from "../screens/preLoginScreens/otpverify/verifyOtp"
import PostLoginRoutes from "./postLoginRoutes"
import HomePage from "../components/homePage/homePage"
import ProfileDetails from "../components/profile/profile"




const PreLoginRoutes=()=>{

    return(
        <>
         <Routes>
            <Route path="/" Component={Login}/>
            <Route path="/signup" Component={Register}/>
            <Route path="/verifyotp" Component={VerifyOtp} />
            {/* <Route path="/home" Component={HomePage} />
            <Route path="/profile" Component={ProfileDetails}/> */}
         </Routes>
        </>
    )
}

export default PreLoginRoutes