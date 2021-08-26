import React from 'react';
import './ImageLinkForm.css';
import '../Signin/signin.css';


const ImageLinkForm = ({onInputChange, onPictureSubmit}) => {

    return(
        <div> 
            <p className='f3'>
                {'Ceci est une application qui détectera tous les visages dans vos images. Essayez-la!'}
            </p>
            <div className='center'> 
                <div className='form center pa4 br3 shadow-5'>
                    <input
                        placeholder={'Saisir l\'url d\'une image'} 
                        onChange={onInputChange} 
                        className='f4 pa2 w-70 center' 
                        type='text'/>
                    <button 
                        onClick={onPictureSubmit} 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>
                        Détecter
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;