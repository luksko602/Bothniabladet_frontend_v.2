import {
  Button,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { motion } from "framer-motion";

/**
 * Model component
 * Handles viewing and modification of a selected image
 * @author Simon Nilsson, simnil-8
*/

const StyledInput = withStyles({
  root: {
    borderRadius: 3,
    color: "white",
    height: 48,
    padding: "10px",
    borderBottom: "1px solid white",
  },
})(Input);

const Model = ({ selectedImg, setSelectedImg }) => {
  // Get global user
  const { user } = useContext(UserContext);
  // Store if user is trying to edit keys
  const [editKeys, setEditKeys] = useState(false);
  // Store input from user for a new keyword
  const [keyData, setKeyData] = useState("");
  // Store if image has limited usage
  const [limitedUsage, setLimitedUsage] = useState(true);
  // Sucess message
  const [addedSucess, setAddedSucess] = useState(false);

  // Store if image info is selected
  const [imageInfo, setImageInfo] = useState(false);
  // Store if user is trying to delete the image
  const [tryDelete, setTryDelete] = useState(false);

  // Stores data fetched from the backend
  const [photographerData, setPhotographerData] = useState(null);
  const [cameraData, setCameraData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [resolutionData, setResolutionData] = useState(null);
  const [GPS_coordinatesData, setGPS_coordinatesData] = useState(null);
  const [limited_usageData, setLimited_usageData] = useState(null);
  const [publishedData, setPublishedData] = useState(false);
  const [keywordsData, setKeywordsData] = useState([]);
  
  // Check if image  has limited usage
  const checkIfLimited = () => {
    if (selectedImg.limited_usage < 0) {
      setLimitedUsage(false);
    } else {
      setLimitedUsage(true);
    }
  };
  // Will exit model view if user clicks outside image (on backdrop)
  const handleClick = (e) => {
    // Check if clicked outside of image
    if (e.target.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };
  // Gets called when a image is selected
  useEffect(() => {
    checkIfLimited();
  });
  // Toggles edit key function
  const toggleEditKeys = () => {
    setEditKeys(!editKeys);
    setAddedSucess(false);
  };
  // Stores value user enters
  const handleChangeKeys = (val) => {
    setKeyData(val.target.value);
  };
  // Send the new key to backend
  // Connects the keyword with the selected image
  const submitKey = () => {
    // Appends new keyword and image ID to form data
    const formData = new FormData();
    formData.append("keyword", keyData);
    formData.append("ID_image", selectedImg.ID_image);
    // Checks if something has been entered
    if (keyData.length > 0) {
      // HTTP request
      axios
        .post(
          "http://localhost/bothniabladet/bothniabladet_backend/server/api/keyword/keyword_connect.php",
          formData
        )
        .then((res) => {
          console.log(res);
        });
    } else {
      // Won't post
      console.log("Did not submit, value is empty");
    }
    // Resets and hide add key textfield
    setEditKeys(false);
    setAddedSucess(true);
  };
  // Toggle image info
  const toggleImageInfo = () => {
    setImageInfo(!imageInfo);
  };
  /**
   * Update image information
   * Send new user entered data to backend
   */
  const updateImage = () => {
    
    // Checks if data is null 
    // Appends and stores the new data to form data
    const formData = new FormData();
    formData.append("ID_image", selectedImg.ID_image);
    if (photographerData != null) {
      formData.append("photographer", photographerData);
    }
    if (cameraData != null) {
      formData.append("camera", cameraData);
    }
    if (locationData != null) {
      formData.append("location", locationData);
    }
    if (resolutionData != null) {
      formData.append("resolution", resolutionData);
    }
    if (GPS_coordinatesData != null) {
      formData.append("GPS_coordinates", GPS_coordinatesData);
    }
    if (limitedUsage && limited_usageData != null) {
      formData.append("limited_usage", limited_usageData);
    }
    if (publishedData) {
      formData.append("published", 0);
    }
    // HTTP request
    axios
      .post(
        "http://localhost/bothniabladet/bothniabladet_backend/server/api/image/update.php",
        formData
      )
      .then((res) => {
        console.log(res);
        // Reload website to get new data
        window.location.reload();
      });
  };
  // Handles user input and stores it
  // Called on textfield onChange 
  const handleChangePhotographer = (val) => {
    setPhotographerData(val.target.value);
  };
  const handleChangeCamera = (val) => {
    setCameraData(val.target.value);
  };
  const handleChangeLocation = (val) => {
    setLocationData(val.target.value);
  };
  const handleChangeResolution = (val) => {
    setResolutionData(val.target.value);
  };
  const handleChangeGPS_coordinates = (val) => {
    setGPS_coordinatesData(val.target.value);
  };
  const handleChangeLimited_usage = (val) => {
    setLimited_usageData(val.target.value);
  };
  // Toggle published
  const published = (e) => {
    if (e.target.checked) {
      setPublishedData(true);
    } else {
      setPublishedData(false);
    }
  };
  // Delete image from backend
  const deleteImage = () => {
    // Store image ID
    const formData = new FormData();
    formData.append("ID_image", selectedImg.ID_image);
    // HTTP request
    axios
      .post(
        "http://localhost/bothniabladet/bothniabladet_backend/server/api/image/delete.php",
        formData
      )
      .then((res) => {
        console.log(res);
        // Reload website
        window.location.reload();
      });
  };
  // Activate control window before deleting image
  const controlDelete = () => {
    setTryDelete(true);
  };
  // Handle user input before deleting image
  const verifyDelete = (answer) => {
    if (answer === true) {
      deleteImage();
      console.log("delete");
    } else {
      setTryDelete(false);
      console.log("cancel");
    }
  };
  // Get image keywords from backend
  const getImageKeywords = () => {
    // Store image ID
    const formData = new FormData();
    formData.append("ID_image", selectedImg.ID_image);
    // Temp array for keywords
    let keys = [];
    // HTTP request
    axios
      .get(
        `http://localhost/bothniabladet/bothniabladet_backend/server/api/keyword/keyword_by_id_image.php?id=${selectedImg.ID_image}`
      )
      .then((res) => {
        // Add keywords 
        console.log("Keyword result: " + res.data.keywords);
        const key = res.data.keywords + " ";
        keys.push(key);
      });
      // Store the keywords
      setKeywordsData(keys);
  };
  // Fetch image keywords on page load
  useEffect(() => {
    getImageKeywords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="backdrop"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="icons-div">
        {user ? (
          user.member_type === "m" ? (
            <div className="model-icon" onClick={toggleEditKeys}>
              <i class="fas fa-key"></i>
              <p>Nytt nyckelord</p>
            </div>
          ) : null
        ) : null}
        {imageInfo ? (
          <div className="model-icon" onClick={toggleImageInfo}>
            <i class="fas fa-image"></i>
            <p>Bild</p>
          </div>
        ) : (
          <div className="model-icon" onClick={toggleImageInfo}>
            <i class="fas fa-info"></i>
            <p>Info</p>
          </div>
        )}
        {user ? (
          user.member_type === "m" ? (
            <div className="model-icon-delete" onClick={controlDelete}>
              <i class="fas fa-trash-alt"></i>
              <p>Radera bilden</p>
            </div>
          ) : null
        ) : null}
        {tryDelete ? (
          <div>
            <p style={{ color: "white" }}>Är du säker du vill radera bilden?</p>
            <Button
              style={{ backgroundColor: "red", margin: "10px" }}
              variant="contained"
              color="primary"
              onClick={() => verifyDelete(true)}
            >
              Ja
            </Button>
            <Button
              style={{ margin: "10px" }}
              variant="contained"
              color="primary"
              onClick={() => verifyDelete(false)}
            >
              Nej
            </Button>{" "}
          </div>
        ) : null}

        <div className="">
          {editKeys ? (
            <div className="edit-keys">
              <TextField
                color="primary"
                onChange={handleChangeKeys}
                label="Skriv nyckelordet här.."
                defaultValue=""
                InputLabelProps={{ className: "key-textfield" }}
                InputProps={{ className: "key-textfield" }}
              />
              <Button variant="contained" color="primary" onClick={submitKey}>
                Lägg till
              </Button>
            </div>
          ) : null}
        </div>
        {addedSucess ? (
          <div className="sucess-text">
            <p>Nycelordet har lagts till</p>
          </div>
        ) : null}
      </div>

      {imageInfo ? null : (
        <motion.img
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          src={selectedImg.imageURL}
          alt="Enlarged"
        />
      )}

      {imageInfo ? (
        <motion.div
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          className="backdrop-info"
        >
          <div className="info-row">
            <p>Fotograf:</p>
            <StyledInput
              onChange={handleChangePhotographer}
              fullWidth
              defaultValue={selectedImg.photographer}
            ></StyledInput>
          </div>
          <div className="info-row">
            <p>Kamera:</p>
            <StyledInput
              onChange={handleChangeCamera}
              fullWidth
              defaultValue={selectedImg.camera}
            ></StyledInput>
          </div>
          <div className="info-row">
            <p>Datum:</p>
            <StyledInput fullWidth value={selectedImg.date}></StyledInput>
          </div>
          <div className="info-row">
            <p>Upplösning:</p>
            <StyledInput
              onChange={handleChangeResolution}
              fullWidth
              defaultValue={selectedImg.resolution}
            ></StyledInput>
          </div>
          <div className="info-row">
            <p>Storlek:</p>
            <StyledInput fullWidth value={selectedImg.file_size}></StyledInput>
          </div>
          <div className="info-row">
            <p>Format:</p>
            <StyledInput fullWidth value={selectedImg.file_type}></StyledInput>
          </div>
          <div className="info-row">
            <p>Plats:</p>
            <StyledInput
              onChange={handleChangeLocation}
              fullWidth
              defaultValue={selectedImg.location}
            ></StyledInput>
          </div>
          <div className="info-row">
            <p>GPS:</p>
            <StyledInput
              onChange={handleChangeGPS_coordinates}
              fullWidth
              defaultValue={selectedImg.GPS_coordinates}
            ></StyledInput>
          </div>
          {limitedUsage ? (
            <div className="info-row">
              <p>Tillgängligt antal:</p>
              <StyledInput
                onChange={handleChangeLimited_usage}
                fullWidth
                defaultValue={selectedImg.limited_usage}
              ></StyledInput>
            </div>
          ) : (
            <div className="info-row">
              <p>Tillgängligt antal:</p>
              <StyledInput fullWidth value={"Ingen begränsning"}></StyledInput>
            </div>
          )}
           {/*eqeqeq*/}
          {keywordsData != "undefined " ? (
            <div className="info-row">
              {console.log(keywordsData)}
              <p>Nyckelord: {keywordsData}</p>
            </div>
          ) : (
            <div className="info-row">
              <p>Nyckelord: Bilden har inga nyckelord</p>
            </div>
          )}

          {user ? (
            user.member_type === "m" ? (
              <div>
                <div className="file-input">
                  <FormControlLabel
                    style={{ color: "white" }}
                    control={
                      <Checkbox
                        style={{ color: "white" }}
                        value="published"
                        color="primary"
                        onChange={published}
                      />
                    }
                    label="Arkivera bilden"
                  />
                </div>
                <div className="file-input">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={updateImage}
                  >
                    Uppdatera bilden
                  </Button>
                </div>
              </div>
            ) : null
          ) : null}
        </motion.div>
      ) : null}
    </motion.div>
  );
};

export default Model;
