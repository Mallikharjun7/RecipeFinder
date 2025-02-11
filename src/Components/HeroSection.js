import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
    return (
        <div className="cover-page">
            <div className="overlay"></div>
            <div className="content">
                <h1>Welcome to Recipe Finder</h1>
                <p>Discover delicious recipes tailored to your taste!</p>
            </div>
        </div>
    );
};

export default HeroSection;
