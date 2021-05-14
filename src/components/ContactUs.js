import React from 'react'
import './ContactUS.css'
/* Kontaktsidan */
function ContactUs() {
    return (
        <div class="contactpage-content">
            <h1>Kontaktsida </h1>
            <div id="teaminfosection">
                <h2> Vårt team </h2>
                <p> Nedan presenteras information om Bothniabladets anställda. </p>
                <p> <b> For english, please scroll down </b> </p>
                <p> Lorem ipsum </p>
                <p> Lorem ipsum </p>
                <div id="employeeinfo">
                <h2> Anställda </h2>
                <div id="editorinfo">
                    <h3> Redaktör </h3>
                    <p> Fatima </p>
                    <img src="#" alt="bild på redaktör"></img>
                </div>
                <div id="photographerinfo">
                    <h3> Fotograf </h3>
                    <p> Ahmed </p>
                    <img src="#" alt="bild på fotograf"/>
                </div>
                <div id="contenteditorinfo">
                    <h3> Redigerare </h3>
                    <p> Petra </p>
                    <img src="#" alt="bild på redigerare"/>
                </div>
                <div id="archivesinfo">
                    <h3> Arkiv </h3>
                    <p> Bengt </p>
                    <img src="#" alt = "bild på arkiverare"/>
                </div>
            </div>
            </div>
           
        </div>
    )
}

export default ContactUs
