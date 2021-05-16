import React, {useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { UserContext } from '../UserContext';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  // Logic here
  const [emailData, setEmailData] = useState('');
  const [passwordData, setPasswordData] = useState('');
  const [firstNameData, setFirstNameData] = useState('');
  const [lastNameData, setLastNameData] = useState('');
  const [cityData, setCityData] = useState('');
  const [streetData, setStreetData] = useState('');
  const [postalData, setPostalData] = useState('');
  const [phoneData, setPhoneData] = useState('');

  const {user, setUser} = useContext(UserContext);
  let memberCreated = false;

  const createMember = async (e) => {
    e.preventDefault();
    const formData = new FormData()
        formData.append('email', emailData,)
        formData.append('password', passwordData,)
        formData.append('first_name', firstNameData,)
        formData.append('last_name', lastNameData,)
        formData.append('city', cityData,)
        formData.append('street', streetData,)
        formData.append('postal', postalData,)
        formData.append('phone', phoneData,)
        formData.append('discount_amount', 0,)
        formData.append('member_type', 'c',)

    axios.post('http://localhost/bothniabladet/bothniabladet_backend/server/api/member/create.php', formData, )
    .then(function (response) {
      console.log(response);
      if(response.data.message === 'Post Created'){
        memberCreated = true;
        console.log('skapad');
        login(emailData, passwordData);
      }else{
        console.log('ej skapad');
        memberCreated = false;
      }
      
    })
    .catch(function (error) {
      console.log(error);
      memberCreated = false;
    });
  };
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

}


  const handleChangeEmail = (val) => {
    setEmailData(val.target.value);
  }
  const handleChangePassword = (val) => {
    setPasswordData(val.target.value);
  }
  const handleChangeFirstName = (val) => {
    setFirstNameData(val.target.value);
  }
  const handleChangeLastName = (val) => {
    setLastNameData(val.target.value);
  }
  const handleChangeCity = (val) => {
    setCityData(val.target.value);
  }
  const handleChangeStreet = (val) => {
    setStreetData(val.target.value);
  }
  const handleChangePostal = (val) => {
    setPostalData(val.target.value);
  }
  const handleChangePhone = (val) => {
    setPhoneData(val.target.value);
  }
  if(user){
    return(
      <Container className="signin-box">
      <h1>Account created! </h1>
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
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField onChange={handleChangeFirstName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField onChange={handleChangeLastName}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={handleChangeEmail}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={handleChangePassword}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField onChange={handleChangeCity}
                name="city"
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField onChange={handleChangePostal}
                variant="outlined"
                required
                fullWidth
                id="postal"
                label="Postal Code"
                name="postal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField onChange={handleChangeStreet}
                name=""
                variant="outlined"
                required
                fullWidth
                id="street"
                label="Street"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField onChange={handleChangePhone}
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
              />
            </Grid>

          </Grid>
          <Button onClick={createMember}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/signin' variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}