import { Route, Routes } from "react-router-dom"
import HomePage from "../components/homePage/homePage"
import ProfileDetails from "../components/profile/profile"




const PostLoginRoutes=()=>{

    return(
        <>
         <Routes>
            <Route path="/home" Component={HomePage} />
            <Route path="/profile" Component={ProfileDetails}/>
         </Routes>
        </>
    )
}

export default PostLoginRoutes