import React, { useState } from 'react';
import './MusicForm.css';

function MusicForm() {
    const [music, setMusic] = useState({ title: '', artist: '', genre: '' });

    const handleSubmit = (event) => {
        event.preventDefault();
        // Ajouter la logique pour envoyer la musique à l'API
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Titre" 
                value={music.title} 
                onChange={e => setMusic({ ...music, title: e.target.value })}
            />
            <input 
                type="text" 
                placeholder="Artiste" 
                value={music.artist} 
                onChange={e => setMusic({ ...music, artist: e.target.value })}
            />
            <button type="submit">Soumettre</button>
        </form>
    );
}

export default MusicForm;
