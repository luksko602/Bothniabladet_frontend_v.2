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
  const [editKeys, setEditKeys] = useState(false);
  const [keyData, setKeyData] = useState("");
  const [limitedUsage, setLimitedUsage] = useState(true);
  const [addedSucess, setAddedSucess] = useState(false);

  const { user } = useContext(UserContext);

  const [imageInfo, setImageInfo] = useState(false);

  const [photographerData, setPhotographerData] = useState(null);
  const [cameraData, setCameraData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [resolutionData, setResolutionData] = useState(null);
  const [GPS_coordinatesData, setGPS_coordinatesData] = useState(null);
  const [limited_usageData, setLimited_usageData] = useState(null);
  const [publishedData, setPublishedData] = useState(false);

  const [keywordsData, setKeywordsData] = useState([]);

  const [tryDelete, setTryDelete] = useState(false);

  const checkIfLimited = () => {
    if (selectedImg.limited_usage < 0) {
      setLimitedUsage(false);
    } else {
      setLimitedUsage(true);
    }
    console.log(limitedUsage);
  };

  const handleClick = (e) => {
    // Check if clicked outside of image
    if (e.target.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };
  useEffect(() => {
    checkIfLimited();
  });

  const toggleEditKeys = () => {
    setEditKeys(!editKeys);
    setAddedSucess(false);
  };

  const handleChangeKeys = (val) => {
    setKeyData(val.target.value);
    console.log(val.target.value);
  };
  const submitKey = () => {
    console.log("submittar: " + keyData);

    const formData = new FormData();
    formData.append("keyword", keyData);
    formData.append("ID_image", selectedImg.ID_image);

    if (keyData.length > 0) {
      axios
        .post(
          "http://localhost/bothniabladet/bothniabladet_backend/server/api/keyword/keyword_connect.php",
          formData
        )
        .then((res) => {
          console.log(res);
        });
    } else {
      // dont post
      console.log("Did not submit, value is empty");
    }
    // to reset and hide add key
    setEditKeys(false);
    setAddedSucess(true);
  };
  const toggleImageInfo = () => {
    setImageInfo(!imageInfo);
  };

  const updateImage = () => {
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
    axios
      .post(
        "http://localhost/bothniabladet/bothniabladet_backend/server/api/image/update.php",
        formData
      )
      .then((res) => {
        console.log(res);
        // reload website
        window.location.reload();
      });
  };

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
  const handleChangePublished = (val) => {
    setPublishedData(val.target.value);
  };
  const published = (e) => {
    if (e.target.checked) {
      setPublishedData(true);
    } else {
      setPublishedData(false);
    }
    console.log(publishedData);
  };

  const deleteImage = () => {
    const formData = new FormData();
    formData.append("ID_image", selectedImg.ID_image);

    axios
      .post(
        "http://localhost/bothniabladet/bothniabladet_backend/server/api/image/delete.php",
        formData
      )
      .then((res) => {
        console.log(res);
        // reload website
        window.location.reload();
      });
  };
  const controlDelete = () => {
    setTryDelete(true);
  };
  const verifyDelete = (answer) => {
    if (answer === true) {
      deleteImage();
      console.log("delete");
    } else {
      setTryDelete(false);
      console.log("cancel");
    }
  };
  const getImageKeywords = () => {
    const formData = new FormData();
    formData.append("ID_image", selectedImg.ID_image);

    let keys = [];
    axios
      .get(
        `http://localhost/bothniabladet/bothniabladet_backend/server/api/keyword/keyword_by_id_image.php?id=${selectedImg.ID_image}`
      )
      .then((res) => {
        //console.log("Keyword result: " + res.data.keywords);
        const newKey = res.data.keywords + " ";

        keys.push(newKey);
      });

    setKeywordsData(keys);
  };
  useEffect(() => {
    getImageKeywords();
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
              <p>Add keyword</p>
            </div>
          ) : null
        ) : null}
        {imageInfo ? (
          <div className="model-icon" onClick={toggleImageInfo}>
            <i class="fas fa-image"></i>
            <p>Image</p>
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
              <p>Delete image</p>
            </div>
          ) : null
        ) : null}
        {tryDelete ? (
          <div>
            <p style={{ color: "white" }}>
              Are you sure you want to delete this image?
            </p>
            <Button
              style={{ backgroundColor: "red", margin: "10px" }}
              variant="contained"
              color="primary"
              onClick={() => verifyDelete(true)}
            >
              Yes
            </Button>
            <Button
              style={{ margin: "10px" }}
              variant="contained"
              color="primary"
              onClick={() => verifyDelete(false)}
            >
              No
            </Button>{" "}
          </div>
        ) : null}
      </div>
      <div className="">
        {editKeys ? (
          <div className="edit-keys">
            <TextField
              color="primary"
              onChange={handleChangeKeys}
              label="Enter key here"
              defaultValue=""
              InputLabelProps={{ className: "key-textfield" }}
              InputProps={{ className: "key-textfield" }}
            />
            <Button variant="contained" color="primary" onClick={submitKey}>
              Add key
            </Button>
          </div>
        ) : null}
      </div>
      {addedSucess ? (
        <div className="sucess-text">
          <p>Keyword has been added</p>
        </div>
      ) : null}

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
            <p>Photographer:</p>
            <StyledInput
              onChange={handleChangePhotographer}
              fullWidth
              defaultValue={selectedImg.photographer}
            ></StyledInput>
          </div>
          <div className="info-row">
            <p>Camera:</p>
            <StyledInput
              onChange={handleChangeCamera}
              fullWidth
              defaultValue={selectedImg.camera}
            ></StyledInput>
          </div>
          <div className="info-row">
            <p>Date:</p>
            <StyledInput fullWidth value={selectedImg.date}></StyledInput>
          </div>
          <div className="info-row">
            <p>Resolution:</p>
            <StyledInput
              onChange={handleChangeResolution}
              fullWidth
              defaultValue={selectedImg.resolution}
            ></StyledInput>
          </div>
          <div className="info-row">
            <p>Size:</p>
            <StyledInput fullWidth value={selectedImg.file_size}></StyledInput>
          </div>
          <div className="info-row">
            <p>Format:</p>
            <StyledInput fullWidth value={selectedImg.file_type}></StyledInput>
          </div>
          <div className="info-row">
            <p>Location:</p>
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
              <p>Available copies:</p>
              <StyledInput
                onChange={handleChangeLimited_usage}
                fullWidth
                defaultValue={selectedImg.limited_usage}
              ></StyledInput>
            </div>
          ) : (
            <div className="info-row">
              <p>Available copies:</p>
              <StyledInput fullWidth value={"Unlimited"}></StyledInput>
            </div>
          )}

          {keywordsData ? (
            <div className="info-row">
              <p>Keywords: {keywordsData}</p>
            </div>
          ) : (
            <div className="info-row">
              <p>Keywords: No keywords for this image</p>
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
                    label="Archive"
                  />
                </div>
                <div className="file-input">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={updateImage}
                  >
                    Update image info
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
