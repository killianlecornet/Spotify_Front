import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// Styles
const ControlBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #282828;
    color: white;
    padding: 10px;
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
            <ControlButton onClick={playPrevious}>⏮️</ControlButton>
            <ControlButton onClick={togglePlayPause}>
                {isPlaying ? '⏸️' : '▶️'}
            </ControlButton>
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
            <ControlButton onClick={playNext}>⏭️</ControlButton>
            <MusicInfo>
                {currentMusic && <p>{currentMusic.title} - {currentMusic.artist}</p>}
            </MusicInfo>
            <VolumeControl value={volume} onChange={handleVolumeChange} />
            <ProgressBar value={progress} onChange={handleProgressChange} />
        </ControlBar>
    );
}

export default MusicControlBar;
