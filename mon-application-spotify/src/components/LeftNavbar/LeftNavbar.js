import React from 'react';
import './LeftNavbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faHome, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import PlaylistList from '../PlaylistList/PlaylistList';
import { Link } from 'react-router-dom';
import Coeur from '../../assets/liked-songs.png'

function LeftNavbar() {
    return (
        <div className='leftNavbar'>
            <div className='topLeft'>
                <div className='iconMargin'>
                    <Link to={'/'} className='link'>
                        <FontAwesomeIcon icon={faHome} /> Maison
                    </Link>
                </div>
                <div className='iconMargin'>
                    <Link to={'/search'} className='link'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> Recherche
                    </Link>
                </div>
            </div>

            <div className='bottomLeft'>
                <div className='iconMargin'>
                    <FontAwesomeIcon icon={faBook} />  bibliotheque
                </div>
                <div>
                    <Link to={'/favorite'} className='playlist link'>
                        <img src={Coeur} alt={'favorites'} />
                        <p>Coups de coeur</p>
                    </Link>
                </div>
                <div>
                    <PlaylistList />
                </div>
            </div>
        </div>
    );
}

export default LeftNavbar;
