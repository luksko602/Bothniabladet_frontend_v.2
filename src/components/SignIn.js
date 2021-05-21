import React, {useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

/**
 * Sign in component (MaterialUI-Template)
 * Handles sign in logic
 * @author Simon Nilsson, simnil-8
*/

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Bothniabladet
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {

  const classes = useStyles();

  // Holds global user info
  const {user, setUser} = useContext(UserContext);

  // Local useStates
  const [emailData, setEmailData] = useState('');
  const [passwordData, setPasswordData] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
 
    /**
     * Handles log in logic
     * @param {*} email 
     * @param {*} password 
     */
    const login = async (email, password) => {
      // Holds request string
      let request = '';
      // HTTP request
      request = (`http://localhost/bothniabladet/bothniabladet_backend/server/api/member/login.php?email=${email}&password=${password}`)
      const response = await axios.get(request);
      // Response from backend
      const data = response.data;
      console.log(data.status);
      
      // If account exists
      if(data.status){
      // Holds request string
      let requestUser = '';
      // HTTP request
      requestUser = (`http://localhost/bothniabladet/bothniabladet_backend/server/api/member/read_single.php?id=${data.ID_member}`)
      const responseUser = await axios.get(requestUser);
      // Response from backend
      const dataUser = responseUser.data;

      // Set global user information with values from backend
      setUser({...user,
      ID_member: dataUser.ID_member,
      email: dataUser.email,
      password: dataUser.password,
      first_name: dataUser.first_name,
      last_name: dataUser.last_name,
      city: dataUser.city,
      street: dataUser.street,
      postal: dataUser.postal,
      phone: dataUser.phone,
      discount_amount: dataUser.discount_amount,
      member_type: dataUser.member_type,   
  }); 
}else{
  // Gets called if there is no user
  console.log('Log in failed');
  setErrorMessage('Det finns ingen användare med dessa uppgifter!');
  }
}
    // Input handlers
    // Gets called onChange
    const handleChangeEmail = (val) => {
      setEmailData(val.target.value);
    }
    const handleChangePassword = (val) => {
      setPasswordData(val.target.value);
    }
    // If global user contains informaiton (is logged in)
    if(user){
      return(
        <Container className="signin-box">
        <h1>Välkommen {user.first_name} {user.last_name}! </h1>
        <Link to='/account' className="link-style">
        <Button variant="contained" color="primary"  >Mitt konto</Button>
        </Link>
        </Container>
      );
    }
  return (
     
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Logga in
        </Typography>
  
        <form className={classes.form} noValidate>
          <TextField onChange={handleChangeEmail}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField onChange={handleChangePassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Lösenord"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          
          <Button onClick={() => login(emailData, passwordData)}
            
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Logga in
          </Button>
          {errorMessage && <div className="error"> {errorMessage} </div>}

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Glömt ditt lösenord?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/signup' variant="body2">
                {"Har du inget konto? Bli medlem!"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    
    </Container>
    
  );
 
}