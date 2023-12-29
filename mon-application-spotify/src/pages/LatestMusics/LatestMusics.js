import React from 'react';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';
import LatestMusicsDetail from '../../components/LatestMusicsDetail/LatestMusicsDetail';

function LatestMusics() {
    return (
        <div className='appArtist'>
            <LeftNavbar />
            <LatestMusicsDetail/>
        </div>
    );
}

export default LatestMusics;
