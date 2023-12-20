import React, { useState } from 'react';
import './SearchByArtist.css';

function SearchByArtist() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        console.log("Recherche lancée", searchTerm); // Pour vérifier la valeur saisie
        try {
            const response = await fetch(`https://spotify-api-gules-two.vercel.app/api/musics/search?artist=${searchTerm}`);
            const data = await response.json();
            console.log("Résultats de recherche", data); // Pour voir les résultats obtenus
            setSearchResults(data);
        } catch (error) {
            console.error('Erreur de recherche:', error);
        }
    };
    

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input 
                    type="text" 
                    placeholder="Rechercher par artiste" 
                    value={searchTerm} 
                    onChange={handleSearchChange} 
                />
                <button type="submit">Rechercher</button>
            </form>

            {searchResults.length > 0 && (
                <div>
                    <h2>Résultats de recherche</h2>
                    {searchResults.map(music => (
                        <div key={music._id}>
                            <h3>{music.title}</h3>
                            <p>{music.artist}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchByArtist;
