import React from 'react';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';
import PlaylistDetail from '../../components/PlaylistDetail/PlaylistDetail';

function DetailPlaylist() {

    return (
        <div className='App'>
            <LeftNavbar />
            <PlaylistDetail/>
        </div>
    );
}

export default DetailPlaylist;
