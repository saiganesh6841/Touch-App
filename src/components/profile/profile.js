import { Avatar, Grid, IconButton, Paper } from "@material-ui/core";
import style from "./profile.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import {  useNavigate } from "react-router-dom";

const ProfileDetails = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const userid = localStorage.getItem("userid");
  const token = localStorage.getItem("token");
  const [show,setShow]=useState(false)
  const navigate=useNavigate()
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const response = await axios.post(
          "https://touchapp.in/api/profileInfo",
          {
            profile_id: userid,
            offset: "0",
            limit: "10.6",
          },
          { headers: headers }
        );
        const userData = response.data.message[0].userInfo;
        // Parse profile_social_details if it's a stringified JSON
        userData.profile_social_details = JSON.parse(userData.profile_social_details);
        setUserInfo(userData);
        // const userData = response.data.message[0].userInfo;
        // setUserInfo(userData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProfileDetails();
  }, [userid, headers]);

  if (error) return <p>Error: {error}</p>;

  const logOut=()=>{
    const logoutConfirmed = window.confirm("Are you sure you want to log out?");
    if(logoutConfirmed){
        navigate("/")
    }
  }

  const handleLogout=()=>{
     setShow(!show)
  }

  return (
    <>
      <Grid>
        <Paper elevation={10} className={style.paperStyle} style={{backgroundColor:"#8CB9BD",borderRadius:"20px"}}>
          <h1 className={style.touchStyle}>Touch</h1>

          <Grid>
            <Paper className={style.profile} style={{ backgroundColor: "#344955",borderRadius:"30px" }}>
              <IconButton style={{ position: "absolute", top: "130px", right: "500px",color:"white"}} onClick={handleLogout}>
              <SettingsIcon style={{fontSize:"40px"}}/>
              {show && <span className={style.logoutOption} onClick={logOut}>Logout</span>}
              </IconButton>
             
              {userInfo && userInfo.profile_pic && (
                <Avatar className={style.image} src={userInfo.profile_pic} style={{ width: "100px", height: "100px" }} />
              )}
              {userInfo && userInfo.profile_social_details && (
                <>
                
                  <span className={style.following}>
                    <div>{userInfo.profile_social_details.following_count}</div>
                    Following
                  </span>
                  <span className={style.posts}>
                    <div>{userInfo.profile_social_details.post_count}</div>No of Posts
                  </span>
                
                  <span className={style.followers}>
                    <div>{userInfo.profile_social_details.followers_count}</div>Followers
                  </span>
                  <span className={style.points}>
                    <div>{userInfo.points}</div>Points
                  </span>
                </>
              )}

              <div>
                <h2 className={style.username}>{userInfo?.username}</h2>
                <h5 className={style.firstname}>{userInfo?.first_name}</h5>
              </div>
              
              {/* <h1 style={{color:"red"}} onClick={handleLogout}>Logout<LogoutOutlinedIcon style={{fontSize:"large"}}/></h1> */}
            </Paper>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default ProfileDetails;
