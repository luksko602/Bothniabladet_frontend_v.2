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

  const {user, setUser} = useContext(UserContext);

  const [emailData, setEmailData] = useState('');
  const [passwordData, setPasswordData] = useState('');
  
  
 
    // Logic here
    const login = async (email, password) => {
      //event.preventDefault();
      let request = '';
      
      request = (`http://localhost/bothniabladet/bothniabladet_backend/server/api/member/login.php?email=${email}&password=${password}`)
      
      const response = await axios.get(request);
      //teasdad
      const data = response.data;
      console.log(data.status);

      if(data.status){
      let requestUser = '';
      requestUser = (`http://localhost/bothniabladet/bothniabladet_backend/server/api/member/read_single.php?id=${data.ID_member}`)
      const responseUser = await axios.get(requestUser);
      const dataUser = responseUser.data;

      console.log('ID: ' + dataUser.ID_member);
     
    // setUser(JSON.stringify(dataUser));

    // Array version
    /*
     setUser([
      dataUser.ID_member,
      dataUser.email,
      dataUser.password,
      dataUser.first_name,
      dataUser.last_name,
      dataUser.city,
      dataUser.street,
      dataUser.postal,
      dataUser.phone,
      dataUser.discount_amount,
      dataUser.member_type,   
    ]
  );
    */
  
  // Object version (Krånglar)
     
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
  console.log('Log in failed');
}
  //window.location.reload();
  }



    const handleChangeEmail = (val) => {
      setEmailData(val.target.value);
      console.log(val.target.value);
    }
    const handleChangePassword = (val) => {
      setPasswordData(val.target.value);

    }
    if(user){
      return(
        <Container className="signin-box">
        <h1>Welcome {user.first_name} {user.last_name}! </h1>
        <Link to='/account' className="link-style">
        <Button variant="contained" color="primary"  >My Account</Button>
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
          Sign in
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
            label="Password"
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
            Sign In
          </Button>
     
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/signup' variant="body2">
                {"Don't have an account? Sign Up"}
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