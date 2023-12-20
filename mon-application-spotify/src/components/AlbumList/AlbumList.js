import React, { useState, useEffect } from 'react';
import './AlbumList.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function AlbumList() {
    const [albums, setAlbums] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [transition, setTransition] = useState(true);

    useEffect(() => {
        // Assurez-vous que l'URL correspond à votre route pour récupérer tous les albums
        fetch('https://spotify-api-gules-two.vercel.app/api/album')
            .then(response => response.json())
            .then(data => {
                console.log('AlbumList récupérées :', data);
                setAlbums(data);
            })
            .catch(error => console.error('Erreur :', error));
    }, []);

    const handleNext = () => {
        setStartIndex(prevIndex => Math.min(prevIndex + 7, albums.length - 7));
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
            <h1>Liste des Albums</h1>
            <div className={`carousel ${transition ? 'transition' : ''}`} onTransitionEnd={handleTransitionEnd}>
                {albums.slice(startIndex, startIndex + 6).map(album => (
                    <Link to={`/album/${album._id}`} key={album._id} className='carousel-item'>
                        <img src={album.imageUrl} alt={album.imageUrl} />
                        <p className='link'>Album : {album.title}</p>
                        <p className='link'>Artiste : {album.artist?.name ?? 'Artiste inconnu'}</p>
                        {/* <Link to={`/artist/${album.artist._id}`} key={album.artist._id} className='link'>
                            <p className='link'>Artiste : {album.artist?.name ?? 'Artiste inconnu'}</p>
                        </Link> */}
                    </Link>
                ))}
                <FontAwesomeIcon icon={faChevronLeft} className={`button prev ${startIndex === 0 ? 'disabled' : ''}`} onClick={handlePrev} />
                <FontAwesomeIcon icon={faChevronRight} className={`button next ${startIndex >= albums.length - 6 ? 'disabled' : ''}`} onClick={handleNext} />
            </div>
        </div>
    );
}

export default AlbumList;
