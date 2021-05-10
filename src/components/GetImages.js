import React from 'react'

function GetImages() {

    const getImages = () => {
        axios.get('http://localhost/bothniabladet/bothniabladet_backend/server/api/image/read.php')
      .then(function (response) {
      // handle success
      console.log(response);
      response.g
      })
      .catch(function (error) {
      // handle error
      console.log(error);
      })
      .then(function () {
      // always executed
      console.log('clicked!');
      });
    };

    return (
        <div>
            
        </div>
    )
}

export default GetImages
