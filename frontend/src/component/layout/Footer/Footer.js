import React from "react";
import "./Footer.css"
const Footer= ()=>{
    return(
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src="https://thumbs.dreamstime.com/b/download-app-store-get-google-play-buttons-kiev-ukraine-september-button-icons-printed-paper-198225719.jpg" alt="playstore"/>

            </div>
            <div className="midFooter">
                <h1>ECOMMERCE</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2022 &copy; MeSheeershTiwari </p>
            </div>
            <div className="rightFooter">
                <h4>Follow us</h4>
                <a href="https://www.instagram.com/just_sheersh/">Instagram</a>
                <a href="https://www.instagram.com/just_sheersh/">Youtube</a>
                <a href="https://www.instagram.com/just_sheersh/">Facebook</a>
            </div>
        </footer>
    )
}
export default Footer;