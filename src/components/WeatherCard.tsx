import { Grid, Typography, Box } from '@mui/material';
import { weatherCodeIconMapper, weatherCodeMapper } from '@/helpers/weatherCondition';
import { WeatherCardProps } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const WeatherCard = ({ data, title, cardType, city }: WeatherCardProps) => {
  const formatCurrentTime = () => {
    const dateTime = new Date()
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    return dateTime.toLocaleTimeString([], options)
  }

  const formatHourly = (date: string) => {
    const dateTime = new Date(date)
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    return dateTime.toLocaleTimeString([], options)
  }

  const formatDay = (date: string) => {
    const dateTime = new Date(date)
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', weekday: 'short' };
    return dateTime.toLocaleDateString('en-UK', options)
  }

  const weather = weatherCodeMapper?.[data?.weather_code]
  const Icon = weatherCodeIconMapper?.[data?.weather_code]

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 2,
        borderRadius: 5,
        p: 2,
        textAlign: 'left',
        my: 1
      }}
    >
      <Box sx={{ color: 'text.secondary', mb: 0.5 }}>
        <Typography variant="h5" sx={{ minHeight: "35px" }}>
          {title}
        </Typography>
        {
          cardType === 'current' && (
            <Typography component="p" sx={{ minHeight: "14px" }}>
              {formatCurrentTime()} at {city.city}, {city.countryName} ({city.countryCode})
            </Typography>
          )
        }
      </Box>
      {/* Current Weather */}
      {cardType === 'current' && (
        <>
          <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium', mb: 0.5 }}>
            <Typography variant='h4'>
              {weather && <Icon />} {data.temperature}
            </Typography>
            <Typography sx={{ fontSize: 16, lineHeight: 2, color: 'info.main', fontWeight: 'medium' }}>
              {weather ? weather : null}
            </Typography>
          </Box>

          <Grid container spacing={7}>
            <Grid item xs={4} lg={3}>
              Wind
            </Grid>
            <Grid item xs={4} lg={3}>
              Humidity
            </Grid>
            <Grid item xs={4} lg={5} >
              Feels Like
            </Grid>
          </Grid>

          <Grid container spacing={7}>
            <Grid item xs={4} lg={3} sx={{ color: 'success.main' }}>
              {data.wind_speed}
            </Grid>
            <Grid item xs={4} lg={3} sx={{ color: 'secondary.main' }}>
              {data.humidity}
            </Grid>
            <Grid item xs={4} lg={5} sx={{ color: 'warning.main' }}>
              {data.apparent_temperature}
            </Grid>
          </Grid>
        </>
      )}
      {/* Hourly Forecast */}
      {cardType === "hourly" && (
        <Grid container>
            {data?.temperature_hourly?.map((each_hour_temp: string, index: number) => {
              let uniqueId = uuidv4();
              return (
                <Box sx={{
                color: 'text.secondary', mb: 1, display: 'inline', minWidth: "140px", minHeight: "140px",
                boxShadow: 2, borderRadius: 3, mx: 0.5, p: 0.5, textAlign: 'center'
              }} key={uniqueId}>
                <Typography variant="h5" sx={{ minHeight: "20px", fontSize: 16, mb: 1.5 }}>
                  {formatHourly(data.time_hourly[index])}
                </Typography>
                <Typography sx={{ minHeight: "20px", fontSize: 24, fontWeight: 'medium', mb: -0.4 }}>
                  {each_hour_temp}°C
                </Typography>
                <Typography sx={{ fontSize: 12, lineHeight: 2, color: 'info.main', fontWeight: 'medium', mb: 2 }}>
                  {weatherCodeMapper?.[data?.weather_code_hourly?.[index]]}
                </Typography>
                <Grid sx={{ fontSize: '14px', color: 'success.main' }}>
                  Wind: {data.wind_speed_hourly?.[index]}km/h
                </Grid>
                <Grid sx={{ fontSize: '14px', color: 'secondary.main' }}>
                  Humidity: {data.humidity_hourly?.[index]}%
                </Grid>
                <Grid sx={{ fontSize: '14px', color: 'warning.main', mb: 1 }}>
                  Feels Like: {data.apparent_temperature_hourly?.[index]}°C
                </Grid>
              </Box>)
            })}
          </Grid>
      )}
      {/* Multi-Day Forecast */}
      {cardType === "multi-day" && (
          <Grid container>
            {data?.temperature_2m_max && data?.temperature_2m_max.map((each_hour_temp: string, index: number) => {
              let uniqueId = uuidv4();
              return (
                <Box sx={{
                  color: 'text.secondary', mb: 2, display: 'inline', minWidth: "140px", minHeight: "140px",
                  boxShadow: 2, borderRadius: 2, mx: 0.5, p: 0.5, textAlign: 'center'
                }} key={uniqueId}>
                  <Typography variant="h5" sx={{ minHeight: "20px", fontSize: 16, mb: 2 }}>
                    {formatDay(data?.time_daily[index])}
                  </Typography>
                  <Typography sx={{ minHeight: "20px", fontSize: 18, fontWeight: 'medium', mb: 0.5 }}>
                    {data?.temperature_2m_min[index]}°C - {each_hour_temp}°C
                  </Typography>
  
                  <Typography sx={{ fontSize: 12, lineHeight: 2, color: 'info.main', fontWeight: 'medium' }}>
                    {weatherCodeMapper?.[data?.weather_code_daily?.[index]]}
                  </Typography>
  
                  <Grid sx={{ fontSize: '14px', color: 'success.main', fontWeight: 'medium' }}>Wind: {data?.wind_speed_10m_max?.[index]}km/h</Grid>
                  <Grid sx={{ fontSize: '14px', color: 'secondary.main', fontWeight: 'medium' }}>Precipitation: {data?.precipitation_probability_max?.[index]}%</Grid>
                </Box>
              )
              })}
          </Grid>
      )}
    </Box>
  )
}

export default WeatherCard;
