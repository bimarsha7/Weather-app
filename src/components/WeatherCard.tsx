import { Grid, Typography, Box, Tooltip } from '@mui/material';
import { weatherCodeIconMapper, weatherCodeMapper } from '@/helpers/weatherCondition';
import { WeatherCardProps } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ThermostatIcon from '@mui/icons-material/Thermostat';


const WeatherCard = ({ data, title, cardType, city }: WeatherCardProps) => {
  const formatCurrentTime = () => {
    const dateTime = new Date()
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    return dateTime.toLocaleTimeString([], options)
  }

  const formatHourly = (date: string) => {
    let date_temp = date+':00.000Z'
    const dateTime = new Date(date_temp)
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
        boxShadow: 1,
        borderRadius: 5,
        p: 3,
        textAlign: 'left',
        my: 1,
        background: 'linear-gradient(to right bottom, #3D85C6, #cfe2f3, #9fc5e8, #9ec2e2, #d8e6f3, #0b5394)'
      }}
    >
      <Box sx={{ color: 'text.secondary', mb: 0.4 }}>
        <Grid container>
          <Grid item lg={6}>
            <Typography variant="h5" sx={{ minHeight: "16px", display: 'inline', fontWeight:'500' }}>
              {title}
            </Typography>
            {
              cardType === 'current' && (
              <Typography sx={{ minHeight: "16px", display: 'inline', px: 1 }}>
                {formatCurrentTime()}
              </Typography>
              )
            }
            
          </Grid>
          { 
            cardType === 'current' && (
              <Grid item lg={6}>
                <Typography sx={{ minHeight: "14px", textAlign:"end", alignItems:'center' }}>
                <Grid container sx={{ justifyContent: 'end', alignItems: 'center' }}>
                    <LocationOnIcon sx={{ fontSize: '18px', color: '#960A0A' }} />  {city.city}, {city.countryName}
                  </Grid>
                </Typography>
              </Grid>
            )
          }
        </Grid>
      </Box>
      {/* Current Weather */}
      {cardType === 'current' && (
        <Grid container>
          <Grid item lg={6} xl={6} >
            <Grid container padding={5}>
              <Grid item lg={6}>
                <Typography sx={{textAlign:'center'}} color={"primary"}>
                  {weather && <Icon sx={{ fontSize: 90 }} />}
                </Typography>
              </Grid>
              <Grid item lg={6}>
                <Typography variant='h4' sx={{fontSize: 60}}>
                  {data.temperature}
                </Typography>
              </Grid>
              <Grid item lg={6}>
              <Typography sx={{textAlign:'center'}} color={"primary"}>
                  {weather}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={6} xl={6}>
            <Grid container padding={5} sx={{justifyContent: 'center'}}>
              <Grid item lg={6} sx={{ alignItems:'start'}}>
                <Grid item lg={12}>
                  <Typography sx={{ textAlign: 'start', alignContent: 'center', alignItems: 'center', color: 'success.main',  cursor:'pointer' }}>
                    <Tooltip title="Wind Speed" placement="top">
                      <AirIcon sx={{ fontSize: 20 }} /> {data.wind_speed}
                    </Tooltip>
                  </Typography>
                </Grid>
                <Grid item lg={12}>
                  <Typography sx={{ textAlign: 'start', color: 'secondary.main', cursor:'pointer' }}>
                    <Tooltip title="Humidity" placement="top">
                      <WaterDropIcon sx={{ fontSize: 20 }}/>  {data.humidity}
                    </Tooltip>
                  </Typography>
                </Grid>
                <Grid item lg={12}>
                  <Typography sx={{ textAlign: 'start', color: '#00bcd4', cursor:'pointer' }}>
                    <Tooltip title="Feels Like" placement="top">
                      <ThermostatIcon sx={{ fontSize: 20 }}/>  {data.temperature}
                      </Tooltip>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      {/* Hourly Forecast */}
      {cardType === "hourly" && (
        <Grid container >
            {data?.temperature_hourly?.map((each_hour_temp: string, index: number) => {
              let uniqueId = uuidv4();
              return (
                <Box sx={{
                color: 'text.secondary', mb: 1, display: 'inline', minWidth: "85px",
                boxShadow: 2, borderRadius: 3, mx: 0.5, p: 0.4, textAlign: 'center'
              }} key={uniqueId}>
                <Typography variant="h5" sx={{ minHeight: "20px", fontSize: 16, mb: 1.5 }}>
                  {formatHourly(data.time_hourly[index])}
                </Typography>
                <Typography sx={{ minHeight: "20px", fontSize: 20, fontWeight: 'medium', mb: -0.4 }}>
                  {each_hour_temp}°C
                </Typography>
                <Typography sx={{ fontSize: 12, lineHeight: 2, color: 'info.main', fontWeight: 'medium', mb: 2 }}>
                  {weatherCodeMapper?.[data?.weather_code_hourly?.[index]]}
                </Typography>
                <Grid sx={{ fontSize: '14px', color: 'success.main',cursor:'pointer' }}>
                <AirIcon sx={{ fontSize: 14 }} /> {data.wind_speed_hourly?.[index]}km/h
                </Grid>
                <Grid sx={{ fontSize: '14px', color: 'secondary.main', cursor:'pointer' }}>
                <WaterDropIcon sx={{ fontSize: 14 }}/> {data.humidity_hourly?.[index]}%
                </Grid>
                <Grid sx={{ fontSize: '14px', color: '#00bcd4', mb: 1, cursor:'pointer' }}>
                <ThermostatIcon sx={{ fontSize: 14 }}/>  {data.apparent_temperature_hourly?.[index]}°C
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
                  color: 'text.secondary', mb: 2, display: 'inline', minWidth: "85px",
                  boxShadow: 2, borderRadius: 2, mx: 0.5, p: 0.4, textAlign: 'center'
                }} key={uniqueId}>
                  <Typography variant="h5" sx={{ minHeight: "20px", fontSize: 16, mb: 2 }}>
                    {formatDay(data?.time_daily[index])}
                  </Typography>
                  <Typography sx={{ minHeight: "20px", fontSize: 16, fontWeight: 'medium', mb: 0.5 }}>
                    {data?.temperature_2m_min[index]}°C
                    
                  </Typography>
                  <Typography sx={{ minHeight: "20px", fontSize: 16, fontWeight: 'medium', mb: 0.5 }}>
                    {each_hour_temp}°C
                  </Typography>
  
                  <Typography sx={{ fontSize: 12, lineHeight: 2, color: 'info.main', fontWeight: 'medium' }}>
                    {weatherCodeMapper?.[data?.weather_code_daily?.[index]]}
                  </Typography>
  
                  <Grid sx={{ fontSize: '14px', color: 'success.main', fontWeight: 'medium', cursor:'pointer' }}><AirIcon sx={{ fontSize: 14 }} /> {data?.wind_speed_10m_max?.[index]}km/h</Grid>
                  <Grid sx={{ fontSize: '14px', color: 'secondary.main', fontWeight: 'medium', cursor:'pointer' }}><WaterDropIcon sx={{ fontSize: 14 }}/>  {data?.precipitation_probability_max?.[index]}%</Grid>
                </Box>
              )
              })}
          </Grid>
      )}
    </Box>
  )
}

export default WeatherCard;
