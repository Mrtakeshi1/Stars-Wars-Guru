import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');
    const [selectedResult, setSelectedResult] = useState(null);
    const [searchType, setSearchType] = useState('people');
    const [suggestions, setSuggestions] = useState([]);
    const [imageUrls, setImageUrls] = useState({});
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchImages = async (result) => {
        try {
            const response = await axios.get(`https://api.unsplash.com/search/photos?query=${result.name}&client_id=kf3GJLwitm9etWAcTbKc9NwgIkjrDWxbkDHvgBjxOPmjrUfEbI696e9U`);
            const imageUrl = response.data.results[0].urls.regular;
            setImageUrls(prevImageUrls => ({ ...prevImageUrls, [result.name]: imageUrl }));
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    useEffect(() => {
        if (selectedResult) {
            fetchImages(selectedResult);
        }
    }, [selectedResult]);

    useEffect(() => {
        setButtonDisabled(query.trim() === '');
    }, [query]);

    const fetchSuggestions = async (value) => {
        try {
            const response = await axios.get(`https://swapi.dev/api/${searchType}/?search=${value}`);
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
            setLoading(true);
            const response = await axios.get(`https://swapi.dev/api/${searchType}/?search=${query}`);
            setSearchResults(response.data.results);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('An error occurred while fetching data. Please try again later.');
            setLoading(false);
        }
    };

    const fetchDetails = async (result) => {
        try {
            const response = await axios.get(result.url);
            setSelectedResult(response.data);
            if (searchType === 'people' && response.data.homeworld) {
                const homeworldResponse = await axios.get(response.data.homeworld);
                setSelectedResult(prevResult => ({ ...prevResult, homeworldName: homeworldResponse.data.name }));
            }
            if ((searchType === 'people' || searchType === 'planets' || searchType === 'starships') && response.data.films) {
                const filmsNames = await Promise.all(response.data.films.map(async (filmUrl) => {
                    const filmResponse = await axios.get(filmUrl);
                    return filmResponse.data.title;
                }));
                setSelectedResult(prevResult => ({ ...prevResult, filmsNames }));
            }
            if (searchType === 'planets' && response.data.residents) {
                const residentsNames = await Promise.all(response.data.residents.map(async (residentUrl) => {
                    const residentResponse = await axios.get(residentUrl);
                    return residentResponse.data.name;
                }));
                setSelectedResult(prevResult => ({ ...prevResult, residentsNames }));
            }
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
        if (!searchPerformed) {
            setSearchPerformed(true);
            setSearchResults([]);
            setSelectedResult(null);
            setError(null);
            await fetchData();
            setQuery('');
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = async (suggestion) => {
        setQuery(suggestion.name);
        setSearchPerformed(true);
        setSearchResults([]);
        setSelectedResult(null);
        await fetchDetails(suggestion);
        setSuggestions([]);
    };

    return (
        <div className="services-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 className="header-title">Star Wars Search</h1>
            <br />
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="people">Characters</option>
                <option value="planets">Planets</option>
                <option value="starships">Starships</option>
            </select>
            <div style={{ position: 'relative', textAlign: 'center' }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="search-input"
                    style={{ marginRight: '10px', width: '300px' }}
                />
                {suggestions.length > 0 && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, width: '82%', backgroundColor: 'white', border: '2px solid #000000', borderRadius: '5px', zIndex: 999 }}>
                        {suggestions.map((suggestion, index) => (
                            <div key={index} onClick={() => handleSuggestionClick(suggestion)} style={{ padding: '5px', cursor: 'pointer' }}>
                                {suggestion.name}
                            </div>
                        ))}
                    </div>
                )}
                <button onClick={handleSearch} disabled={buttonDisabled}>Search</button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {searchResults.map((result, index) => (
                <div key={index} className="result-container">
                    <div className="details">
                        <h2>{result.name}</h2>
                        <button onClick={() => fetchDetails(result)}>View Details</button>
                        {imageUrls[result.name] && <img src={imageUrls[result.name]} alt={result.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                    </div>
                </div>
            ))}
            {selectedResult && (
                <div className="details">
                    <h2>{selectedResult.name}</h2>
                    {searchType === 'people' && (
                        <>
                            <p>Height: {selectedResult.height}</p>
                            <p>Mass: {selectedResult.mass}</p>
                            <p>Hair Color: {selectedResult.hair_color}</p>
                            <p>Skin Color: {selectedResult.skin_color}</p>
                            <p>Eye Color: {selectedResult.eye_color}</p>
                            <p>Birth Year: {selectedResult.birth_year}</p>
                            <p>Gender: {selectedResult.gender}</p>
                            {selectedResult.homeworldName && <p>Homeworld: {selectedResult.homeworldName}</p>}
                            <p>Films: {selectedResult.filmsNames && selectedResult.filmsNames.length > 0 ? selectedResult.filmsNames.map((film, index) => <span key={index}>{film}, </span>) : 'Unknown'}</p>
                            <p>Species: {selectedResult.species && selectedResult.species.length}</p>
                            <p>Vehicles: {selectedResult.vehicles && selectedResult.vehicles.length}</p>
                            <p>Starships: {selectedResult.starships && selectedResult.starships.length}</p>
                        </>
                    )}
                    {searchType === 'planets' && (
                        <>
                            <p>Rotation Period: {selectedResult.rotation_period}</p>
                            <p>Orbital Period: {selectedResult.orbital_period}</p>
                            <p>Diameter: {selectedResult.diameter}</p>
                            <p>Climate: {selectedResult.climate}</p>
                            <p>Gravity: {selectedResult.gravity}</p>
                            <p>Surface Water: {selectedResult.surface_water}</p>
                            <p>Population: {selectedResult.population}</p>
                            <p>Residents: {selectedResult.residentsNames && selectedResult.residentsNames.length > 0 ? selectedResult.residentsNames.map((resident, index) => <span key={index}>{resident}, </span>) : 'Unknown'}</p>
                            <p>Films: {selectedResult.filmsNames && selectedResult.filmsNames.length > 0 ? selectedResult.filmsNames.map((film, index) => <span key={index}>{film}, </span>) : 'Unknown'}</p>
                        </>
                    )}
                    {searchType === 'starships' && (
                        <>
                            <p>Model: {selectedResult.model}</p>
                            <p>Manufacturer: {selectedResult.manufacturer}</p>
                            <p>Length: {selectedResult.length}</p>
                            <p>Max Atmosphering Speed: {selectedResult.max_atmosphering_speed}</p>
                            <p>Crew: {selectedResult.crew}</p>
                            <p>Passengers: {selectedResult.passengers}</p>
                            <p>Hyperdrive Rating: {selectedResult.hyperdrive_rating}</p>
                            <p>MGLT: {selectedResult.MGLT}</p>
                            <p>Films: {selectedResult.filmsNames && selectedResult.filmsNames.length > 0 ? selectedResult.filmsNames.map((film, index) => <span key={index}>{film}, </span>) : 'Unknown'}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Search;
