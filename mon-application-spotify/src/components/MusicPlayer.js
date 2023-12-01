import React from 'react';

function MusicPlayer({ url }) {
    return (
        <div>
            <audio controls autoPlay src={url}>
                Votre navigateur ne supporte pas l'élément audio.
            </audio>
        </div>
    );
}

export default MusicPlayer;
