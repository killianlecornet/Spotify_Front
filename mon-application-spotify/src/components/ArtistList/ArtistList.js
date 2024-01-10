import React, { useState, useEffect } from 'react';
import './ArtistList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function ArtistList() {
    const [artists, setArtists] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [transition, setTransition] = useState(true);

    useEffect(() => {
        // Assurez-vous que l'URL correspond à votre route pour récupérer tous les artistes
        fetch(`${process.env.REACT_APP_URI_API}/api/artist`)
            .then(response => response.json())
            .then(data => {
                setArtists(data);
            })
            .catch(error => console.error('Erreur :', error));
    }, []);

    const handleNext = () => {
        setStartIndex(prevIndex => Math.min(prevIndex + 5, artists.length - 5));
        setTransition(true);
    };

    const handlePrev = () => {
        setStartIndex(prevIndex => Math.max(prevIndex - 5, 0));
        setTransition(true);
    };

    const handleTransitionEnd = () => {
        setTransition(false);
    };

    return (
        <div>
            <h1>Liste des Artistes</h1>
            <div className={`carousel ${transition ? 'transition' : ''}`} onTransitionEnd={handleTransitionEnd}>
                {artists.slice(startIndex, startIndex + 5).map(artist => (
                    <Link to={`/artist/${artist._id}`} key={artist._id} className='carousel-item'>
                        <img loading="lazy" src={artist.imageUrl} alt={artist.imageUrl} />
                        <p className='link'>Artiste: {artist.name}</p>
                    </Link>
                ))}
                <FontAwesomeIcon icon={faChevronLeft} className={`button prev ${startIndex === 0 ? 'disabled' : ''}`} onClick={handlePrev} />
                <FontAwesomeIcon icon={faChevronRight} className={`button next ${startIndex >= artists.length - 5 ? 'disabled' : ''}`} onClick={handleNext} />
            </div>
        </div>
    );
}

export default ArtistList;
