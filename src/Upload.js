import React, { useState }  from 'react'
import axios from 'axios'
import { Input, Button, TextField } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function Upload() {

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const [photographerData, setPhotographerData] = useState('');
    //const [cameraData, setCameraData] = useState('');
    const [locationData, setLocationData] = useState('');

    const [isLimitedUse, setIsLimitedUse] = useState(false);
    const [nrOfCopiesData, setNrOfCopies] = useState(null);
    // 0 = Not published | 1 = published
    const [publishedData, setPublishedData] = useState();


    // Allowed image types
    const types = ['image/png', 'image/jpeg'];

    // Get called when a new file is selected
    const changeHandler = (e) => {
        let selected = e.target.files[0];
        console.log(selected);
        if (selected && types.includes(selected.type)){
            setFile(selected);
            setError('');
        }else{
            setFile(null);
            setError('Please select an image file! (png or jpeg)')
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
        .then(res => {
            console.log(res);

        });
      }

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
            setPublishedData(1);
        }else{
            setPublishedData(0);
        }
        console.log(publishedData);
      }



      // SHow image


    return (
        <div>
            
            <form>
                <h2>Select image</h2>
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
                <TextField onChange={handleChangePhotographer } label='Photographer'/>
            </div>
            {/*<div className="file-input">
                <TextField onChange={handleChangeCamera} label='Camera' />
            </div>*/}
            <div className="file-input">
                <TextField onChange={handleChangeLocation} label='Location' />
            </div>
            <div className="file-input"> 
            <FormControlLabel
            control={<Checkbox value="limited use" color="primary" onChange={limitedUse} />}
            label="Limited use"
            />
            </div>
            
            <div className="file-input"> 
            { isLimitedUse ? <div className="file-input">
                <TextField onChange={nrOfCopies} label='Number of copies' />
            </div> : null }
            </div>
            

            <div className="file-input"> 
            <FormControlLabel 
            control={<Checkbox value="published" color="primary" onChange={published} />}
            label="Published"
            />
            </div>

            <div className="file-input">
                <Button variant="contained" color="primary" onClick={uploadHandler}>
                Upload image
                </Button>
            </div>
           
            <h2 style={{textAlign: 'center'}}>Visa bilden här när den laddats upp?</h2>
        </div>
    )
}

export default Upload
