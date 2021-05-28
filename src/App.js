import { Component, React } from 'react';
import logo from './logo.svg';
import './css/App.css';

import axios from 'axios';

//Components
import Card from './components/Card';

//Icons
import { FaTemperatureLow, 
		FaTemperatureHigh,
		FaTint,
		FaWind,
		FaSun,
		FaCloud,
		FaCloudRain,
		FaSnowflake,
		FaCloudShowersHeavy,
		FaQuestion
		} from 'react-icons/fa';

//API KEY
const API_KEY = 'd314c48b0e5bdc5a2c991ee1225ea704';

class App extends Component{
	
	state={
		temp: 0,
		max: 0,
		min: 0,
		hum: 0,
		wind_speed: 0,
		day: '',
		time_state: null
	}
	
	//Se ejecuta al comienzo, antes de renderizar
	componentDidMount = async()=>{
		
		var city = 'bsas';
		
		var date = new Date();
		
		await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
		.then(res =>{
			this.setState({
				temp: res.data.main.temp,
				max: res.data.main.temp_max,
				min: res.data.main.temp_min,
				hum: res.data.main.humidity,
				wind_speed: res.data.wind.speed,
				day: this.bindDayOfWeek(date.getDay()) + ' ' + date.getDate(),
				time_state: res.data.weather[0].main
			})
			
		})
		.catch(err => console.error(err))

	}
	
	bindDayOfWeek = (index)=>{
		
		const dias = [
			'Domingo',
			'Lunes',
			'Martes',
			'Miercoles',
			'Jueves',
			'Viernes',
			'Sabado'
		];
		
		return dias[index];
		
	}
	
	render(){
		
		const { temp, max, min, hum, wind_speed, day, time_state } = this.state;
		
		const setIcon = ()=>{
			
			switch(time_state){
				case 'Clear':
					return <FaSun className="icons-xl" />
				break;
				case 'Clouds':
					return <FaCloud className="icons-xl" />
				break;
				case 'Rain': 
					return <FaCloudRain className="icons-xl" />
				break;
				case 'Snow':
					return <FaSnowflake className="icons-xl" />
				break;
				case 'Extreme':
					return <FaCloudShowersHeavy className="icons-xl" />
				break;
				default:
					return <FaQuestion className="icons-xl" />
				break;
			}
			
		}
		
		return(
			<div className="main">
				<div className="title">
					<h1>App Clima</h1>
				</div>
				<div>
					<div className="info">
						<div>
							{setIcon()}
						</div>
						<div>
							<h2> {temp}° </h2> 
							<h2> {day} </h2>
						</div>
					</div>
				</div>
				<div className="card--box">
					<Card icon={FaTemperatureHigh} data={max} />
					<div className="card spacer-y">
						<FaTemperatureHigh className="icons" /> <h3> Máxima: </h3> <span>{max}°</span>
					</div>
					<div className="card spacer-y">
						<FaTemperatureLow className="icons" /> <h3> Mínima: </h3> <span>{min}°</span>
					</div>
					<div className="card spacer-y">
						<FaTint className="icons" /> <h3> Humedad: </h3> <span>{hum}%</span>
					</div>
					<div className="card spacer-y">
						<FaWind className="icons" /> <h3> Viento: </h3> <span>{wind_speed} km/h</span>
					</div>
				</div>
				
			</div>
		);
		
	}
	
}

export default App;