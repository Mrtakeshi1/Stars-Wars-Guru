import React, { useState } from 'react';
import axios from 'axios';

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');
    const [selectedResult, setSelectedResult] = useState(null);
    const [films, setFilms] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [starships, setStarships] = useState([]);
    const [homeworld, setHomeworld] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (value) => {
        try {
            const response = await axios.get(`https://swapi.dev/api/people/?search=${value}`);
            const filteredSuggestions = response.data.results.filter(suggestion =>
                suggestion.name.toLowerCase().startsWith(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };
    

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://swapi.dev/api/people/?search=${query}`);
            setSearchResults(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDetails = async (result) => {
        try {
            const [filmsRes, vehiclesRes, starshipsRes, homeworldRes] = await Promise.all([
                Promise.all(result.films.map(film => axios.get(film))),
                Promise.all(result.vehicles.map(vehicle => axios.get(vehicle))),
                Promise.all(result.starships.map(starship => axios.get(starship))),
                axios.get(result.homeworld)
            ]);
            const filmsData = filmsRes.map(response => response.data);
            const vehiclesData = vehiclesRes.map(response => response.data);
            const starshipsData = starshipsRes.map(response => response.data);
            const homeworldData = homeworldRes.data;
            setFilms(filmsData);
            setVehicles(vehiclesData);
            setStarships(starshipsData);
            setHomeworld(homeworldData);
        } catch (error) {
            console.error('Error fetching details:', error);
        }
    };

    const handleInputChange = async (value) => {
        setQuery(value);
        if (value.trim() !== '') {
            await fetchSuggestions(value);
        } else {
            setSuggestions([]);
        }
    };

    const handleSearch = async () => {
        setSearchResults([]);
        setSelectedResult(null);
        setFilms([]);
        setVehicles([]);
        setStarships([]);
        setHomeworld(null);
        await fetchData();
    };

    const handleSuggestionClick = async (suggestion) => {
        setQuery(suggestion.name);
        setSearchResults([]);
        setSelectedResult(null);
        setFilms([]);
        setVehicles([]);
        setStarships([]);
        setHomeworld(null);
        await fetchDetails(suggestion);
    };

    return (
        <div className="services-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 className="header-title">Star Wars Characters</h1>
            <div style={{ position: 'relative', textAlign: 'center' }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="search-input" // Add new class here
                    style={{ marginRight: '10px', width: '300px' }}
                />
                {suggestions.length > 0 && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: 'white', border: '1px solid #ccc', zIndex: 999 }}>
                        {suggestions.map((suggestion, index) => (
                            <div key={index} onClick={() => handleSuggestionClick(suggestion)} style={{ padding: '5px', cursor: 'pointer' }}>
                                {suggestion.name}
                            </div>
                        ))}
                    </div>
                )}
                <button onClick={handleSearch}>Search</button>
            </div>
            {searchResults.map((result, index) => (
                <div key={index} className="result-container">
                    <div className="details">
                        <h2>{result.name}</h2>
                        <button onClick={() => fetchDetails(result)}>View Details</button>
                    </div>
                </div>
            ))}
            {selectedResult && (
                <div className="details">
                    <h2>{selectedResult.name}</h2>
                    <p>Height: {selectedResult.height}</p>
                    <p>Mass: {selectedResult.mass}</p>
                    <p>Hair Color: {selectedResult.hair_color}</p>
                    <p>Skin Color: {selectedResult.skin_color}</p>
                    <p>Eye Color: {selectedResult.eye_color}</p>
                    <p>Birth Year: {selectedResult.birth_year}</p>
                    <p>Gender: {selectedResult.gender}</p>
                    <p>Homeworld: {homeworld ? homeworld.name : 'Loading...'}</p>
                    <h3>Films:</h3>
                    <ul>
                        {films.map((film, index) => (
                            <li key={index}>{film.title}</li>
                        ))}
                    </ul>
                    <h3>Vehicles:</h3>
                    <ul>
                        {vehicles.map((vehicle, index) => (
                            <li key={index}>{vehicle.name}</li>
                        ))}
                    </ul>
                    <h3>Starships:</h3>
                    <ul>
                        {starships.map((starship, index) => (
                            <li key={index}>{starship.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Search;
