import React, {useEffect, useState} from 'react'

const Model = ({ selectedImg, setSelectedImg }) => {
    
    //var limitedUsage = false;
    const [limitedUsage, setLimitedUsage] = useState(true);
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

    return (
        <div className='backdrop' onClick={handleClick}>
            <img src={selectedImg.imageURL} alt="Enlarged"/>
            
            <div className='backdrop-info'>
             <p>Photographer: {selectedImg.photographer}</p>
             <p>Camera: {selectedImg.camera}</p>
             <p>Date: {selectedImg.date}</p>
             <p>Resolution: {selectedImg.resolution}</p>
             <p>Size: {selectedImg.file_size}</p>
             <p>Format: {selectedImg.file_type}</p>
             <p>Location: {selectedImg.location}</p>
             <p>GPS: {selectedImg.GPS_coordinates}</p>
             <p>Copies available: {limitedUsage ? selectedImg.limited_usage : 'Not limited'}</p>

            </div>
        </div>
    )
}

export default Model
