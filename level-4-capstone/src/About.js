import React from "react";
import { useParams, Routes, Route } from "react-router-dom";

function About() {
    const handlePhoneLinkClick = () => {
        alert("Calling +1 (415) 555-1234");
    };

    return (
        <div className="about-container">
            <h1 className="header-title">About Star Wars App</h1>
            <section className="about-app">
                <h2>About the App</h2>
                <p>This app is dedicated to all Star Wars enthusiasts, providing a hub for exploring the vast galaxy far, far away. With the Star Wars App, fans can dive into the lore, discover details about their favorite characters, planets, species, and more. Whether you're a seasoned Jedi Master or a curious Padawan, there's something here for everyone!</p>
            </section>
            <section className="contact-info">
                <h2>Contact Information</h2>
                <p>Email: <a href="mailto:contact@starwars.com">contact@starwars.com</a></p>
                <p>Phone: <button onClick={handlePhoneLinkClick} style={{ background: "none", border: "none", color: "blue", textDecoration: "underline", cursor: "pointer" }}>+1 (415) 555-1234</button></p>
                <p>Address: 123 Skywalker Ranch Rd, San Francisco, CA 94903, United States</p>
            </section>
            <section className="additional-info">
                <h2>Additional Information</h2>
                <p>Feel free to reach out to us if you have any questions or feedback about the Star Wars App. May the Force be with you!</p>
            </section>
        </div>
    );
}

function Character() {
    let { characterId } = useParams();
    return <h1>Character {characterId}</h1>;
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<About />} />
            <Route path="/characters/:characterId" element={<Character />} />
        </Routes>
    );
}

export default App;
