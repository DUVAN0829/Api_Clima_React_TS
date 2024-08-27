
import styles from './App.module.css'
import Alert from './components/Alert/Alert'

import Form from './components/Form/Form'

import WeatherDetail from './components/WeatherDetail/WeatherDetail'

import useWeather from './hooks/UseWeather'

function App() {

  const { fetchWeather, weather, hasWeatherData, notFound } = useWeather()

  return (
    <>

      <h1 className={styles.title} > Buscador de Clima </h1>

      <div className={styles.container}>

        <Form fetchWeather={fetchWeather} />

        {hasWeatherData && <WeatherDetail weather={weather} />}
        {notFound && <Alert> Ciudad no encontrada </Alert>}

      </div>

    </>
  )
}

export default App
