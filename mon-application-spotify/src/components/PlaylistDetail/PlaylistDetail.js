import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MusicControlBar from '../../components/MusicControlBar/MusicControlBar';
import  './PlaylistDetail.css';

function PlaylistDetail() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState({ music: [] });
    const [musics, setMusics] = useState([]);
    const [currentMusicIndex, setCurrentMusicIndex] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URI_API}/api/playlist/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log('Données récupérées :', data);
                setPlaylist(data);
                setMusics(data.music); // Mettre à jour l'état des musiques avec les données récupérées
                setCurrentMusicIndex(0); // Initialiser l'index de la musique en cours à 0
            })
            .catch(error => console.error('Erreur :', error));
    }, [id]);

    const playNextMusic = () => {
        setCurrentMusicIndex(index => (index + 1) % musics.length);
    };

    const playPreviousMusic = () => {
        setCurrentMusicIndex(index => (index - 1 + musics.length) % musics.length);
    };

    const currentMusic = musics[currentMusicIndex];

    const toggleFavorite = (music) => {
        const musicId = music._id;
        const updatedFavorites = favorites.includes(musicId)
            ? favorites.filter(id => id !== musicId)
            : [...favorites, musicId];

        setFavorites(updatedFavorites);

        // Sauvegarder les favoris dans le localStorage
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        // Stocker la musique dans le localStorage
        const allMusics = JSON.parse(localStorage.getItem('allMusics')) || [];
        const existingMusicIndex = allMusics.findIndex(existingMusic => existingMusic._id === musicId);

        if (existingMusicIndex !== -1) {
            // La musique est déjà dans le localStorage, mettez à jour les informations
            allMusics[existingMusicIndex] = music;
        } else {
            // La musique n'est pas encore dans le localStorage, ajoutez-la
            allMusics.push(music);
        }

        localStorage.setItem('allMusics', JSON.stringify(allMusics));
    };

    return (
        <div className='App'>
            <div className='mainInfos'>
                <div className='albumDetail'>
                    <img src={playlist.imageUrl} alt={playlist.imageUrl} height='200px' />
                    <div>
                        <h1 className='link'>{playlist.title}</h1>
                        <h2 className='link'>{playlist.artist?.name ?? "Nom de l'artiste non disponible"}</h2>
                        <p className='link'>{playlist.description ?? "Aucune description pour cet playlist"}</p>
                    </div>
                </div>

                <div>
                    <h2>Musiques de la playlist :</h2>
                    <div>
                        {musics.map((music, index) => (
                            <div key={music._id} onClick={() => setCurrentMusicIndex(index)} className='playlistList'>
                                <img src={music.imageUrl} alt={music.title} />
                                <h3>{music.title}</h3>
                                <p>{music.genre}</p>
                                <span onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(music);
                                }} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                                    {favorites.includes(music._id) ? '❤️' : '🤍'}
                                </span>
                            </div>
                        ))}
                    </div>
                    <MusicControlBar
                        music={musics}
                        setCurrentMusicIndex={setCurrentMusicIndex}
                        currentMusic={currentMusic}
                        playNext={playNextMusic}
                        playPrevious={playPreviousMusic}
                    />
                </div>
            </div>
        </div>
    );
}

export default PlaylistDetail;
