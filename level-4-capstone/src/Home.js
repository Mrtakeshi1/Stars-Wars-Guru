import React, { useState, useEffect } from 'react';
import imageUrls from './Images'; // Import the array of image URLs from photos.js
import './App.css'; // Make sure to adjust the path if needed

function Home() {
    // Define state for storing the random trivia or fun fact
    const [randomFact, setRandomFact] = useState('');

    // Define state for storing random images
    const [randomImages, setRandomImages] = useState([]);

    // Predefined list of trivia or fun facts
    const facts = [
        "Did you know that Darth Vader's name was originally going to be Darth Icky?",
        "Yoda's species has never been named in any Star Wars movie or TV show.",
        "The sound of a lightsaber was created by combining the hum of an old TV and the buzz of a film projector.",
        "The Millennium Falcon's design was inspired by a hamburger.",
        "Luke Skywalker's original name in early drafts of Star Wars was Luke Starkiller.",
        "The word 'Ewok' is never mentioned in the original Star Wars trilogy.",
        "The iconic opening crawl was inspired by old Flash Gordon serials.",
        "Jabba the Hutt was originally conceived as a furry creature.",
        "The Jedi were not the original peacekeepers of the galaxy; that role belonged to the Jedi Bendu.",
        "George Lucas was not initially interested in directing Return of the Jedi.",
        "The Wookiee language, Shyriiwook, was inspired by the sounds of walruses.",
        "The phrase 'I have a bad feeling about this' is said in every Star Wars movie.",
        "The AT-AT walkers were inspired by the shape of elephants.",
        "The lightsaber sounds are a combination of the hum of an old television and the buzz of a film projector motor.",
        "Chewbacca's voice is a mix of bear, walrus, lion, and badger sounds.",
        "Yoda was almost played by a monkey.",
        "Ewoks were inspired by George Lucas's dog.",
        "A New Hope was not expected to be successful.",
        "The Empire Strikes Back was originally titled 'The Empire Strikes.'",
        "The prequel trilogy was originally planned to be a standalone film called The Star Wars.",
        "Darth Vader's breathing was recorded by the film's sound designer using scuba gear.",
        "C-3PO is fluent in over six million forms of communication.",
        "George Lucas's dog, Indiana, was the inspiration for Han Solo's famous line, 'I have a bad feeling about this.'",
        "Alec Guinness, who played Obi-Wan Kenobi, initially didn't like Star Wars.",
        "The language spoken by the Ewoks, Ewokese, was created by a woman named Ben Burtt.",
        "Return of the Jedi was almost called 'Revenge of the Jedi.'",
        "George Lucas initially wanted to adapt Flash Gordon, but he couldn't obtain the rights.",
        "The phrase 'May the Force be with you' is said in every Star Wars movie.",
        "Star Wars was originally going to be a much smaller film.",
        "The famous 'I am your father' line was not revealed to the cast until the filming of The Empire Strikes Back.",
        // Additional facts
        "R2-D2 is named after a piece of film editing equipment called 'Reel 2, Dialog 2'.",
        "The sound effect for the Millennium Falcon’s hyperdrive malfunction is actually the sound of a broken air conditioner.",
        "The Ewok language was created by sound designer Ben Burtt, who recorded various Tibetan phrases.",
        "The sound of the lightsaber turning off was made by a combination of a projector motor and the hum of an old television.",
        "The species of Yoda has never been officially named in the Star Wars films.",
        "The concept of the Force was inspired by various philosophical and religious beliefs.",
        "The original Star Wars movie was released in 1977 and is now known as 'Episode IV: A New Hope'.",
        "The original trilogy of Star Wars films was directed by George Lucas.",
        "The Jedi Order has a code: 'There is no emotion, there is peace. There is no ignorance, there is knowledge. There is no passion, there is serenity. There is no chaos, there is harmony. There is no death, there is the Force.'",
        "Star Wars creator George Lucas was initially inspired by classic mythology and hero's journey narratives.",
        "Darth Vader's helmet was designed to resemble the samurai helmets of feudal Japan.",
        "The planet Tatooine, where Luke Skywalker was raised, was inspired by the deserts of Tunisia.",
        "The iconic 'Imperial March' theme music was composed by John Williams.",
        "The Star Wars Holiday Special, aired in 1978, is considered by many fans to be one of the franchise's low points.",
        "The original script for Star Wars was rejected by several major studios before 20th Century Fox decided to take a chance on it.",
        "Han Solo's famous line 'I know' in The Empire Strikes Back was improvised by Harrison Ford.",
        "The Ewok language was created by recording and reversing the voices of the actors speaking in a Tibetan dialect.",
        "The iconic phrase 'May the Force be with you' was originally said by General Dodonna in A New Hope.",
        "The Star Wars films have won a total of 29 Academy Awards.",
        "The Star Wars saga was originally intended to be a space opera inspired by classic adventure serials.",
        "The character of Jabba the Hutt was initially conceived as a furry creature named Zorba.",
        "The original script for Star Wars underwent numerous revisions before filming began.",
        "The phrase 'a long time ago in a galaxy far, far away' has become iconic in popular culture.",
        "The Star Wars films have spawned an extensive expanded universe of novels, comics, and other media.",
        "The character of Yoda was originally designed to be played by a trained monkey.",
        "The Star Wars films have been re-released multiple times with various updates and enhancements.",
        "The Star Wars saga has inspired countless parodies, homages, and references in popular culture.",
        "The lightsaber duels in the Star Wars films were choreographed by stunt coordinator Bob Anderson.",
        "The character of Princess Leia was inspired by the fairy-tale archetype of the damsel in distress.",
        "The Star Wars films have been praised for their groundbreaking visual effects and innovative filmmaking techniques.",
        "The Star Wars prequel trilogy explores the backstory of characters like Anakin Skywalker and Obi-Wan Kenobi.",
        "The Star Wars saga is set in a distant galaxy known as 'a galaxy far, far away'.",
        "The character of Darth Vader is one of the most iconic villains in cinematic history.",
        "The Star Wars films feature a diverse cast of characters from various alien species and cultures.",
        "The Star Wars films explore themes of good vs. evil, destiny, and the power of redemption.",
        "The Star Wars saga has inspired a devoted fanbase known for its passion and enthusiasm for the franchise.",
        "The Star Wars films have been recognized for their groundbreaking special effects and imaginative world-building.",
        "The Star Wars saga has had a significant impact on popular culture and has influenced generations of filmmakers and storytellers.",
    ];
    

    // Function to handle the click event for the random fact button
    const handleRandomFactClick = () => {
        const randomIndex = Math.floor(Math.random() * facts.length);
        setRandomFact(facts[randomIndex]);
    };

    // Shuffle function to randomly reorder array elements and return a subset of three elements
    const shuffleArrayAndGetSubset = (array) => {
        let shuffledArray = array.slice(); // Create a copy of the original array to avoid mutation
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray.slice(0, 3); // Return a subset of the shuffled array containing only three elements
    };

    // Initialize random images when the component mounts
    useEffect(() => {
        const randomImagesSubset = shuffleArrayAndGetSubset(imageUrls);
        setRandomImages(randomImagesSubset);
    }, []);

    return (
        <div>
            <h1 className="header-title2">Star Wars Guru</h1> {/* Place the header title here */}
            <nav>
                {/* Navigation content */}
            </nav>
            <div className="box-container"> {/* Adjust the class name if needed */}
                <div className="home-container">
                    <div className="home-content">
                        {/* How to section */}
                        <div className="how-to center">
                            <h2>Star Wars Guru</h2>
                            <p>Welcome to Star Wars Guru! Here's a guide to help you make the most of it:</p>
                            <ol className='center-list'>
                                <li>Use the search bar to find information about Star Wars characters, planets, and ships.</li>
                                <li>You can select a category from the dropdown menu above the search bar.</li>
                                <li>Explore the "Random" button for a surprise Star Wars fun fact.</li>
                            </ol>
                        </div>

                        {/* Random fact button */}
                        <div className="random-fact-button-container">
                            <button onClick={handleRandomFactClick} className="random-fact-button">Random Fun Fact</button>
                            {randomFact && <p className="random-fact">{randomFact}</p>}
                        </div>

                        {/* Image section */}
                        <div className="image-container">
                            {randomImages.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image.url} alt={image.name} className="image" />
                                    <p className="image-name">{image.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
