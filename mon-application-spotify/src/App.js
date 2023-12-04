import React, { useState, useEffect } from 'react';
import MusicList from './components/MusicList';
import FavoritesPage from './components/FavoritesPage';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faHome, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function App() {
    const [musics, setMusics] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/musics')
            .then(response => response.json())
            .then(data => setMusics(data))
            .catch(error => console.error('Erreur:', error));
    }, []);

    const toggleFavorite = (musicId) => {
        setFavorites(favorites.includes(musicId)
            ? favorites.filter(id => id !== musicId)
            : [...favorites, musicId]);
    };

    return (
        <div className="App">
            <div className='leftNavbar'>
                <div className='topLeft'>
                    <div className='iconMargin'>
                        <FontAwesomeIcon icon={faHome} /> Maison
                    </div>
                    <div className='iconMargin'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> Recherche
                    </div>
                </div>

                <div className='bottomLeft'>
                    <div className='iconMargin'>
                        <FontAwesomeIcon icon={faBook} /> bibliotheque
                    </div>
                </div>
            </div>

            <div className='mainInfos'>
                <MusicList musics={musics} toggleFavorite={toggleFavorite} favorites={favorites} />
                <FavoritesPage favorites={favorites} musics={musics} />
            </div>
        </div>
    );
}

export default App;
