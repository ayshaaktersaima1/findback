import React from 'react';
import Banner from './Banner';
import HomeOverview from './Alls';

const Homepage = () => {
    return (
        <div className='w-full md:w-[90%] mx-auto'>
            <Banner></Banner>
            <HomeOverview></HomeOverview>
        </div>
    );
};

export default Homepage;