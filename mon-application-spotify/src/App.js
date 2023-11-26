import React from 'react';
import MusicList from './components/MusicList';
import MusicForm from './components/MusicForm';
import Search from './components/SearchByArtist';

function App() {
  return (
    <div className="App">
      <h1>Application Spotify</h1>
      <Search />
      {/* <MusicForm /> */}
      <MusicList />
    </div>
  );
}

export default App;
