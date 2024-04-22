
import { Avatar, Button, Checkbox, FormControlLabel,Alert, Grid, Link, Paper, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { NavLink, useNavigate } from "react-router-dom";
import { Details } from "@mui/icons-material";
import { Auth } from "../../../navigationStack/navigation";


const Login=()=>{
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

    const [userName,setUserName]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    console.log("hell")
    const {loginTrue}=useContext(Auth)
    console.log(loginTrue)

  const handleUsername=(e)=>{
    setUserName(e.target.value)
  }

  const handlePassword=(e)=>{
    setPassword(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userName || !password) {
      alert("Username and password are required");
      return;
    }
    const userInfo = {
      mobile: userName,
      password,
      udid: "uiqyiyuiyfgyyet",
      fcm_token: "786786786a7dasdasdsfgyyert",
    };

    userDetails(userInfo);
  }

  const userDetails = (userInfo) => {
    axios.post("https://touchapp.in/auth/login", userInfo, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("userid", res.data.data.user.userid);
      console.log(res.data.data.user.userid);
      setAlertMessage(res.data.message);
      setAlertSeverity("success");
      setIsAlertOpen(true);
      setTimeout(() => {
        loginTrue();
        navigate("/home");
      }, 1000); // Navigate after 2 seconds
   
    })
    .catch((error) => {
      console.log(error);
      setAlertMessage("Invalid Details");
      setAlertSeverity("error");
      setIsAlertOpen(true);
    });
  }

const paperStyle={padding :20,height:"60vh",width:400 , margin:"90px auto"}
const avatarStyle={backgroundColor:"#1bbd7e"}
const btnStyle={margin:"8px 0"}
const nameStyle = {display: "inline",color: "red",fontSize: "44px",flexGrow: 1,background: "linear-gradient(135deg, #A80306, #E57E75)",WebkitBackgroundClip: "text",backgroundClip: "text",color: "transparent",fontFamily: "Merienda, cursive"};
    return(
        <>
         {isAlertOpen && (
            <Alert
            severity={alertSeverity}
            onClose={() => setIsAlertOpen(false)}
            open={isAlertOpen}
            style={{ position: "fixed", top: 5, width: "100%", zIndex: 9999,height:60 }}
          >
            {alertMessage}
          </Alert>
                )}
       <Grid>
        <Paper elevation={15} style={paperStyle}>
          <Grid align="center">
          <h2 style={nameStyle}>Touch</h2>
          {/* <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar> */}
          <h2>Sign In</h2>
          </Grid>
          
         <form onSubmit={handleSubmit}>
         <TextField label="username/mobile No/email" placeholder="Enter username" variant="standard" fullWidth required onChange={handleUsername}/><br></br>
          <br></br>
          <TextField label="password" placeholder="Enter password" variant="standard" type="password" fullWidth required onChange={handlePassword} />  <br></br>
          {/* <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 /> */}
                 <br></br> 
                 <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>Sign in</Button>
         </form>
                 <Typography>
                 <Link href="#" >
                        Forgot password ?
                </Link>
                 </Typography><br></br>
                 <Typography > Do you have an account ?
                     <Link href="#" >
                        <NavLink to="/signup">Sign Up </NavLink>
                </Link>
                </Typography>
               
        </Paper>
       </Grid>
       <div>
        <h5>username:ganesh00</h5>
        <h5>password:Test@123</h5>
       </div>
        </>
    )
}

export default Login