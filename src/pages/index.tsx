
import RootLayout from "@/layouts/RootLayout";
import WeatherCard from "@/components/WeatherCard";
import Location from "@/components/Location";
import { useEffect, useState } from 'react';
import ButtonAppBar from "@/components/Appbar";
import { Grid, Container } from "@mui/material";
import { reverseGeocoding, getCurrentWeatherData, getHourlyForecastData, getDailyForecastData } from '@/services/api';
import { NoSsr } from '@mui/base/NoSsr';
import Footer from "@/components/Footer";


export default function Homepage() {
  const [currentCity, setCurrentCity] = useState<any>({
    city: '',
    countryName: '',
    countryCode: '',
    locality: ''
  })
  const [currentWeather, setCurrentWeather] = useState<any>({
    humidity: '',
    temperature: '',
    wind_speed: '',
    weather_code: '',
    time: '',
    apparent_temperature: ''
  });
  const [hourlyWeather, setHourlyWeather] = useState<any>({
    temperature_hourly: [],
    time_hourly: [],
    wind_speed_hourly: [],
    weather_code_hourly: [],
    humidity_hourly: [],
    apparent_temperature_hourly: []
  })

  const [dailyWeather, setDailyWeather] = useState<any>({
    temperature_2m_max: [],
    temperature_2m_min: [],
    wind_speed_10m_max: [],
    weather_code_daily: [],
    precipitation_probability_max: [],
    time_daily: []
  })

  const { latitude, longitude } = Location()

  const getCityName = async () => {
    const response: any = await reverseGeocoding(latitude, longitude)
    if (response) {
      setCurrentCity({
        city: response.data.city,
        countryName: response.data.countryName,
        countryCode: response.data.countryCode,
        locality: response.data.locality
      })
    }
  }

  const getCurrentWeather = async () => {
    const response: any = await getCurrentWeatherData(latitude, longitude)
    if (response) {
      const current = response.data.current
      const currentUnits = response.data.current_units
      setCurrentWeather({
        humidity: current.relative_humidity_2m + currentUnits.relative_humidity_2m,
        temperature: current.temperature_2m + currentUnits.temperature_2m,
        apparent_temperature: current.apparent_temperature + currentUnits.apparent_temperature,
        wind_speed: current.wind_speed_10m + currentUnits.wind_speed_10m,
        weather_code: current.weather_code,
        time: current.time
      })
    }
  }

  const getHourlyForecast = async () => {
    const { data }: any = await getHourlyForecastData(latitude, longitude)
    if (data) {
      const hourly = data.hourly
      setHourlyWeather({
        temperature_hourly: hourly?.temperature_2m,
        time_hourly: hourly?.time,
        wind_speed_hourly: hourly?.wind_speed_10m,
        weather_code_hourly: hourly?.weather_code,
        humidity_hourly: hourly?.relative_humidity_2m,
        apparent_temperature_hourly: hourly?.apparent_temperature
      })
    }
  }

  const getDailyForecast = async () => {
    const { data }: any = await getDailyForecastData(latitude, longitude, 8)
    if (data) {
      const daily = data.daily
      setDailyWeather({
        temperature_2m_max: daily?.temperature_2m_max,
        temperature_2m_min: daily?.temperature_2m_min,
        wind_speed_10m_max: daily?.wind_speed_10m_max,
        precipitation_probability_max: daily?.precipitation_probability_max,
        weather_code_daily: daily?.weather_code,
        time_daily: daily?.time
      })
    }
  }

  useEffect(() => {
    if (latitude && longitude) {
      getCityName()
      getCurrentWeather()
      getHourlyForecast()
      getDailyForecast()
    }
  }, [latitude, longitude])

  return (
    <NoSsr>
      <RootLayout >
        <ButtonAppBar />
        <Container maxWidth="md">
          <Grid container spacing={0}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <WeatherCard data={currentWeather} title={"Current"} cardType={"current"} city={currentCity} />
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <WeatherCard data={hourlyWeather} title={"Hourly"} cardType={"hourly"} city={currentCity} />
            </Grid>
          </Grid>

          <Grid container spacing={0} >
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <WeatherCard data={dailyWeather} title={"Daily"} cardType={"multi-day"} city={currentCity} />
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </RootLayout>
    </NoSsr>
  )
}
