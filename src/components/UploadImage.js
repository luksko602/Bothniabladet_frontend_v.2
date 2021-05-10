import axios from 'axios'
import React, { useState } from 'react'


const UploadImage = () => {
    
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

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
        axios.post('http://localhost/bothniabladet/bothniabladet_backend/server/api/image/create.php', formData)
        .then(res => {
            console.log(res);
        });
      }

    return (
        <div>
            <form>
                <input type="file" onChange={changeHandler} />
            </form>
            <div className="output">
                { error && <div className="error">{error}</div> }
                { file && <div>{file.name}</div> }
                <button onClick={uploadHandler}>Upload!</button>
            </div>
        </div>
    )
}

export default UploadImage

