import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomBoutton from '../custom-button/custom-button.component'
import { signUpStart } from "../../redux/user/user.actions";
import { useDispatch } from "react-redux";

const SignUp = () => {

    const dispatch = useDispatch();

    const [userCredentials, setCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }
        dispatch(signUpStart({ displayName, email, password }))
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setCredentials({ ...userCredentials, [name]: value });
    };


    return (
        <div className='sign-up'>
            <h2 className='sign-up__title'>Nouvel(le) utilisateur(-trice)</h2>
            <span className='sign-up__text'>Créer un compte avec un email et un mot de passe</span>
            <form className='sign-up__form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    label='Nom'
                    required
                />

                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label='Email'
                    required
                />

                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    label='Mot de passe'
                    required
                />

                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirmer le mot de passe'
                    required
                />

                <CustomBoutton type="submit" value="Submit Form">
                    Inscription
                </CustomBoutton>
            </form>
        </div>
    )

};


export default SignUp;