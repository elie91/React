import React, {Component} from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Signin from '../components/Signin/signin';
import Register from '../components/Register/Register';
import ErrorBoundry from '../components/ErrorBoundry/ErrorBoundry';

const app = new Clarifai.App({
  apiKey: '717a8b6abbd246bf93af9e962c800d77'
 });


const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    },
  }
}

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    IsSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
}
class App extends Component{

  constructor(){
    super();
    this.state= initialState
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const Faces = data.outputs[0].data.regions.map(element => {
      return element.region_info.bounding_box;
    });

    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    const clarifaiFaces = Faces.map(element => {
      return {
        leftCol: element.left_col * width,
        topRow: element.top_row * height,
        rightCol : width - (element.right_col * width),
        bottomRow : height - (element.bottom_row * height)
      }
    });
    return clarifaiFaces;
  }

  displayFaceBox = (box) => {
    this.setState({box : box })
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if(response)
        {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => this.setState(Object.assign(this.state.user, {entries: count}) ))
          .catch(error => console.log(error));
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(error => console.log(error));   
  }

  onRouteChange = (route) => {
    switch(route)
    {
      case 'signin':
        this.setState({IsSignedIn: false});
        break;

      case 'signout':
        this.setState(initialState);
        break;
      
      case 'home':
        this.setState({IsSignedIn: true});
        break;
      
      default:
        this.setState({IsSignedIn: false});
        break;
    }
    this.setState({route: route });
  }

  render() {

    const { IsSignedIn, imageUrl, route, box , user} = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} IsSignedIn={IsSignedIn}/>
        { route === 'home' ? 
          <div>
            <Logo /> 
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (
            route === 'signin' 
            ?
              <ErrorBoundry>
                <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
              </ErrorBoundry>
            :
              <ErrorBoundry>
                <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} /> 
              </ErrorBoundry>
          )
      }
      </div>
    ); 
  }

}

export default App;
