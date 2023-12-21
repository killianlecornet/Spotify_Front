import React, { useState, useEffect } from 'react';
import './PlaylistForm.css'; // Assurez-vous d'importer votre fichier CSS

const PlaylistForm = () => {
    const [playlistData, setPlaylistData] = useState({
        title: '',
        imageUrl: '',
        description: '',
        music: [],
    });

    const [musicList, setMusicList] = useState([]);

    useEffect(() => {
        const fetchMusicList = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/musics');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des musiques.');
                }
                const musicData = await response.json();
                setMusicList(musicData);
            } catch (error) {
                console.error('Erreur lors de la récupération des musiques:', error.message);
            }
        };

        fetchMusicList();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlaylistData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleMusicChange = (e) => {
        const selectedMusicOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setPlaylistData((prevData) => ({
            ...prevData,
            music: selectedMusicOptions,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/playlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(playlistData),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création de la playlist.');
            }

            const createdPlaylist = await response.json();
            console.log('Playlist créée avec succès:', createdPlaylist);
        } catch (error) {
            console.error('Erreur lors de la création de la playlist:', error.message);
        }
    };

    return (
        <div className="playlist-form-container">
            <form className="playlist-form" onSubmit={handleSubmit}>
                <label htmlFor="title">Titre :</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={playlistData.title}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="imageUrl">URL de l'image :</label>
                <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={playlistData.imageUrl}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="description">Description :</label>
                <textarea
                    id="description"
                    name="description"
                    value={playlistData.description}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="music">Musiques :</label>
                <select
                    id="music"
                    name="music"
                    value={playlistData.music}
                    onChange={handleMusicChange}
                    multiple
                    required
                >
                    {musicList.map((music) => (
                        <option key={music._id} value={music._id}>
                            {music.title} {/* Affiche le titre de la musique */}
                        </option>
                    ))}
                </select>

                <button type="submit">Créer la playlist</button>
            </form>
        </div>
    );
};

export default PlaylistForm;