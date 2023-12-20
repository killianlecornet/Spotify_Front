import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';
import MusicControlBar from '../../components/MusicControlBar/MusicControlBar';

function DetailArtist() {
    const { id } = useParams();
    const [artist, setArtist] = useState([]);
    const [musics, setMusics] = useState([]);
    const [currentMusicIndex, setCurrentMusicIndex] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URI_API}/api/artist/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log('Données récupérées :', data);
                setArtist(data);
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
            <LeftNavbar />
            <div className='mainInfos'>
                <div>
                    <img src={artist.imageUrl} alt={artist.imageUrl} height='200px' />
                    <h1>{artist.name}</h1>
                    <p>{artist.description}</p>
                </div>

                <div>
                    <h2>Musiques de l'artiste :</h2>
                    <div>
                        {musics.map((music, index) => (
                            <div key={music._id} onClick={() => setCurrentMusicIndex(index)} className='hover'>
                                <h3>{music.title}</h3>
                                <p>{music.genre}</p>
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

export default DetailArtist;
