import { BrowserRouter } from "react-router-dom"
import PreLoginRoutes from "./preLoginRoutes"
import PostLoginRoutes from "./postLoginRoutes"
import { createContext, useState } from "react"


export const Auth=createContext()

const Navigation=()=>{

const [login,setLogin]=useState(false)

const loginTrue=()=>{
    setLogin(true)
}
const logout = () => {
    setLogin(false); 
  };

    return(
        <>
        <Auth.Provider value={{loginTrue,logout}}>
        <BrowserRouter>
         
         
        
        {
          login?
           <PostLoginRoutes/> 
          :
          <PreLoginRoutes/>
        }
        
        </BrowserRouter>
        </Auth.Provider>
        </>
    )
}
export default Navigation