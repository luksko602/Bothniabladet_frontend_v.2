import { Button, TextField } from '@material-ui/core';
import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Model = ({ selectedImg, setSelectedImg }) => {
    
    const [editKeys, setEditKeys] = useState(false);
    const [keyData, setKeyData] = useState('');
    const [limitedUsage, setLimitedUsage] = useState(true);
    const [addedSucess, setAddedSucess ] = useState(false);


    const checkIfLimited = () => {
        if(selectedImg.limited_usage < 0){
            setLimitedUsage(false);
        }else{
            setLimitedUsage(true);
        }
        console.log(limitedUsage )
    }

    const handleClick = (e) => {
        // Check if clicked outside of image
        if(e.target.classList.contains('backdrop')){
            setSelectedImg(null);
        }    
    }
    useEffect(() => {
        checkIfLimited();
      },)

    const toggleEditKeys = () => {
        setEditKeys(true)
        setAddedSucess(false);
    }

    const handleChangeKeys = (val) => {
        setKeyData(val.target.value);
        console.log(val.target.value);
    }
    const submitKey = () => {
      
        console.log('submittar: ' + keyData);

        const formData = new FormData()
        formData.append('keyword', keyData,)
        formData.append('ID_image', selectedImg.ID_image,)

        if(keyData.length > 0){
            axios.post('http://localhost/bothniabladet/bothniabladet_backend/server/api/keyword/keyword_connect.php', formData, )
            .then(res => {
            console.log(res);
        });
        }else{
            // dont post 
            console.log('Did not submit, value is empty');
        }
        // to reset and hide add key
        setEditKeys(false);
        setAddedSucess(true);

    }
        

    return (
        <div className='backdrop' onClick={handleClick}>
            

            <div className="edit-image" onClick={toggleEditKeys }>
                <p>Add keyword</p>
                <i class="fas fa-edit"></i>
            </div>
            <div className=""> 
            { editKeys ? <div className="edit-keys">
                <TextField color="primary"  onChange={handleChangeKeys} label='Enter key here' defaultValue="" 
                InputLabelProps={{className:'key-textfield'}} InputProps={{className:'key-textfield'}} />
                <Button variant="contained" color="primary" onClick={submitKey}>
                Add key
                </Button>
            </div> : null }
            </div>
            { addedSucess ? <div className="sucess-text">
                <p>Keyword has been added</p>
            </div> : null }
            
            
            <img src={selectedImg.imageURL} alt="Enlarged"/>
         
            <div className='backdrop-info'>

            <table>
             <tr>
                <th>Photographer</th>
                <th>Camera</th>
                <th>Date</th>
                <th>Resolution</th>
                <th>Size</th>
                <th>Format</th>
                <th>Location</th>
                <th>GPS</th>
                <th>Copies</th>
            </tr>
            <tr>
                <td>{selectedImg.photographer}</td>
                <td>{selectedImg.camera}</td>
                <td>{selectedImg.date}</td>
                <td>{selectedImg.resolution}</td>
                <td>{selectedImg.file_size}</td>
                <td>{selectedImg.file_type}</td>
                <td>{selectedImg.location}</td>
                <td>{selectedImg.GPS_coordinates}</td>
                <td>{limitedUsage ? selectedImg.limited_usage : 'Unlimited'}</td>
            </tr>
        </table>
            </div>
        </div>
    )
}

export default Model
