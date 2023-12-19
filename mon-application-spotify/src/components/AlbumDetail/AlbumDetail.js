import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MusicControlBar from '../../components/MusicControlBar/MusicControlBar';
import './AlbumDetail.css';

function AlbumDetail() {
    const { id } = useParams();
    const [album, setAlbum] = useState({ music: [] });
    const [musics, setMusics] = useState([]);
    const [currentMusicIndex, setCurrentMusicIndex] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/api/album/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log('detail album :', data);
                setAlbum(data);
                setMusics(data.music);
                setCurrentMusicIndex(0);
            })
            .catch(error => console.error('Erreur :', error));
    }, [id]);

    const toggleFavorite = (musicId) => {
        const updatedFavorites = favorites.includes(musicId)
            ? favorites.filter(id => id !== musicId)
            : [...favorites, musicId];

        setFavorites(updatedFavorites);
        // Vous pouvez sauvegarder les favoris dans le stockage local si nécessaire
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const playNextMusic = () => {
        setCurrentMusicIndex(index => (index + 1) % musics.length);
    };

    const playPreviousMusic = () => {
        setCurrentMusicIndex(index => (index - 1 + musics.length) % musics.length);
    };

    const currentMusic = musics[currentMusicIndex];

    return (
        <div className='App'>
            <div className='mainInfos'>
                <div className='albumDetail'>
                    <img src={album.imageUrl} alt={album.imageUrl} height='200px' className='link' />
                    <div className='textAlbum'>
                        <h1 className='link'>{album.title}</h1>
                        <h2 className='link'>{album.artist?.name ?? "Nom de l'artiste non disponible"}</h2>
                        <p className='link'>{album.description ?? "Aucune description pour cet album"}</p>
                    </div>
                </div>

                <div>
                    <h2>Musiques de l'album :</h2>
                    <div>
                        {musics.map((music, index) => (
                            <div key={music._id} onClick={() => setCurrentMusicIndex(index)} className='musiqueList'>
                                <img src={music.imageUrl} alt={music.title} />
                                <h3>{music.title}</h3>
                                <p>{music.genre}</p>
                                <span onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(music._id);
                                }} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                                    {favorites.includes(music._id) ? '❤️' : '🤍'}
                                </span>
                            </div>
                        ))}
                    </div>
                    <MusicControlBar
                        currentMusic={currentMusic}
                        playNext={playNextMusic}
                        playPrevious={playPreviousMusic}
                    />
                </div>
            </div>
        </div>
    );
}

export default AlbumDetail;
