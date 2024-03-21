import { Avatar, Grid, Paper } from "@material-ui/core"
import { CameraAltOutlined } from "@mui/icons-material"
import Card from "./card"
import CardPosts from "./card"
import { useDispatch } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { fetchPosts } from "../redux/action"
import Webcam from "react-webcam"
import { Link } from "react-router-dom"




const HomePage=()=>{

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const handleCamera = () => {
      console.log("camera");
      // Trigger the file input
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

 

    const paperStyle={padding :20,width:600 , margin:"0px auto",backgroundColor:"#485563"}
    const camStyle={color:"white",backgroundColor:"white",width:"55px",height:"55px"}
    const nameStyle = {display: "inline",color: "red",fontSize: "44px",marginLeft: "10px",flexGrow: 1,background: "linear-gradient(135deg, #A80306, #E57E75)",WebkitBackgroundClip: "text",backgroundClip: "text",color: "transparent",fontFamily: "Merienda, cursive"
    };
    const gridStyle = { display: "flex", alignItems: "center", justifyContent: "space-between" };
    const profileStyle={width:"50px",height:"50px",marginBottom: "5px"}

    return(
        <>
       <div >
         <Grid >
            <Paper elevation={10} style={paperStyle}>
            <Grid style={gridStyle} >
               <Avatar style={camStyle} onClick={handleCamera} >
                <CameraAltOutlined style={{width:"50px",height:"50px",color:"black"}}/>
               </Avatar>
            
             <h2 style={nameStyle}>Touch</h2>
            <Link to="/profile">
            <Avatar style={profileStyle} />
            </Link>
              </Grid>

              <CardPosts/>

            </Paper>
        </Grid>
       </div>
        </>
    )
}
export default HomePage