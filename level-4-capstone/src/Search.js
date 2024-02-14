import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Search() {
    // State variables
    const [searchResults, setSearchResults] = useState([]); // Holds search results from SWAPI
    const [query, setQuery] = useState(''); // Tracks user input in the search field
    const [selectedResult, setSelectedResult] = useState(null); // Stores details of the selected search result
    const [searchType, setSearchType] = useState('people'); // Tracks the type of data being searched
    const [suggestions, setSuggestions] = useState([]); // Stores suggestions based on user input
    const [imageUrls, setImageUrls] = useState({}); // Stores URLs of images fetched from Unsplash
    const [buttonDisabled, setButtonDisabled] = useState(true); // Manages the search button disabled state
    const [searchPerformed, setSearchPerformed] = useState(false); // Tracks if a search has been performed
    const [loading, setLoading] = useState(false); // Indicates if data is being loaded
    const [error, setError] = useState(null); // Stores errors that occur during data fetching

    // Fetches images from Unsplash API for the given query
    const fetchImages = async (query) => {
        try {
            const response = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=TwliGt1t3cHtYaF2KBTxfbLSFJsetRx7hNdkZrEIUL0`);
            const imageUrl = response.data.results[0].urls.regular;
            return imageUrl;
        } catch (error) {
            console.error('Error fetching image:', error);
            return null;
        }
    };

    // Effect to fetch an image when selectedResult changes
    useEffect(() => {
        if (selectedResult) {
            const fetchImage = async () => {
                const imageUrl = await fetchImages(selectedResult.name);
                setImageUrls(prevImageUrls => ({ ...prevImageUrls, [selectedResult.name]: imageUrl }));
            };
            fetchImage();
        }
    }, [selectedResult]);

    // Effect to update button disabled state based on query
    useEffect(() => {
        setButtonDisabled(query.trim() === '');
    }, [query]);

    // Fetches suggestions based on the provided value
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

    // Fetches data from SWAPI based on the current query and searchType
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

    // Fetches details for the provided result
    const fetchDetails = async (result) => {
        try {
            const response = await axios.get(result.url);
            setSelectedResult(response.data);
            // Additional fetching based on searchType
            // For example, fetching homeworldName for people, filmsNames for people/planets/starships, residentsNames for planets, etc.
        } catch (error) {
            console.error('Error fetching details:', error);
        }
    };

    // Handles input change events and fetches suggestions if input is not empty
    const handleInputChange = async (value) => {
        setQuery(value);
        if (value.trim() !== '') {
            await fetchSuggestions(value);
        } else {
            setSuggestions([]);
        }
    };

    // Initiates a search
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

    // Handles clicks on suggestion items
    const handleSuggestionClick = async (suggestion) => {
        setQuery(suggestion.name);
        setSearchPerformed(true);
        setSearchResults([]);
        setSelectedResult(null);
        await fetchDetails(suggestion);
        setSuggestions([]);
    };

    // JSX rendering
    return (
        <div className="services-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Search title */}
            <h1 className="header-title">Star Wars Search</h1>
            <br />
            {/* Dropdown to select search type */}
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="people">Characters</option>
                <option value="planets">Planets</option>
                <option value="starships">Starships</option>
            </select>
            {/* Search input with suggestions dropdown */}
            <div style={{ position: 'relative', textAlign: 'center' }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="search-input"
                    style={{ marginRight: '10px', width: '300px' }}
                />
                {/* Suggestions dropdown */}
                {suggestions.length > 0 && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, width: '82%', backgroundColor: 'white', border: '2px solid #000000', borderRadius: '5px', zIndex: 999 }}>
                        {suggestions.map((suggestion, index) => (
                            <div key={index} onClick={() => handleSuggestionClick(suggestion)} style={{ padding: '5px', cursor: 'pointer' }}>
                                {suggestion.name}
                            </div>
                        ))}
                    </div>
                )}
                {/* Search button */}
                <button onClick={handleSearch} disabled={buttonDisabled}>Search</button>
            </div>
            {/* Loading indicator */}
            {loading && <p>Loading...</p>}
            {/* Error message */}
            {error && <p>{error}</p>}
            {/* Render search results */}
            {searchResults.map((result, index) => (
                <div key={index} className="result-container">
                    <div className="details">
                        {/* Result name and view details button */}
                        <h2>{result.name}</h2>
                        <button onClick={() => fetchDetails(result)}>View Details</button>
                        {/* Render image if available */}
                        {imageUrls[result.name] && <img src={imageUrls[result.name]} alt={result.name} style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                    </div>
                </div>
            ))}
            {/* Render details for selected result */}
            {selectedResult && (
                <div className="details">
                    {/* Render image if available */}
                    {imageUrls[selectedResult.name] && (
                        <img
                            src={imageUrls[selectedResult.name]}
                            alt={selectedResult.name}
                            style={{ maxWidth: '300px', maxHeight: '300px' }}
                        />
                    )}
                    {/* Render details based on searchType */}
                    {/* For example, details for people, planets, or starships */}
                </div>
            )}
        </div>
    );
}

export default Search;
