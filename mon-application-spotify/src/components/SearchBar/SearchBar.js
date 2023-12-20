import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css'; // Importez votre fichier CSS

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            // Fetch search results from your API only if searchTerm is not empty
            if (searchTerm.trim() !== '') {
                const response = await fetch(`http://localhost:3001/api/search?query=${searchTerm}`);
                const data = await response.json();
                setSearchResults(data);
            } else {
                // Clear search results if searchTerm is empty
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    const redirectToDetailPage = (result) => {
        // En fonction du type de résultat, redirigez l'utilisateur vers la page de détails appropriée
        if (result.type === 'artist') {
            navigate(`/artist/${result._id}`);
        } else if (result.type === 'album') {
            navigate(`/album/${result._id}`);
        } else if (result.type === 'music') {
            navigate('/');
        } else if (result.type === 'playlist') {
            navigate(`/playlist/${result._id}`);
        }
    };

    useEffect(() => {
        // Déclenchez la recherche chaque fois que le terme de recherche change
        handleSearch();
    }, [searchTerm]);

    return (
        <div className="mainInfosSearchBar">
            <input
                className="search-input"
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchResults.length > 0 && (
                <div className="card-container">
                    {searchResults.map((result) => (
                        <div key={result._id} className="card" onClick={() => redirectToDetailPage(result)}>
                            <img className="card-image" src={result.imageUrl} alt={result.name || result.title} />
                            <div className="card-info">
                                {result.type === 'artist' && (
                                    <span className="result-artist">Artiste: {result.name}</span>
                                )}
                                {result.type === 'album' && (
                                    <span className="result-album">Album: {result.title}</span>
                                )}
                                {result.type === 'music' && (
                                    <span className="result-music">Chanson: {result.title}</span>
                                )}
                                {result.type === 'playlist' && (
                                    <span className="result-playlist">Playlist: {result.name}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
