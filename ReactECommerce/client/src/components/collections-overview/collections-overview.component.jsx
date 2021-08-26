import React from 'react';
import { useSelector } from 'react-redux';
import CollectionPreview from '../collection-preview/collection-preview.component';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

const CollectionsOverview = () => {

    const collections = useSelector(selectCollectionsForPreview)
    return (
        <div className='collections-overview'>
            {collections.map(({ id, ...otherProps }) => (
                <CollectionPreview key={id} {...otherProps} />
            ))}
        </div>
    );
};



export default CollectionsOverview;