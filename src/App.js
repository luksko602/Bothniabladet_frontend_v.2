import React, { useEffect, useState, useMemo } from "react";
import Title from "./components/Title";
import axios from "axios";
import { CircularProgress, Container } from "@material-ui/core";
import Gallery from "./components/Gallery";
import Input from "./components/Input";
import { Pagination } from "@material-ui/lab";
import Model from "./components/Model";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Upload from "./Upload";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";
import { UserContext } from "./UserContext";
import NavbarMember from "./components/Navbar/NavbarMember";
import Account from "./Account";

/**
 * Main App
 * Handles search logic
 * Returns the components used
 * @author Simon Nilsson, simnil-8
*/

function App() {
  // Global user
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
  });
  // Hook that returns the memorized value of user
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  // Stores all returned images from backend
  const [photos, setPhotos] = useState([]);
  // Store the selected image
  const [selectedImg, setSelectedImg] = useState(null);
  // Loading circle
  const [loading, setLoading] = useState(true);
  // Holds input data
  const [formData, setFormData] = useState(null);

  // Stores which page it's currently on
  const [page, setPage] = useState(1);
  
  // Stores values for pagination
  let pageIncrease = 6;
  let initStart = 0;
  let initEnd = pageIncrease;
  // Stores page values in a useState (decides number of images per page)
  const [pageAmount, setPageAmount] = useState({
    start: initStart,
    end: initEnd,
  });
  // Store the max numbers of pages
  const [maxPages, setMaxPages] = useState(null);

  // Load user data from local storage
  useEffect(() => {
    const data = localStorage.getItem("myUser");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  // Save user data to local storage
  useEffect(() => {
    localStorage.setItem("myUser", JSON.stringify(user));
  });

  /**
   * Fetches all images from backend
   */
  const fetchData = async () => {
    // Show loading circle
    setLoading(true);
    // HTTP request
    const response = await axios.get(
      "http://localhost/bothniabladet/bothniabladet_backend/server/api/image/read.php"
    );
    console.log(response);
    // Stores response
    const data = await response.data;
    // Store photos from backend 
    setPhotos(data);
    // Calculate number of pages needed depending on images fetched from backend
    calcPages(data);
    // Hide loading circle when done
    setLoading(false);
  };
  /**
   * Fetches certain images from backend based on input value
   * @param {*} input 
   */
  const filterData = async (input) => {
    // Store request string
    let request = "";
    //  Show loading circle
    setLoading(true);
    // Check if input is not null
    if (input != null) {
      // string for HTTP request with input
      request = `http://localhost/bothniabladet/bothniabladet_backend/server/api/image/filter.php?keys[0]=${input}`;
    } else {
      // string for HTTP request without input (fetches all images)
      request =
        "http://localhost/bothniabladet/bothniabladet_backend/server/api/image/read.php";
    }
    // HTTP request
    await axios
      .get(request)
      .then(function (response) {
        // handle success
        console.log(response);
        // Stores response
        const data = response.data;
        // Stores photos fetched from backend
        setPhotos(data);
        // Auto sets paginaiton to first page
        setPageFunction(1);
        // Calculate how many pages are needed
        calcPages(data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
      // Hide loading circle
    setLoading(false);
  };

  // Handles changes in search field
  // Called onChange in textfield
  const handleChange = (val) => {
    // Store current value in a useState
    setFormData(val.target.value);
  };
  // Handles search submit
  const handleSubmit = (event) => {
    event.preventDefault();
    // Search for images with current value from the form data useState
    filterData(formData);

    // Reset formdata, To make empty search for all images
    setFormData(null);
  };
  const setPageFunction = (value) => {
    // Set pagination page to the value
    setPage(value);
    let pages = null;
    // Calculate the values for pagination needed to show the correct images in Gallery
    let start = initStart; // first page, start value
    let end = initEnd; // first page, end value
    let i;
    for (i = 1; i < value; i++) {
      start += pageIncrease;
      end += pageIncrease;
    }

    pages = { pageAmount, start: start, end: end };

    setPageAmount(pages);
  };
  // Called when page changes
  const pageChange = (event, value) => {
    setPageFunction(value);
  };
  // Calc number of pages for pagination
  const calcPages = (data) => {
    console.log("Antal bilder: " + Object.keys(data.images).length);
    // Calculate the number of pages needed depnding of images fetched from backend
    // Round the result to an even value
    let result = Math.ceil(Object.keys(data.images).length / pageIncrease);
    console.log("Antal sidor: " + result);
    // Set and store the max number of pages needed
    setMaxPages(result);
  };

  // Fetches all images of app load
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show loading circle when loading gallery
  if (loading)
    return (
      <div
        id="loadingCircle"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={100} />
      </div>
    );

  return (
    <div className="App">
      <UserContext.Provider value={value}>
        <Router>
          {user ? <NavbarMember /> : <Navbar />}

          <Switch>
            <Route path="/upload" component={Upload} />
            <Route path="/contact-us" component={ContactUs} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/account" component={Account} />

            <Container>
              <Title />
              <Input change={handleChange} submit={handleSubmit} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "1rem 0",
                }}
              >
                <Pagination
                  count={maxPages}
                  variant="outlined"
                  color="primary"
                  size="medium"
                  onChange={pageChange}
                  page={page}
                />
              </div>
              <Gallery
                data={photos}
                setSelectedImg={setSelectedImg}
                pageAmount={pageAmount}
              />

              {selectedImg && (
                <Model
                  selectedImg={selectedImg}
                  setSelectedImg={setSelectedImg}
                />
              )}
            </Container>
          </Switch>
          <Footer />
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
