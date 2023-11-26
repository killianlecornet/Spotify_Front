import React from 'react';

function MusicPlayer({ url }) {
    return (
        <div>
            <audio controls src={url}>
                Votre navigateur ne supporte pas l'élément <code>audio</code>.
            </audio>
        </div>
    );
}

export default MusicPlayer;
