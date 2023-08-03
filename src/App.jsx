import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [flightData, setFlightData] = useState([])
  const submit = async () => {
    try {
      const response = await axios.get('https://aegis-convent-backend.vercel.app/api/flights', {
        params: {
          source: source.trim().toLowerCase(),
          destination: destination.trim().toLowerCase(),
        }
      })
      if (response.data.length === 0) {
        alert('No flights available for the given source and destination.');
      } else {
        setFlightData(response.data);
      }
    }
    catch (error) {
      console.log(error.message)
    }
  }

  const sourceQuery = (event) => {
    setSource(event.target.value)
  }

  const destinationQuery = (event) => {
    setDestination(event.target.value)
  }

  return (
    <>
      <p id='welcome'>Welcome to FlightInfo</p>
      <div className='main'>
        <div className='inputs'>

          <label>Source: </label>
          <input type="text" onChange={sourceQuery} />
        </div>
        <div className='inputs'>

          <label>Destination: </label>
          <input type="text" name='destination' onChange={destinationQuery} />
        </div>
        <button className='button' onClick={submit}>Seach</button>
      </div>
      <div className='cards'>
        {
          flightData.map((flight) => (
            <div className='card'>
              <h3>Airline: {flight.airline} </h3>
              <h3>Price: {flight.price}</h3>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
