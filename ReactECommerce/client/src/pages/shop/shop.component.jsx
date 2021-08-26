import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';
import ItemPage from '../../components/item-page/item-page.component';


const ShopPage = ({ match }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCollectionsStart())
    }, [dispatch]);

    return (
        <>
            <Route exact
                path={`${match.path}`}
                component={CollectionsOverviewContainer}
            />
            <Route exact
                path={`${match.path}/:collectionId`}
                component={CollectionPageContainer}
            />
            <Route exact
                path={`${match.path}/:collectionId/:itemName`}
                component={ItemPage}
            />
        </>
    );

};

export default ShopPage;
