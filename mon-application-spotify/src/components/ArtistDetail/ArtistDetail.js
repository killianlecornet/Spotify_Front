import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MusicControlBar from '../../components/MusicControlBar/MusicControlBar';
import './ArtistDetail.css';
import { Link } from 'react-router-dom';

function ArtistDetail() {
    const { id } = useParams();
    const [artist, setArtist] = useState({});
    const [musics, setMusics] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [currentMusicIndex, setCurrentMusicIndex] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URI_API}/api/artist/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log('Artiste récupéré :', data);
                setArtist(data);
                setMusics(data.music || []);
                setAlbums(data.albums || []); // Utilisez un tableau vide si data.album est undefined
                setCurrentMusicIndex(0);
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
        <div className='mainInfosArtist'>
            <div className='albumDetail'>
                <img src={artist.imageUrl} alt={artist.imageUrl} height='200px' />
                <div>
                    <h1>{artist.name}</h1>
                    <p>{artist.description}</p>
                </div>
            </div>

            <div>
                <h2>Musiques de l'artiste :</h2>
                <div>
                    {musics && musics.length > 0 ? (
                        musics.map((music, index) => (
                            <div key={music._id} onClick={() => setCurrentMusicIndex(index)} className='playlistList'>
                                <img src={music.imageUrl} alt={music.title} />
                                <h3>{music.title}</h3>
                                <p>{music.genre}</p>
                                <span onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(music);
                                }} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                                    {favorites.includes(music._id) ? '💚' : '🤍'}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p>Aucune musique disponible.</p>
                    )}
                </div>
            </div>
            <div>
                <h2>Albums de l'artiste :</h2>
                <div>
                    {albums && albums.length > 0 ? (
                        albums.map((albums) => (
                            <Link to={`/album/${albums._id}`} key={albums._id}  className='playlistList'>
                                <img src={albums.imageUrl} alt={albums.title} />
                                <h3>{albums.title}</h3>
                                <p>{albums.description}</p>
                            </Link>
                        ))
                    ) : (
                        <p>Aucun album disponible.</p>
                    )}
                </div>
            </div>
            <MusicControlBar
                music={musics}
                setCurrentMusicIndex={setCurrentMusicIndex}
                currentMusic={currentMusic}
                playNext={playNextMusic}
                playPrevious={playPreviousMusic}
            />
        </div>
    );
}

export default ArtistDetail;
