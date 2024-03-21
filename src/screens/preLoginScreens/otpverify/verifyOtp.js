import { Button, Card, CardMedia, Grid, Input, Link, Paper, TextField, Typography } from "@material-ui/core"
import axios from "axios";
import { useState } from "react";


const VerifyOtp=()=>{
    const [otp, setOtp] = useState(['', '', '', '','','']);

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    // If you want to move to the next input box automatically
    if (index < otp.length - 1 && value !== '') {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    setOtp(newOtp);
  };

  //to verify otp
  const handleVerifyOtp=()=>{
    const enteredOtp = otp.join('')
    console.log(enteredOtp)
    axios.post('https://touchapp.in/auth/verifyOtp', { otp: enteredOtp })
      .then(response => {
        // Handle the API response here
        console.log('API Response:', response.data);
      })
      .catch(error => {
        console.error('Error during API call:', error);
      });
  }
    
    const paperStyle={padding :20,height:"80vh",width:350 , margin:"40px auto"}
    const textStyle={width:"50px",padding:"10px",outline:"none",textAlign:"center"}
    const nameStyle = {display: "inline",color: "red",fontSize: "44px",flexGrow: 1,background: "linear-gradient(135deg, #A80306, #E57E75)",WebkitBackgroundClip: "text",backgroundClip: "text",color: "transparent",fontFamily: "Merienda, cursive"
  };
    return(
        <>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
            <span style={nameStyle}>Touch</span>
            <Card style={{ marginTop: '30px' }}>
            
      <CardMedia
        component="img"
        alt="Your Image Alt Text"
        height="140"
        image="https://img.freepik.com/premium-vector/password-code-verification-mobile-phone-2-step-verification-smartphone-security_530733-2784.jpg?size=626&ext=jpg&ga=GA1.1.1415618206.1707587860&semt=sph" // Replace with the actual path to your image
      />
    </Card>
    <h2 style={{color:"blue",fontStyle:"italic"}}>OTP Verification</h2>
    <p>Enter the OTP sent to you</p>
{/* this is for otp fields */}
    <Grid container spacing={1}>
      {otp.map((digit, index) => (
        <Grid item xs={2} key={index}>
          <TextField
            id={`otp-input-${index}`}
            type="text"
            variant="outlined"
            size="small"
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            inputProps={{
              maxLength: 1,
              style: { textAlign: 'center', fontSize: '1.5rem' },
            }}
          />
        </Grid>
      ))}
    </Grid>
  <br/>
    <Typography>Don't receive OTP?
    <br/> <Link href="#" >
                        RESEND OTP
                </Link>
                 </Typography>
                 <br/>
                 <Button type="submit" color="primary" variant="contained"  fullWidth onClick={handleVerifyOtp}>Verify OTP</Button>
            </Paper>
        </Grid>
        </>
    )
}
export default VerifyOtp;