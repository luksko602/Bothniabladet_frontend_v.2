import React, { useEffect, useState } from 'react'
import Title from './components/Title';
import axios from 'axios'
import PostData from './components/PostData';
import { CircularProgress, Container } from '@material-ui/core';
import Gallery from './components/Gallery';
import Input from './components/Input';
import { Pagination } from '@material-ui/lab';
import Model from './components/Model';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Upload from './Upload';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';


function App() {
  // hämta 10 åt gången från denna array

  // Få information om bilden bredvid enlarged photo

  // Lägga till keywords i front end

  //Images
  const [photos, setPhotos] = useState([]);
  // Selected image
  const [selectedImg, setSelectedImg] = useState(null);
  // Loading circle
  const [loading, setLoading] = useState(true);
  // Input data
  const [formData, setFormData] = useState(null);
  // Pages
  const [page, setPage] = useState();
  //const [loggedIn, setLoggedIn] = useState(false);
  
  // Fetch all images
  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get('http://localhost/bothniabladet/bothniabladet_backend/server/api/image/read.php')
    const data = await response.data;
    setPhotos(data);
    console.log(data);
    console.log(response);
    setLoading(false);
  }
  // Search images by keyword
  // Vet ej hur söka med flera keyword? (Men behövs det? Ändå bra med flera keywords per bild har en bild keyword vatten och träd, kommer den ju upp på båda sökningarna)
  const filterData = async (input) => {
    let request = '';
    
    setLoading(true);

    if(input != null){
      request = (`http://localhost/bothniabladet/bothniabladet_backend/server/api/image/filter.php?keys[0]=${input}`)
    }else{
      request = ('http://localhost/bothniabladet/bothniabladet_backend/server/api/image/read.php')
    }  

    const response = await axios.get(request);
    
    const data = response.data;
    setPhotos(data);

    setLoading(false);
  }
  
  // Handles changes in search field
  const handleChange = (val) => {
    setFormData(val.target.value);
    console.log(val.target.value);
  }
  // Handles search submit
  const handleSubmit = (event) => {
    event.preventDefault();
    filterData(formData);
    // To make empty search for all images
    setFormData(null);
  }
  const pageChange = (event, value) => {
    setPage(value);
    filterData(formData, value);
  }

  // Fetched gallery data
  useEffect(() => {
    fetchData();
  }, [])

  // Show loading circle when loading gallery
  if(loading) return <div id="loadingCircle"style={{
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}><CircularProgress size={100} /></div>;

  /*
  const getLogIn = (loginData) => {
    setLoggedIn(loginData)
    console.log(loggedIn);
  }
  */
  return (
    
    <div className="App">
      <Router>
      <Navbar />
      <Footer />

      <Switch>
    
      <Route path="/upload" component={Upload} />
      <Route path="/contact-us" component={ContactUs} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
    

      <Container>
      <Title />
      <Input change={handleChange} submit={handleSubmit} />
      <div style={{display: 'flex', justifyContent: 'center', margin: '1rem 0',}}>
      <Pagination count={10} variant="outlined" color="primary" size="large" 
      onChange={pageChange} page={page}/>
      </div>
      <Gallery data={photos} setSelectedImg={setSelectedImg}  />
      
      { selectedImg && <Model selectedImg={selectedImg} setSelectedImg={setSelectedImg} /> }
      
      <PostData />

      </Container>
      
      </Switch>
      </Router>
    </div>
   
  );
}

export default App;
