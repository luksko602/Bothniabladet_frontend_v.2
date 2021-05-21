import { Button } from '@material-ui/core'
import React, { useContext} from 'react'
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';


function Account() {

    const {user, setUser} = useContext(UserContext);
    

    const logOut = () => {
        setUser(null);
    }

    return (
        <div>
            <div className="file-input">
            
            <div>
                <h1>{ user.member_type === 'c' ? 'Kund' : 'Anställd' } : {user.first_name + ' ' + user.last_name}</h1>
                <p>Email: {user.email}</p>
                <p>Stad: {user.city}</p>
                <p>Gata: {user.street}</p>
                <p>Postnummer: {user.postal}</p>
                <p>Telefon: {user.phone}</p>
                <p>Rabatt: {user.discount_amount}%</p>
                
            </div>
            
            <Link to='/home' className="link-style">
                <Button variant="contained" color="primary" onClick={logOut}>
                Logga ut
                </Button>
            </Link>
            </div>
        </div>
    )
}

export default Account
