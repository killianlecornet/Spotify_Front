import React from 'react';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';
import ArtistDetail from '../../components/ArtistDetail/ArtistDetail';

function DetailArtist() {
    return (
        <div className='appArtist'>
            <LeftNavbar />
            <ArtistDetail/>
        </div>
    );
}

export default DetailArtist;
