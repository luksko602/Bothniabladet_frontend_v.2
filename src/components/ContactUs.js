import React from 'react'
import './ContactUS.css'
/* Kontaktsidan */
function ContactUs() {
    return (
        <div class="contactpage-content">
            <div id="contactpage-headline"> 
                <h1>Kontaktsida </h1>
            </div>
            <div id="teaminfosection">

                <div id="companyinfo"> 
                    <h2> Vårt team </h2>
                    <p> Bothniabladet är en mindre dagstidningsredaktion. Vi finns på Storgatan i Luleå.  </p>
                    <p> På denna sida finns information om några av de anställda på redaktionen. Vilket går att läsa nedan</p>
                </div>
                <div id="employeeinfo">
                <h2> Anställda </h2>
                <div id="editorinfo">
                    <h3> Redaktör </h3>
                    <h4> Fatima </h4>
                    <p> Fatima är Bothniabladets redaktör </p>
                    <p> Telefonnummer: </p>
                    <p> E-post: </p>
                </div>
                <div id="photographerinfo">
                    <h3> Fotograf </h3>
                    <h4> Ahmed </h4>
                    <p> Ahmed är en av många fotografer på Bothniabladet</p>
                    <p> Telefonnummer: </p>
                    <p> E-post: </p>
                </div>
                <div id="contenteditorinfo">
                    <h3> Redigerare </h3>
                    <h4> Petra </h4>
                    <p> Petra jobbar som redigerare på Bothniabladet. Hon hanterar bland annat hanteringen av bilder med att bland annat göra det enklare att hitta bilder med hjälp av
                        exempelvis nyckelord.
                    </p>
                    <p> Telefonnummer: </p>
                    <p> E-post: </p>

                </div>
                <div id="archivesinfo">
                    <h3> Arkiv </h3>
                    <h4> Bengt </h4>
                    <p> Bengt jobbar som arkiverare på Bothniabladet och har gjort det i 10 år. </p>
                    <p> Telefonnummer: </p>
                    <p> E-post: </p>
                </div>
                <div id="econonmyinfo">
                    <h3> Ekonomi </h3>
                    <h4> Arne </h4>
                    <p> Arne är ekonomiansvarig på Bothniabladet. Till han kan ni höra av er om allt som berör beställningar av bilder </p>
                    <p> Telefonnummer: </p>
                    <p> E-post: </p>
                </div>
            </div>
            </div>
           
        </div>
    )
}

export default ContactUs
