import React, { useState, useEffect } from 'react';
import './PlaylistList.css';
import { Link } from 'react-router-dom';

function PlaylistList() {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        // Assurez-vous que l'URL correspond à votre route pour récupérer tous les playlists
        fetch(`${process.env.REACT_APP_URI_API}/api/playlist`)
            .then(response => response.json())
            .then(data => {
                setPlaylists(data);
            })
            .catch(error => console.error('Erreur :', error));
    }, []);

    return (
        <div>
            <div>
                {playlists.map(playlist => (
                    <Link to={`/playlist/${playlist._id}`} key={playlist._id} className='playlist link'>
                        <img loading="lazy" src={playlist.imageUrl} alt={playlist.imageUrl} />
                        <p>{playlist.title}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default PlaylistList;
