import React, { useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button, LinearProgress } from '@material-ui/core'
// import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';



const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('male');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
   
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = (email) => {
        // Regular expression for validating email address
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    
    const validatePassword = (password) => {
        // Regular expression for validating password
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return regex.test(password);
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log(name)
        // Reset any previous errors
        setEmailError('');
        setPasswordError('');
    
        // Basic validations
        // if (!name || !email || !phoneNumber || !password || !confirmPassword) {
        //     alert("All fields are required");
        //     return;
        // }
    
        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
          
            return;
        }
    
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      
            return;
        }
    
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            
            return;
        }
    console.log("hello")
        // Make API call for sign-up
        axios.post('https://touchapp.in/auth/register', {
            full_name: name,
            email,
            gender,
            mobile: phoneNumber,
            password,
            username: name
        }, {
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*', 
                // 'Access-Control-Allow-Methods': 'POST', 
                // 'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept', 

            },
           
        })
        .then(response => {
            console.log('Registration Response:', response.data);
            // Redirect to OTP verification page or perform any other action on successful registration
        })
        .catch(error => {
            console.error('Error during registration:', error);
            // Handle error or display an error message to the user
        })
      
    };
    
    

    //styles for register
    const paperStyle = { padding: '30px 20px', width: 400, height:"90vh" ,margin: "30px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    const errorStyle = { color: 'red', fontSize: '0.8rem', marginTop: '5px' };
     const nameStyle = {display: "inline",color: "red",fontSize: "44px",flexGrow: 1,background: "linear-gradient(135deg, #A80306, #E57E75)",WebkitBackgroundClip: "text",backgroundClip: "text",color: "transparent",fontFamily: "Merienda, cursive"};

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                <h2 style={nameStyle}>Touch</h2>
                    {/* <Avatar style={avatarStyle}>
                   
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar> */}
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form onSubmit={handleSignUp}>
                    <TextField fullWidth label='Name' placeholder="Enter your name"  value={name} onChange={(e) => setName(e.target.value)}/>
                    <TextField fullWidth label='Email' placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    {emailError && <Typography style={errorStyle}>{emailError}</Typography>}
                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} style={{ flexDirection: 'row' }}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                             <FormControlLabel value="male" control={<Radio />} label="Male" />
                       </RadioGroup>
                    </FormControl>
                    <TextField fullWidth label='Phone Number' placeholder="Enter your phone number" value={phoneNumber}  onChange={(e) => setPhoneNumber(e.target.value)} />
                    <TextField fullWidth label='Password' placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <TextField fullWidth label='Confirm Password' placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    {passwordError && <Typography style={errorStyle}>{passwordError}</Typography>}
                    <FormControlLabel
                         control={<Checkbox name="termsAccepted" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
                        label="I accept the terms and conditions."
                    />
                    <br></br>
                    <Button type='submit' variant='contained' color='primary' >
                   {/* <NavLink to="/verifyotp" style={{textDecoration:"none",color:"white"}}> Sign Up</NavLink> */}
                   {/* {loading ?  'Sign Up' :<LinearProgress style={{ width: '100%', marginTop: '10px' }} />} */}
                   Sign Up
          
                    </Button>
                </form>
                <Typography >Already have an account?
                     <Link href="#" >
                        <NavLink to="/">Sign In </NavLink>
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Register;
