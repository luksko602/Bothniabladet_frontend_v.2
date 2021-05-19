import React, { useEffect, useState, useMemo } from 'react'
import Title from './components/Title';
import axios from 'axios'
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
import { UserContext } from './UserContext';
import NavbarMember from './components/Navbar/NavbarMember';
import Account from './Account';
import Footer from './components/Footer';

function App() {
  
  const [user, setUser] = useState({
       ID_member: null, 
       email: null,     
      password: null,   
      first_name: null,  
      last_name: null,    
      city: null,         
      street: null,       
      postal: null,       
      phone: null,        
      discount_amount: null,  
      member_type: null,     
    }   
  );

  const value = useMemo(() => ({user, setUser}), [user, setUser]);
  //Images
  const [photos, setPhotos] = useState([]);
  // Selected image
  const [selectedImg, setSelectedImg] = useState(null);
  // Loading circle
  const [loading, setLoading] = useState(true);
  // Input data
  const [formData, setFormData] = useState(null);

  // Pages
  const [page, setPage] = useState(1);
  
  let pageIncrease = 6;
  let initStart = 0;
  let initEnd = pageIncrease;
  
  const [pageAmount, setPageAmount] = useState({start: initStart, end: initEnd});
  const [maxPages, setMaxPages] = useState(null);
  

  // Load user data from storage
  useEffect(() => {
    
    const data = localStorage.getItem('myUser');
    if(data) {
      setUser(JSON.parse(data));
    }  
  }, []);

  // Save user data to local storage
  useEffect(() => {
    localStorage.setItem('myUser', JSON.stringify(user));
  });
  
  // Hämta 10st beroende på page nr?

  // Fetch all images
  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get('http://localhost/bothniabladet/bothniabladet_backend/server/api/image/read.php')
    const data = await response.data;
    
    setPhotos(data);
    console.log(data);
    console.log(response);

    calcPages(data);

    setLoading(false);
  }

  const filterData = async (input) => {
    let request = '';
    
    setLoading(true);

    if(input != null){
      request = (`http://localhost/bothniabladet/bothniabladet_backend/server/api/image/filter.php?keys[0]=${input}`)
    }else{
      request = ('http://localhost/bothniabladet/bothniabladet_backend/server/api/image/read.php')
    }  

    const response = await axios.get(request).then(function (response) {
      // handle success
      console.log(response);
      const data = response.data;
    
      setPhotos(data);
      
      // Auto sets paginaiton to first page
      setPageFunction(1);

      calcPages(data);
      
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
    
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

    // Reset formdata, To make empty search for all images
    
    setFormData(null);
 
  }
  const setPageFunction = (value) => {
    setPage(value);
    let pages = null;
 
    let start = initStart; // 1 page, start value
    let end = initEnd; // 1 page, end value
    let i;
    for (i = 1; i < value; i++) {
        start += pageIncrease;
        end += pageIncrease;
      }
      
      pages = {pageAmount, start: start, end: end};

    setPageAmount(pages);
    
  }
  const pageChange = (event, value) => { 
    setPageFunction(value);
  }
  // Calc number of pages for pagination
  const calcPages = (data) => {
    // Set it to 1st page on new search

    console.log('Antal bilder: ' + Object.keys(data.images).length);
    let result = Math.ceil(Object.keys(data.images).length / pageIncrease);
    console.log('Antal sidor: ' + result);
    setMaxPages(result);
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

 
  return (
    
    <div className="App">
      <UserContext.Provider value={value}>
      <Router>
      { user ? <NavbarMember /> : <Navbar /> }
      <Footer />
      

      <Switch>
      <Route path="/upload" component={Upload} />
      <Route path="/contact-us" component={ContactUs} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/account" component={Account} />

      <Container>

      <Title />
      <Input change={handleChange} submit={handleSubmit} />
      <div style={{display: 'flex', justifyContent: 'center', margin: '1rem 0',}}>
      <Pagination count={maxPages} variant="outlined" color="primary" size="large"
      onChange={pageChange} page={page}/>
      </div>
      <Gallery data={photos} setSelectedImg={setSelectedImg} pageAmount={pageAmount}  />
      
      { selectedImg && <Model selectedImg={selectedImg} setSelectedImg={setSelectedImg} /> }
      
      </Container>
      
      </Switch>
      </Router>
      </UserContext.Provider>
    </div>
   
  );
}

export default App;
