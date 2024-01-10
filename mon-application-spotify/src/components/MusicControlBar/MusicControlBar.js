import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faPause, faPlay, faVolumeHigh, faVolumeOff, faRepeat, faRedo, faRandom } from '@fortawesome/free-solid-svg-icons';
import './MusicControlBar.css';
import io from 'socket.io-client';

const ProgressBar = styled.input.attrs({
    type: 'range',
    min: '0',
    max: '100',
    defaultValue: '0',
})`
    width: 100%;
`;

const VolumeControl = styled.input.attrs({
    type: 'range',
    min: '0',
    max: '100',
    defaultValue: '100',
})`
    width: 100px;
`;

function MusicControlBar({ musics, setCurrentMusicIndex, currentMusic, playNext, playPrevious }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(100);
    const [isLooping, setIsLooping] = useState(false);
    const audioRef = useRef(null);
    const [isRandom, setIsRandom] = useState(false);

    // const socket = io(`${process.env.REACT_APP_URI_API}`);
    const socket = io('https://spotify-front-back.vercel.app'); // Remplacez par l'URL de votre serveur

    useEffect(() => {
        setProgress(0);

        socket.on('play', () => {
            if (audioRef.current) {
                audioRef.current.play();
                setIsPlaying(true);
            }
        });

        socket.on('pause', () => {
            if (audioRef.current) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        });

        socket.on('musicChange', (track) => {
            if (audioRef.current) {
                audioRef.current.src = track.url;
                audioRef.current.load();
                setIsPlaying(false);
            }
        });

        socket.on('playbackUpdate', (state) => {
            if (audioRef.current && Math.abs(audioRef.current.currentTime - state.currentTime) > 0.5) {
                audioRef.current.currentTime = state.currentTime;
            }
        });

        const updatePlayback = () => {
            if (audioRef.current) {
                const currentTime = audioRef.current.currentTime;
                socket.emit('updatePlayback', { currentTime });
            }
        };
    
        const playbackInterval = setInterval(updatePlayback, 500); // Mise à jour toutes les 500 ms
    
        return () => {
            clearInterval(playbackInterval);
            // ... Nettoyage des autres gestionnaires d'événements
        };

        return () => {
            clearInterval(playbackInterval);
            socket.off('play');
            socket.off('pause');
            socket.off('musicChange');
            socket.off('playbackUpdate');
        };
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
                socket.emit('pause');
            } else {
                audio.play();
                socket.emit('play');
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleLoop = () => {
        setIsLooping(!isLooping);
    };

    const toggleVolumeMute = () => {
        const audio = audioRef.current;
        if (audio) {
            const newVolume = audio.volume === 0 ? 100 : 0;
            setVolume(newVolume);
            audio.volume = newVolume / 100;
            if (newVolume === 0) {
                audio.pause();
                setIsPlaying(false);
            } else {
                if (!isPlaying) {
                    audio.play();
                    setIsPlaying(true);
                }
            }
        }
    };

    const handleSongEnd = () => {
        if (isLooping) {
            setProgress(0);
            const audio = audioRef.current;
            if (audio) {
                audio.currentTime = 0;
                audio.play();
            }
        } else {
            playNext();
        }
    };

    const handleProgressChange = (event) => {
        const newProgress = event.target.value;
        setProgress(newProgress);
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = (audio.duration * newProgress) / 100;
        }
    };

    const handleVolumeChange = (event) => {
        const newVolume = event.target.value;
        setVolume(newVolume);
        const audio = audioRef.current;
        if (audio) {
            audio.volume = newVolume / 100;
            if (parseInt(newVolume, 10) === 0) {
                audio.pause();
                setIsPlaying(false);
            } else {
                if (!isPlaying) {
                    audio.play();
                    setIsPlaying(true);
                }
            }
        }
    };

    const playRandomMusic = () => {
        if (musics && musics.length > 0) {
            const randomIndex = Math.floor(Math.random() * musics.length);
            setCurrentMusicIndex(randomIndex); // Met à jour l'index de la musique actuelle
        } else {
            console.error("No music available for random play.");
        }
    };

    return (
        <div className='controlBar'>
            <div className='musicInfo'>
                {currentMusic &&
                    <div className='infosMusic'>
                        <img src={currentMusic.imageUrl} height={'55px'} alt={currentMusic.title} />
                        <p>{currentMusic.title}</p>
                    </div>
                }
            </div>

            <div className='midWrapper'>
                <div>
                    <FontAwesomeIcon icon={faBackward} onClick={playPrevious} />
                </div>
                <div>
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} onClick={togglePlayPause} />
                </div>
                <audio
                    ref={audioRef}
                    src={currentMusic?.url}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onTimeUpdate={() => {
                        const audio = audioRef.current;
                        if (audio) {
                            const newProgress = (audio.currentTime / audio.duration) * 100;
                            setProgress(newProgress);
                        }
                    }}
                    onEnded={handleSongEnd}
                />
                <div>
                    <FontAwesomeIcon icon={faForward} onClick={playNext} />
                </div>
                <ProgressBar value={progress} onChange={handleProgressChange} />
            </div>

            <div className='volume'>
                <FontAwesomeIcon icon={faRandom} onClick={playRandomMusic} className={`random ${isRandom ? 'active' : ''}`}/>
                <FontAwesomeIcon icon={isLooping ? faRedo : faRepeat} onClick={toggleLoop} />
                <FontAwesomeIcon icon={volume === 0 ? faVolumeOff : faVolumeHigh} onClick={toggleVolumeMute} />
                <VolumeControl value={volume} onChange={handleVolumeChange} />
            </div>
        </div>
    );
}

export default MusicControlBar;