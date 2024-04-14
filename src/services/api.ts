import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_API_KEY
const api = axios.create({
  baseURL: `https://api.open-meteo.com/v1/`
})

const reverseGeocoding = async (lat: string, lon: string) => {
  try {
    const response = await api.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );
    return response
  } catch (error) {
    console.error('Error:reverseGeocoding: ', error)
    throw error;
  }
}

const getCurrentWeatherData = async (lat: string, lon: string) => {
  try {
    const currentParams = 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation,is_day'
    const response = await api.get(`forecast?current=${currentParams}&latitude=${lat}&longitude=${lon}`)
    return response
  } catch (error) {
    console.log('Error:getCurrentWeatherData: ', error)
    throw error;
  }
}

const getHourlyForecastData = async (lat: string, lon: string, hourly: number = 7) => {
  try {
    let date: Date = new Date();
    date.setHours(date.getHours() + 1);
    const formattedStartDate: string = date.toISOString().slice(0, 14) + '00';

    date.setHours(date.getHours() + hourly);
    const formattedEndDate: string = date.toISOString().slice(0, 14) + '00';

    const hourlyParams = 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation,is_day'
    const response = await api.get(`forecast?hourly=${hourlyParams}&latitude=${lat}&longitude=${lon}&start_hour=${formattedStartDate}&end_hour=${formattedEndDate}`);
    return response

  } catch (error) {
    console.log('Error: getHourlyForecastData: ', error)
    throw error
  }
}

const getDailyForecastData = async (lat: string, lon: string, days: number) => {
  try {
    const dailyParams = 'temperature_2m_max,temperature_2m_min,wind_speed_10m_max,precipitation_probability_max,weather_code'
    const response = await api.get(`forecast?daily=${dailyParams}&latitude=${lat}&longitude=${lon}&forecast_days=${days}`);
    return response
  } catch (error) {
    console.log('Error: getDailyForecastData: ', error)
    throw error
  }
}

export { reverseGeocoding, getCurrentWeatherData, getHourlyForecastData, getDailyForecastData }