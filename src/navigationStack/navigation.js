import { BrowserRouter } from "react-router-dom"
import PreLoginRoutes from "./preLoginRoutes"
import PostLoginRoutes from "./postLoginRoutes"



const Navigation=()=>{

    return(
        <>
        <BrowserRouter>
         
         {/* <PostLoginRoutes/> */}
        <PreLoginRoutes/>
        
        </BrowserRouter>
        </>
    )
}
export default Navigation