import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';

function SearchPage() {

    return (
        <div className='App'>
            <LeftNavbar/>
            <div className='AppSearchbar'>
                <SearchBar/>
            </div>
        </div>
    );
}

export default SearchPage;
