import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

// Styles
const ControlBar = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #121212;
    color: white;
    padding: 10px;
`;

const Container = styled.div`
    display: flex;
`;

const ContainerFlex = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    max-width: 10rem;
`;

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

const MusicInfo = styled.div`
    flex-grow: 1;
    text-align: center;
    max-width: 9rem;
`;

const ControlButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    margin: 0 10px;
`;

function MusicControlBar({ currentMusic, playNext, playPrevious }) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(100);
    const audioRef = useRef(null);

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
        }
    };

    return (
        <ControlBar>
            <MusicInfo>
                {currentMusic && <p>{currentMusic.title} - {currentMusic.artist}</p>}
            </MusicInfo>

            <ContainerFlex>
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
                />
                <div>
                    <FontAwesomeIcon icon={faForward} onClick={playNext} />
                </div>
                <ProgressBar value={progress} onChange={handleProgressChange} />
            </ContainerFlex>
            
            <Container>
                <VolumeControl value={volume} onChange={handleVolumeChange} />
            </Container>
        </ControlBar>
    );
}

export default MusicControlBar;
