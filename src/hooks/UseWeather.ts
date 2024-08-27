
import { useMemo, useState } from "react"

import axios from "axios"

import z, { set } from 'zod'

import { SearchType } from "../types"

//Zod Schema
const Weather = z.object({

    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    })

})

//Type Zod
export type Weather = z.infer<typeof Weather>

//Component
export default function useWeather() {

    //State
    const [weather, setWeather] = useState<Weather>({
        name: "",
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0
        }
    })

    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearchType) => {

        const appId = import.meta.env.VITE_API_KEY

        try {

            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

            const { data } = await axios(geoUrl)

            //console.log(data);

            //Comprobar si Existe
            if (!data[0]) {
                setNotFound(true)
                return
            } else {
                setNotFound(false)
            }

            const lat = data[0].lat;
            const lon = data[0].lon;

            //console.log(lat)
            //console.log(lon)

            const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            const { data: weatherResult } = await axios(weatherApi) //:weatherResult es una forma de renombrar a data ya que se repite ese nombre.

            //console.log(weatherResult)

            const result = Weather.safeParse(weatherResult) //si es true, safeParse almacena los datos en data{}.

            //console.log(result);
            //console.log(result.data);

            if (result.success) {
                setWeather(result.data) //define el state.
            }

        } catch (error) {
            console.log(error)
        }

    }

    const hasWeatherData = weather.name;

    return {
        fetchWeather,
        weather,
        hasWeatherData,
        notFound
    }

}