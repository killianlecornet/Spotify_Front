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
    const [shuffledMusicIndices, setShuffledMusicIndices] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(null);

    useEffect(() => {
        setProgress(0);
        setIsPlaying(true);
        // Générer un ordre aléatoire initial lorsque la liste de musiques change
        const generateShuffledIndices = () => {
            const indices = Array.from({ length: musics.length }, (_, index) => index);
            return indices.sort(() => Math.random() - 0.5);
        };
        setShuffledMusicIndices(generateShuffledIndices());
    }, [currentMusic, musics]);

    const toggleRandom = () => {
        setIsRandom(!isRandom);
        if (!isRandom) {
            // Si la lecture devient aléatoire, régénérer l'ordre aléatoire initial
            const newShuffledIndices = shuffledMusicIndices.slice().sort(() => Math.random() - 0.5);
            setShuffledMusicIndices(newShuffledIndices);
        }
    };

    const playNextMusic = () => {
        if (isRandom) {
            // Lecture aléatoire
            const nextRandomIndex = (currentIndex + 1) % musics.length;
            setCurrentIndex(nextRandomIndex);
            setCurrentMusicIndex(shuffledMusicIndices[nextRandomIndex]);
        } else {
            // Lecture normale
            setCurrentIndex((prevIndex) => (prevIndex + 1) % musics.length);
            setCurrentMusicIndex((prevIndex) => (prevIndex + 1) % musics.length);
        }
    };

    const playPreviousMusic = () => {
        if (isRandom) {
            // Lecture aléatoire
            const prevRandomIndex = (currentIndex - 1 + musics.length) % musics.length;
            setCurrentIndex(prevRandomIndex);
            setCurrentMusicIndex(shuffledMusicIndices[prevRandomIndex]);
        } else {
            // Lecture normale
            setCurrentIndex((prevIndex) => (prevIndex - 1 + musics.length) % musics.length);
            setCurrentMusicIndex((prevIndex) => (prevIndex - 1 + musics.length) % musics.length);
        }
    };

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
                    <FontAwesomeIcon icon={faBackward} onClick={playPreviousMusic} />
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
                    <FontAwesomeIcon icon={faForward} onClick={playNextMusic} />
                </div>
                <ProgressBar value={progress} onChange={handleProgressChange} />
            </div>

            <div className='volume'>
                <FontAwesomeIcon icon={faRandom} onClick={toggleRandom} className={`random ${isRandom ? 'active' : ''}`} />
                <FontAwesomeIcon icon={isLooping ? faRedo : faRepeat} onClick={toggleLoop} />
                <FontAwesomeIcon icon={volume === 0 ? faVolumeOff : faVolumeHigh} onClick={toggleVolumeMute} />
                <VolumeControl value={volume} onChange={handleVolumeChange} />
            </div>
        </div>
    );
}

export default MusicControlBar;