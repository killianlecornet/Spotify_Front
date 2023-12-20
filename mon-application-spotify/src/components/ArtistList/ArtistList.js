import React, { useState, useEffect } from 'react';
import './ArtistList.css';

function ArtistList() {
    const [artists, setArtists] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [transition, setTransition] = useState(true);

    useEffect(() => {
        // Assurez-vous que l'URL correspond à votre route pour récupérer tous les artistes
        fetch('https://spotify-api-gules-two.vercel.app/api/artist')
            .then(response => response.json())
            .then(data => {
                console.log('Données récupérées :', data);
                setArtists(data);
            })
            .catch(error => console.error('Erreur :', error));
    }, []);

    const handleNext = () => {
        setStartIndex(prevIndex => Math.min(prevIndex + 7, artists.length - 7));
        setTransition(true);
    };

    const handlePrev = () => {
        setStartIndex(prevIndex => Math.max(prevIndex - 7, 0));
        setTransition(true);
    };

    const handleTransitionEnd = () => {
        setTransition(false);
    };

    return (
        <div>
            <h1>Liste des Artistes</h1>
            <div className={`carousel ${transition ? 'transition' : ''}`} onTransitionEnd={handleTransitionEnd}>
                {artists.slice(startIndex, startIndex + 6).map(artist => (
                    <div key={artist._id} className='carousel-item'>
                        <img src={artist.imageUrl} alt={artist.imageUrl} />
                        <p>Nom: {artist.name}</p>
                        <p>Genre: {artist.description}</p>
                    </div>
                ))}
                <button className='prev' onClick={handlePrev} disabled={startIndex === 0}>
                    Précédent
                </button>
                <button className='next' onClick={handleNext} disabled={startIndex >= artists.length - 6}>
                    Suivant
                </button>
            </div>
        </div>
    );
}

export default ArtistList;
