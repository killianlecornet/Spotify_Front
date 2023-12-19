import React, { useState, useEffect } from 'react';
// import MusicList from '../../components/MusicList/MusicList';
// import FavoritesPage from '../../components/FavoritesPage/FavoritesPage';
import './Home.css';
import ArtistList from '../../components/ArtistList/ArtistList';
import AlbumList from '../../components/AlbumList/AlbumList';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';
// import MusicForm from './components/MusicForm/MusicForm';
// import Search from './components/SearchByArtist';

function Home() {
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
            <LeftNavbar/>

            <div className='mainInfos'>
                <AlbumList/>
                <ArtistList/>
                {/* <MusicList musics={musics} toggleFavorite={toggleFavorite} favorites={favorites} /> */}
                {/* <FavoritesPage favorites={favorites} musics={musics} /> */}
            </div>
        </div>
    );
}

export default Home;