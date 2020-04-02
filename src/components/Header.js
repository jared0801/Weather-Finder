import React from 'react';

import './Header.css';

const Header = () => (
    <div>
        <a className="title-link" href="/"><h1 className="display-3 title">Weather Finder</h1></a>
        <p className="lead">Find out temperature, conditions, and more...</p>
    </div>
)

export default Header;