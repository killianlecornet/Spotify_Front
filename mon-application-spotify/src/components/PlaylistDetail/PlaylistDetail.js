import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MusicControlBar from '../../components/MusicControlBar/MusicControlBar';

function PlaylistDetail() {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState({ music: [] });
    const [musics, setMusics] = useState([]);
    const [currentMusicIndex, setCurrentMusicIndex] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/api/playlist/${id}`)
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

    return (
        <div className='App'>
            <div className='mainInfos'>
                <div>
                    <img src={playlist.imageUrl} alt={playlist.imageUrl} height='200px' />
                    <h1>{playlist.title}</h1>
                    <h2>{playlist.artist?.name ?? "Nom de l'artiste non disponible"}</h2>
                    <p>{playlist.description}</p>
                </div>

                <div>
                    <h2>Musiques de la playlist :</h2>
                    <div>
                        {musics.map((music, index) => (
                            <div key={music._id} onClick={() => setCurrentMusicIndex(index)} className='hover'>
                                <h3>{music.title}</h3>
                                <p>{music.genre}</p>
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

export default PlaylistDetail;
