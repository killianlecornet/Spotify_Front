import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css'; // Importez votre fichier CSS

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const [debounceTimer, setDebounceTimer] = useState(null);

    const handleSearch = async () => {
        try {
            // Fetch search results from your API only if searchTerm is not empty
            if (searchTerm.trim() !== '') {
                const response = await fetch(`${process.env.REACT_APP_URI_API}/api/search?query=${searchTerm}`);
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

    const handleSearchDebounced = () => {
        clearTimeout(debounceTimer); // Annulez le délai d'attente précédent

        // Démarrez un nouveau délai d'attente
        const timer = setTimeout(() => {
            handleSearch();
        }, 400); // Délai d'attente de 500 ms

        setDebounceTimer(timer); // Stockez la référence du nouveau délai d'attente
    };

    useEffect(() => {
        // Déclenchez la recherche chaque fois que le terme de recherche change
        handleSearchDebounced();
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
                            <div className="card-info">
                                {result.type === 'artist' && (
                                    <h3 className="result-artist">Artiste: {result.name}</h3>
                                )}
                                {result.type === 'album' && (
                                    <h3 className="result-album">Album: {result.title}</h3>
                                )}
                                {result.type === 'music' && (
                                    <h3 className="result-music">Chanson: {result.title}</h3>
                                )}
                                {result.type === 'playlist' && (
                                    <h3 className="result-playlist">Playlist: {result.title}</h3>
                                )}
                            </div>
                            <img className="card-image" src={result.imageUrl} alt={result.name || result.title} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
