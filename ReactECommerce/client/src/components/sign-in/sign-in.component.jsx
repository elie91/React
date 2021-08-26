import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomBoutton from '../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

const SignIn = () => {

    const dispatch = useDispatch();

    const [userCredentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password);
        dispatch(emailSignInStart({ email, password }))
    };

    const handleChange = event => {
        const { value, name } = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    };


    return (
        <div className="sign-in">
            <h2 className='sign-in__title'>Je suis déjà utilisateur(-trice)</h2>
            <span className='sign-in__text'>
                Saisissez votre adresse e-mail et votre mot de passe pour vous identifier.
            </span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name="email"
                    type="email"
                    handleChange={handleChange}
                    value={email}
                    label="Email"
                    required
                />
                <FormInput
                    name="password"
                    type="password"
                    value={password}
                    handleChange={handleChange}
                    label="Mot de passe"
                    required
                />

                <div className="sign-in__password_forgot">
                    <span> Mot de passe oublié ? </span>
                </div>

                <div className='buttons'>
                    <CustomBoutton type="submit" value="Submit Form">
                        SE CONNECTER
                    </CustomBoutton>

                    <CustomBoutton type='button' onClick={() => dispatch(googleSignInStart())} isGoogleSignIn>
                        SE CONNECTER AVEC GOOGLE
                    </CustomBoutton>
                </div>

            </form>
        </div>
    );

};


export default SignIn;
