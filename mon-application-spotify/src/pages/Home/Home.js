import React from 'react';
import './Home.css';
import ArtistList from '../../components/ArtistList/ArtistList';
import AlbumList from '../../components/AlbumList/AlbumList';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';

function Home() {
    return (
        <div className="App">
            <LeftNavbar />

            <div className='mainInfos'>
                <AlbumList />
                <ArtistList />
            </div>
        </div>
    );
}

export default Home;