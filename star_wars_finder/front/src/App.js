import React, {lazy, Suspense} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import ErrorBoundary from "./components/error-boundary/error-boundary";
import {selectCurrentUser} from './redux/user/user.selectors';
import NavbarComponent from "./components/navbar/navbar.component";
import LoginPage from "./components/login-page/login-page.component";
import Autocomplete from "./components/autocomplete/autocomplete.component";
import Spinner from "./components/spinner/spinner.component";

const FilmRecord = lazy(() => import('./components/swappi-record/film-record.component'));
const PeopleRecord = lazy(() => import('./components/swappi-record/people-record.component'));
const PlanetRecord = lazy(() => import('./components/swappi-record/planet-record.component'));
const SpecieRecord = lazy(() => import('./components/swappi-record/specie-record.component'));
const StarshipRecord = lazy(() => import('./components/swappi-record/starship-record.component'));
const VehicleRecord = lazy(() => import('./components/swappi-record/vehicle-record.component'));

const App = ({currentUser}) => {

    return (
        <>
            {currentUser && <NavbarComponent/>}
            <Switch>
                <ErrorBoundary>
                    <Suspense fallback={<Spinner/>}>
                        {/*redirect to login if user is not connected*/}
                        <Route render={() => !currentUser && <Redirect to='/login'/>}/>

                        <div className="container">
                            {currentUser && <Autocomplete/>}
                            <Route exact path="/films/:id" component={FilmRecord}/>
                            <Route exact path="/planets/:id" component={PlanetRecord}/>
                            <Route exact path="/people/:id" component={PeopleRecord}/>
                            <Route exact path="/species/:id" component={SpecieRecord}/>
                            <Route exact path="/starships/:id" component={StarshipRecord}/>
                            <Route exact path="/vehicles/:id" component={VehicleRecord}/>
                        </div>

                        <Route exact path="/login" render={() => {
                            if (currentUser) {
                                return (<Redirect to='/'/>)
                            } else {
                                return (<LoginPage/>)
                            }
                        }}/>
                    </Suspense>
                </ErrorBoundary>
            </Switch>
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(App);
