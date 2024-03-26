import { BrowserRouter } from "react-router-dom"
import PreLoginRoutes from "./preLoginRoutes"
import PostLoginRoutes from "./postLoginRoutes"
import { createContext, useEffect, useState } from "react"


export const Auth=createContext()

const Navigation=()=>{
  const [login, setLogin] = useState(() => {
   
    const loggedIn = sessionStorage.getItem("loggedIn")
    return loggedIn === "true"
})

useEffect(() => {
    
    sessionStorage.setItem("loggedIn", login ? "true" : "false")
}, [login])

const loginTrue=()=>{
    setLogin(true)
    // sessionStorage.setItem("loggedIn","true")
}
const logout = () => {
    setLogin(false);
    // sessionStorage.removeItem("loggedIn") 
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