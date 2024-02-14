import React from 'react';
import imageUrls from './Images'; // Import the array of image URLs from photos.js
import './App.css'; // Make sure to adjust the path if needed

function Home() {
    // Shuffle function to randomly reorder array elements and return a subset of three elements
    const shuffleArrayAndGetSubset = (array) => {
        let shuffledArray = array.slice(); // Create a copy of the original array to avoid mutation
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray.slice(0, 3); // Return a subset of the shuffled array containing only three elements
    };

    // Get a subset of three random image URLs
    const randomImages = shuffleArrayAndGetSubset(imageUrls);

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
                                <li>Click on any result to view detailed information, including appearances in movies and series.</li>
                                <li>Explore the "Random" button for a surprise Star Wars trivia or fun fact.</li>
                            </ol>
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
