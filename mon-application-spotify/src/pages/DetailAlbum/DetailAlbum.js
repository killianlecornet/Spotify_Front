import React from 'react';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';
import AlbumDetail from '../../components/AlbumDetail/AlbumDetail';

function DetailAlbum() {

    return (
        <div className='appAlbum'>
            <LeftNavbar />
            <AlbumDetail/>
        </div>
    );
}

export default DetailAlbum;
