import React, { useState, useEffect } from 'react';
import './AlbumList.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function AlbumList() {
    const [albums, setAlbums] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [transition, setTransition] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URI_API}/api/album`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La récupération des albums a échoué.');
                }
                return response.json();
            })
            .then(data => {
                console.log('AlbumList récupérées :', data);
                setAlbums(data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des albums :', error);
                setError('Une erreur est survenue lors de la récupération des albums.');
            });
    }, []);

    const handleNext = () => {
        setStartIndex(prevIndex => Math.min(prevIndex + 5, albums.length - 4));
        setTransition(true);
    };

    const handlePrev = () => {
        setStartIndex(prevIndex => Math.max(prevIndex - 5, 0));
        setTransition(true);
    };

    const handleTransitionEnd = () => {
        setTransition(false);
    };

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return (
        <div>
            <h1>Liste des Albums</h1>
            <div className={`carousel ${transition ? 'transition' : ''}`} onTransitionEnd={handleTransitionEnd}>
                {albums.slice(startIndex, startIndex + 5).map(album => (
                    <Link to={`/album/${album._id}`} key={album._id} className='carousel-item'>
                        <img src={album.imageUrl} alt={album.imageUrl} loading="lazy"/>
                        <p className='link'>Album : {album.title}</p>
                        <Link to={`/artist/${album.artist?._id}`} key={album.artist?._id} className='link'>
                            <p className='link'>Artiste : {album.artist?.name ?? 'Artiste inconnu'}</p>
                        </Link>
                    </Link>
                ))}
                <FontAwesomeIcon icon={faChevronLeft} className={`button prev ${startIndex === 0 ? 'disabled' : ''}`} onClick={handlePrev} />
                <FontAwesomeIcon icon={faChevronRight} className={`button next ${startIndex >= albums.length - 5 ? 'disabled' : ''}`} onClick={handleNext} />
            </div>
        </div>
    );
}

export default AlbumList;
