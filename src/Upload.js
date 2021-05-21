import React, { useState }  from 'react'
import axios from 'axios'
import { Button, Container, TextField } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Upload() {

    const [filePreview, setFilePreview] = useState(null);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [uploaded, setUploaded] = useState(false);
   
    const [photographerData, setPhotographerData] = useState('');
    //const [cameraData, setCameraData] = useState('');
    const [locationData, setLocationData] = useState('');

    const [isLimitedUse, setIsLimitedUse] = useState(false);
    const [nrOfCopiesData, setNrOfCopies] = useState(null);
    // 0 = Not published | 1 = published
    const [publishedData, setPublishedData] = useState(1);

    // Allowed image types
    const types = ['image/png', 'image/jpeg'];

    // Get called when a new file is selected
    const changeHandler = (e) => {
        let selected = e.target.files[0];
        console.log(selected);
        if (selected && types.includes(selected.type)){
            setFile(selected);
            setError('');
            // To preview img
            setFilePreview(URL.createObjectURL(selected));
        }else{
            setFile(null);
            setError('Välj en bild! (png eller jpeg)')
        }
    }
    const uploadHandler = () => {
        const formData = new FormData()
        formData.append(
          'image',
          file,   
        )
        formData.append('photographer', photographerData,)
        //formData.append('camera', cameraData,)
        formData.append('location', locationData,)
        if(isLimitedUse === true){
            formData.append('limited_usage', nrOfCopiesData,)
        }else{
            formData.append('limited_usage', -1,)
        }
        formData.append('published', publishedData,)
        
        axios.post('http://localhost/bothniabladet/bothniabladet_backend/server/api/image/create.php', formData, )
        .then(function (response) {
            console.log(response);
            if(response.data.message === 'Post Created'){
                setUploaded(true);
                console.log('Uploaded');
            }else{
                setFeedback('Något gick fel i uppladdningen!')
                console.log('Not uploaded');
            }
      
        })
        .catch(function (error) {
          console.log(error);
          console.log('Not uploaded');
        });
      };
    const handleChangePhotographer = (val) => {
        setPhotographerData(val.target.value);
        console.log(val.target.value);

     }/*
     const handleChangeCamera = (val) => {
        setCameraData(val.target.value);
        console.log(val.target.value);
      }*/
      const handleChangeLocation = (val) => {
        setLocationData(val.target.value);
        console.log(val.target.value);
      }

      const limitedUse = (e) => {
        if(e.target.checked){
            setIsLimitedUse(true);
        }else{
            setIsLimitedUse(false);
        }
        console.log(isLimitedUse);
      }

      const nrOfCopies = (val) => {
        if(isLimitedUse === true){
            setNrOfCopies(val.target.value);
        }else{
            setNrOfCopies(-1);
        }
        console.log(val.target.value);
      }

      const published = (e) => {
        if(e.target.checked){
            setPublishedData(0);
        }else{
            setPublishedData(1);
        }
        console.log(publishedData);
      }
      const resetUpload = () => {
        setUploaded(false)
        setFeedback('')
        setFile(null);
        setPhotographerData('');
        setLocationData('');
        setIsLimitedUse(false);
        setNrOfCopies(null);
        setPublishedData(1);
        // Eller reload
        //window.location.reload();
      }
      // If image has been uploaded
      if(uploaded){
        return(
          <Container className="signin-box">
          <h1>Din bild har laddats upp!</h1>
          
          <Button style={{margin: '10px'}} onClick={resetUpload} variant="contained" color="primary"  >Ladda upp fler bilder</Button>
         
          <Link to='/home' className="link-style">
          <Button style={{margin: '10px'}} variant="contained" color="primary"  >Sök bilder</Button>
          </Link>
          </Container>
        );
      }

    return (
        <div>
            
            <form>
                <h2>Välj en bild</h2>
                <label className="upload-label">
                <input type="file" onChange={changeHandler} />
                <span>+</span>
                </label>
            </form>
            <div className="output">
                { error && <div className="error">{error}</div> }
                { file && <div>{file.name}</div> }
            </div>

            <div className="file-input">
                <TextField onChange={handleChangePhotographer } label='Fotograf'/>
            </div>
            {/*<div className="file-input">
                <TextField onChange={handleChangeCamera} label='Camera' />
            </div>*/}
            <div className="file-input">
                <TextField onChange={handleChangeLocation} label='Plats' />
            </div>
            <div className="file-input"> 
            <FormControlLabel
            control={<Checkbox value="limited use" color="primary" onChange={limitedUse} />}
            label="Begränsad använding"
            />
            </div>
            
            <div className="file-input"> 
            { isLimitedUse ? <div className="file-input">
                <TextField onChange={nrOfCopies} label='Antal bilder' />
            </div> : null }
            </div>
            

            <div className="file-input"> 
            <FormControlLabel 
            control={<Checkbox value="published" color="primary" onChange={published} />}
            label="Arkivera bilden (Privat)"
            />
            </div>

            <div className="file-input">
                <Button variant="contained" color="primary" onClick={uploadHandler}>
                Ladda upp
                </Button>
            </div>
            {feedback ? <div style={{textAlign: 'center'}}> <h2>{feedback}</h2></div> : null}
            
            {file ? <motion.img initial={{ y: "-100vh", opacity: 0}} animate={{ y: 0, opacity: 1}}
            className="preview-img" src={filePreview}  alt={'Vald bild:'}/> : null}
        </div>
    )
}

export default Upload
