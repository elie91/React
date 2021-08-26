import React from 'react';
import { useHistory } from 'react-router-dom';
import CollectionItem from '../collection-item/collection-item.component';

const CollectionPreview = ({ title, items }) => {

    const history = useHistory();

    return (
        <div className="collection-preview">
            <h1 className="title_small title_small--link" onClick={() => history.push(`${history.match.path}/${history.routeName}`)}>
                {title.toUpperCase()}
            </h1>
            <div className="collection-preview__preview">
                {items
                    .filter((item, index) => index < 4)
                    .map(item => (
                        <CollectionItem key={item.id} item={item} title={title} />
                    ))}
            </div>
        </div>
    );
}

export default CollectionPreview;
