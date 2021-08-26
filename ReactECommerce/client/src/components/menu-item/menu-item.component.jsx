import React from 'react';
import { useHistory } from 'react-router-dom';

const MenuItem = ({ title, imageUrl, linkUrl }) => {

    const history = useHistory();

    return (
        <div
            className={`menu-item`}
            onClick={() => history.push(`${history.match.url}${linkUrl}`)}>
            <div
                className="menu-item__image"
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className="menu-item__content">
                <h1 className="menu-item__title">{title.toUpperCase()}</h1>
                {/*<span className="menu-item__subtitle">SHOP NOW</span>*/}
            </div>

        </div>
    );
}

export default MenuItem;
