import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';
import ShippingPage from "./pages/shipping/shipping.component";

const App = () => {

    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());
    }, [dispatch]);

    return (
        <div>
            <Header />
            <Switch>
                {/* Every route component has access to match, location and history */}
                <Route exact path="/" component={HomePage} />
                <Route path="/shop" component={ShopPage} />
                <Route exact path="/checkout" component={CheckoutPage} />
                <Route exact path="/shipping" component={ShippingPage} />
                <Route exact path="/signin" render={() => {
                    if (currentUser) {
                        return (<Redirect to='/' />)
                    } else {
                        return (<SignInAndSignUp />)
                    }
                }} />
            </Switch>
        </div>
    );
};



export default App;
