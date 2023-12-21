import React from 'react';
import PlaylistForm from '../../components/PlaylistForm/PlaylistForm';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';

const CreatePlaylist = () => {
  return (
    <div className='App'>
      <LeftNavbar />
      <PlaylistForm/>
    </div>
  );
};

export default CreatePlaylist;
