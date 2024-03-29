import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MusicControlBar from '../../components/MusicControlBar/MusicControlBar';
import './AlbumDetail.css';
import { Link } from 'react-router-dom';

function AlbumDetail() {
    const { id } = useParams();
    const [album, setAlbum] = useState({ music: [] });
    const [musics, setMusics] = useState([]);
    const [currentMusicIndex, setCurrentMusicIndex] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URI_API}/api/album/${id}`)
            .then(response => response.json())
            .then(data => {
                setAlbum(data);
                setMusics(data.music);
                setCurrentMusicIndex(0);
            })
            .catch(error => console.error('Erreur :', error));
    }, [id]);

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

    const playNextMusic = () => {
        setCurrentMusicIndex(index => (index + 1) % musics.length);
    };

    const playPreviousMusic = () => {
        setCurrentMusicIndex(index => (index - 1 + musics.length) % musics.length);
    };

    const currentMusic = musics[currentMusicIndex];

    return (
        <div className='mainInfosAlbum'>
            <div className='albumDetail'>
                <img loading="lazy" src={album.imageUrl} alt={album.imageUrl} height='200px' className='link' />
                <div className='textAlbum'>
                    <h1 className='link'>{album.title}</h1>
                    <p className='link'>{album.description ?? "Aucune description pour cet album"}</p>
                </div>
            </div>

            <div>
                <h2>Musiques de l'album :</h2>
                <div>
                    {musics.map((music, index) => (
                        <div key={music._id} onClick={() => setCurrentMusicIndex(index)} className='musiqueList'>
                            <img loading="lazy" src={music.imageUrl} alt={music.title} />
                            <h3>{music.title}</h3>
                            <Link to={`/artist/${music.artist}`} key={music.artist?._id} className='link'>
                                <p className='link'>Artiste</p>
                            </Link>
                            <p>{music.genre}</p>
                            <span onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(music);
                            }} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                                {favorites.includes(music._id) ? '💚' : '🤍'}
                            </span>
                        </div>
                    ))}
                </div>
                <MusicControlBar
                    musics={musics}
                    setCurrentMusicIndex={setCurrentMusicIndex}
                    currentMusic={currentMusic}
                    playNext={playNextMusic}
                    playPrevious={playPreviousMusic}
                />
            </div>
        </div>
    );
}

export default AlbumDetail;
