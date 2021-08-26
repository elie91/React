import React, {useState} from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import "./login-page.style.scss";
import {signInStartAsync} from "../../redux/user/user.actions";
import {selectIsLoginFetching, selectLoginError} from "../../redux/user/user.selectors";
import Spinner from "../spinner/spinner.component";
import Error from "../error/error.component";

const LoginPage = ({error, isLoading, signInStartAsync}) => {

    const [userData, setUserData] = useState({
        username: "",
        password: ""
    });

    const handleChange = event => {
        const {name, value} = event.target;
        setUserData({...userData, [name]: value});
    }

    const handleSubmit = event => {
        event.preventDefault();
        signInStartAsync(userData);
    }

    return (
        <div className="d-flex-center-both">
            {isLoading && <Spinner />}
            <form className="form-signin" onSubmit={handleSubmit}>
                <h1 className="h2 mb-3 font-weight-normal">Bonjour jeune Padawan !</h1>
                {error && <Error error="Identifiants invalides" />}
                <label htmlFor="username" className="sr-only">
                    Nom d'utilisateur
                </label>
                <input type="text" id="username" name="username" onChange={handleChange} className="form-control" placeholder="Nom d'utilisateur"
                       required autoFocus/>

                <label htmlFor="password" className="sr-only">
                    Mot de passe
                </label>
                <input type="password" onChange={handleChange} name="password" id="password" className="form-control" placeholder="Mot de passe"
                       required=""/>

                <button className="btn btn-lg btn-primary btn-block" type="submit">
                    Accèder à l'alliance rebelle
                </button>
            </form>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    error: selectLoginError,
    isLoading: selectIsLoginFetching
});

const mapDispatchToProps = dispatch => ({
    signInStartAsync: usernameAndPassword => dispatch(signInStartAsync(usernameAndPassword))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);