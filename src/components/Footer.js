import React from 'react';
import './Footer.css';
/**Applikationens footer. Visar det textinnehåll som finns i footern.
 * @author Linus Lindahl Marjavaara, iluama-6
 * @returns 
 */
function Footer() {
    return(
        <div className="footer">
            <div class="footercontent"> 
            <footer> 
                <h1> Bothniabladet - Copyright <span> &#169; </span> 2021 </h1>
            </footer>
            </div>
        </div>
    );
}
export default Footer