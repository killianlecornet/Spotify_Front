import React from 'react';
import '../../App.css';

function SongCard() {
    return (

        <div class="spotify-playlists">
            <h2>Spotify Playlists</h2>

            <div class="list">
                <div class="item">
                    <img src="https://i.scdn.co/image/ab67616d0000b2733b5e11ca1b063583df9492db" />
                    <div class="play">
                        <span class="fa fa-play"></span>
                    </div>
                    <h4>Today's Top Hits</h4>
                    <p>Rema & Selena Gomez are on top of the...</p>
                </div>
            </div>
        </div>

    );
}

export default SongCard;