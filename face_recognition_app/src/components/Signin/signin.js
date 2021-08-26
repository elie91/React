import React from 'react';
import './signin.css';

class Signin extends React.Component  {

    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            error: ''
        }
    }

    displayError = (error) => {
        this.setState({error: error})
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        const {signInEmail, signInPassword} = this.state;
        fetch('https://glacial-lake-25709.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
            else{
                this.displayError(user);
            }
        }) 
        
    }
    
    render()
    {
        const {onRouteChange} = this.props;
        return (
            <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Connexion</legend>
                            {
                                this.state.error.length 
                                ?
                                    <div className="alert alert-danger">{this.state.error}</div>
                                :
                                ''
                            } 
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    onChange={this.onEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" 
                                    />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Mot de passe</label>
                                <input 
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password" 
                                    />
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Connexion" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Inscription</p>
                        </div>
                    </div>
                </main>	
            </article>
        )
    }

}



export default Signin;