import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faPause, faPlay, faVolumeHigh, faVolumeOff, faRepeat, faRedo, faRandom } from '@fortawesome/free-solid-svg-icons';
import './MusicControlBar.css';

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
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(100);
    const [isLooping, setIsLooping] = useState(false);
    const audioRef = useRef(null);
    const [isRandom, setIsRandom] = useState(false);


    useEffect(() => {
        setProgress(0);
        setIsPlaying(true); // Commencer la musique par défaut en lecture
    }, [currentMusic]);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
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
            // Si le volume est réglé à 0, mettez la lecture en pause
            if (newVolume === 0) {
                audio.pause();
                setIsPlaying(false);
            } else {
                // Sinon, reprenez la lecture si elle était en pause
                if (!isPlaying) {
                    audio.play();
                    setIsPlaying(true);
                }
            }
        }
    };

    const handleSongEnd = () => {
        if (isLooping) {
            // Répéter la musique en remettant la progression à zéro
            setProgress(0);
            const audio = audioRef.current;
            if (audio) {
                audio.currentTime = 0;
                audio.play();
            }
        } else {
            // Jouer la musique suivante en fin de piste
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
            // Si le volume est réglé à 0, mettez la lecture en pause
            if (parseInt(newVolume, 10) === 0) {
                audio.pause();
                setIsPlaying(false);
            } else {
                // Sinon, reprenez la lecture si elle était en pause
                if (!isPlaying) {
                    audio.play();
                    setIsPlaying(true);
                }
            }
        }
    };

    const playRandomMusic = ({ musics }) => {
        if (musics && musics.length > 0) {
            const randomIndex = Math.floor(Math.random() * musics.length);
            console.log("Random music played. isRandom:", true);
        } else {
            console.error("No music available for random play.");
        }
    };
    


    return (
        <div className='controlBar'>
            <div className='musicInfo'>
                {currentMusic &&
                    <div className='infosMusic'>
                        <img src={currentMusic.imageUrl} height={'55px'} alt='imageUrl' />
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
                    autoPlay
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onTimeUpdate={() => {
                        const audio = audioRef.current;
                        if (audio) {
                            const newProgress = (audio.currentTime / audio.duration) * 100;
                            setProgress(newProgress);
                        }
                    }}
                    onEnded={handleSongEnd} // Appelé lorsque la piste se termine
                />
                <div>
                    <FontAwesomeIcon icon={faForward} onClick={playNext} />
                </div>
                <ProgressBar value={progress} onChange={handleProgressChange} />
            </div>

            <div className='volume'>
                <FontAwesomeIcon icon={faRandom} onClick={() => {playRandomMusic({ musics})}} className={`random ${isRandom ? 'active' : ''}`}/>
                <FontAwesomeIcon icon={isLooping ? faRedo : faRepeat} onClick={toggleLoop} />
                <FontAwesomeIcon icon={volume === 0 ? faVolumeOff : faVolumeHigh} onClick={toggleVolumeMute} />
                <VolumeControl value={volume} onChange={handleVolumeChange} />
            </div>
        </div>
    );
}

export default MusicControlBar;