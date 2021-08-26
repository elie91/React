import React from 'react';

const Navigation = ({onRouteChange, IsSignedIn}) => {
        if(IsSignedIn) 
        {
            return(
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signout')} className='f3 link din black underline pa3 pointer' > Déconnexion </p>
                </nav>
            )

        } else {
            return(
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => onRouteChange('signin')} className='f3 link din black underline pa3 pointer'> Connexion </p>
                    <p onClick={() => onRouteChange('register')} className='f3 link din black underline pa3 pointer' > Inscription </p>
                </nav>
            );
        }
}

export default Navigation;