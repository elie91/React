import React from 'react';
import { useHistory } from 'react-router-dom';

const CollectionItem = ({ item, title }) => {

    const history = useHistory();

    return (
        <div className="collection-item" onClick={() => history.push({
            pathname: `${history.match.url}/${title ? `${title.toLowerCase()}/` : ""}${item.name}`,
            state: { item }
        })}>
            <div
                className="collection-item__image"
                style={{
                    backgroundImage: `url(${item.imageUrl})`
                }}
            />
            <div className="collection-item__footer">
                <span className="collection-item__name">{item.name}</span>
                <span className="collection-item__price">{item.price}</span>
            </div>
            {/*       <CustomButton onClick={() => addItem(item)} inverted>
                Ajouter au panier
            </CustomButton>*/}
        </div>
    );
}


export default CollectionItem;
