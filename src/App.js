import React from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Weather from './components/Weather';
import './bootstrap.min.css';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            temperature: undefined,
            feels_like: undefined,
            humidity: undefined,
            city: undefined,
            country: undefined,
            description: undefined,
            error: undefined,
            weatherCode: undefined,
            submitted: false,
            bg: undefined,
            weatherBgs: {
                Thunderstorm: "../assets/lightning.jpg",
                Drizzle: "../assets/clouds.jpg",
                Rain: "../assets/clouds.jpg",
                Snow: "../assets/clouds.jpg",
                Atmosphere: "../assets/clouds.jpg",
                Clear: "../assets/sun2.jpg",
                Clouds: "../assets/clouds.jpg"
            }
        }
        this.state.bg = this.state.weatherBgs.Clear;
    }

    getWeatherBackground = rangeId => {
        switch (true) {
          case rangeId >= 200 && rangeId < 232:
            this.setState({
                bg: this.state.weatherBgs.Thunderstorm,
            });
            break;
          case rangeId >= 300 && rangeId <= 321:
            this.setState({ 
                bg: this.state.weatherBgs.Drizzle,
            });
            break;
          case rangeId >= 500 && rangeId <= 521:
            this.setState({ 
                bg: this.state.weatherBgs.Rain,
            });
            break;
          case rangeId >= 600 && rangeId <= 622:
            this.setState({ 
                bg: this.state.weatherBgs.Snow,
            });
            break;
          case rangeId >= 701 && rangeId <= 781:
            this.setState({ 
                bg: this.state.weatherBgs.Atmosphere,
            });
            break;
          case rangeId === 800:
            this.setState({
                bg: this.state.weatherBgs.Clear,
            });
            break;
          case rangeId >= 801 && rangeId <= 804:
            this.setState({ 
                bg: this.state.weatherBgs.Clouds,
            });
            break;
          default:
            this.setState({ 
                bg: this.state.weatherBgs.Clear,
            });
        }
      }
    
    getWeather = async (e) => {
        e.preventDefault();
        let city = e.target.elements.city.value;
        let country = e.target.elements.country.value;
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`);
        const data = await api_call.json();
        this.setState({submitted: true});
        if(data && data.cod === 200) {
            this.setState({
                temperature: data.main.temp,
                feels_like: data.main.feels_like,
                humidity: data.main.humidity,
                city: data.name,
                country: data.sys.country,
                description: data.weather[0].description,
                weatherCode: data.weather[0].id,
                error: undefined
            });
            this.getWeatherBackground(this.state.weatherCode);
        } else {
            this.setState({
                error: (data && data.message) ? data.message : "An error occurred trying to find that location. Please try again.",
                temperature: undefined,
                feels_like: undefined,
                humidity: undefined,
                city: undefined,
                country: undefined,
                description: undefined,
                weatherCode: undefined,
            })
        }
    }

    render() {
        let weatherOrError;
        if(this.state.error) {
            weatherOrError = <div>{this.state.error}</div>
        } else if(this.state.submitted) {
            weatherOrError = <Weather 
                                temperature={this.state.temperature}
                                feels_like={this.state.feels_like}
                                city={this.state.city}
                                country={this.state.country}
                                humidity={this.state.humidity}
                                description={this.state.description}
                                error={this.state.error}
                            />
        }
        return (
            <div className="App" style={this.state.bg ? {backgroundImage: `url(${this.state.bg})` } : {}}>
                <Header />
                <Form onGetWeather={this.getWeather} />
                {weatherOrError}
            </div>
        )
    }
};

export default App;