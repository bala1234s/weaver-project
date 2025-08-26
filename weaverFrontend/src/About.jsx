import React from "react";
import "./About.css";

function About() {
    return (
        <div className="about-container">
            <h1>About Us</h1>
            <p>
                Welcome – your trusted destination for
                customized dresses.
                We believe that every customer to look unique and confident,
                which is why we craft outfits tailored to your preferences.
            </p>
            <p>
                Our journey began with a simple vision – to bring together traditional
                craftsmanship and modern design. From fabric selection to final
                stitching, we ensure quality and comfort in every dress we make.
            </p>
            <p>
                Whether it’s for daily wear, festive occasions, or special events, our
                team is committed to delivering the best designs at affordable prices.
            </p>

            <div className="about-highlights">
                <div className="highlight-card">
                    <h3>Quality Fabrics</h3>
                    <p>We use only premium materials that feel good and last long.</p>
                </div>
                <div className="highlight-card">
                    <h3>Custom Designs</h3>
                    <p>Every dress is made to reflect your unique personality.</p>
                </div>
                <div className="highlight-card">
                    <h3>Customer First</h3>
                    <p>Your satisfaction is at the heart of everything we do.</p>
                </div>
            </div>
        </div>
    );
}

export default About;
