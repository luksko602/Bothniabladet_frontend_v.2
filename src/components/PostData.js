import React from 'react'
import axios from 'axios'

function PostData() {

    const postData = async () => {
        axios.post('http://localhost/bothniabladet/bothniabladet_backend/server/api/member/create.php', {
            password: '123',
            first_name: 'Torsten',
            last_name: 'Svensson',
            city: 'Skellefteå',
            postal: '93294',
            street: 'Rikemansgatan 3',
            phone: '43155',
            email: 'Torsten@hotmail.com'
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      };
    

    return (
        <div>
            <button onClick={postData}>
                Post
            </button>
        </div>
    )
}

export default PostData
