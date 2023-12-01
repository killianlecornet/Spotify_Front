import React, { useState, useEffect } from 'react';
import MusicPlayer from './MusicPlayer';

function FavoritesPage({ musics }) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Charger les favoris depuis le localStorage
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    const favoriteMusics = musics.filter(music => 
        favorites.includes(music._id.toString())
    );

    return (
        <div>
            <h1>Mes Favoris</h1>
            {favoriteMusics.length > 0 ? (
                favoriteMusics.map(music => (
                    <div key={music._id}>
                        <h3>{music.title}</h3>
                        <p>{music.artist}</p>
                        <MusicPlayer url={music.url} />
                    </div>
                ))
            ) : (
                <p>Vous n'avez pas encore de favoris.</p>
            )}
        </div>
    );
}

export default FavoritesPage;
