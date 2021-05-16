import { Button, TextField } from '@material-ui/core';
import React, {useEffect, useState, useContext} from 'react'
import axios from 'axios'
import { UserContext } from '../UserContext';
import { motion } from 'framer-motion';



const Model = ({ selectedImg, setSelectedImg }) => {
    
    const [editKeys, setEditKeys] = useState(false);
    const [keyData, setKeyData] = useState('');
    const [limitedUsage, setLimitedUsage] = useState(true);
    const [addedSucess, setAddedSucess ] = useState(false);

    const {user, setUser} = useContext(UserContext);
    
   
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
        <motion.div className='backdrop' onClick={handleClick} 
        initial={{opacity: 0}}
        animate={{opacity: 1}}>
            
        { user ?
             user.member_type === 'm' ? <div className="edit-image" onClick={toggleEditKeys }>
                <p>Add keyword</p>
                <i class="fas fa-edit"></i>
            </div> : null 
        : null }
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
            
            
            <motion.img initial={{ y: "-100vh"}} animate={{ y: 0}}
            src={selectedImg.imageURL} alt="Enlarged"/>
         
            <motion.div initial={{ y: "-100vh"}} animate={{ y: 0}}
            className='backdrop-info'>

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
            </motion.div>
        </motion.div>
    )
}

export default Model
