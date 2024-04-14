
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';

export type CityType = {
  city: string;
  countryName: string;
  countryCode: string;
  locality: string;
}
export type WeatherData = {
  city: string;
  humidity: string;
  temperature: string;
  wind_speed: string;
  weather_code: string;
  time_hourly: string[];
  apparent_temperature: string;
  temperature_hourly: string[];
  wind_speed_hourly: string[];
  weather_code_hourly: string[];
  humidity_hourly: string[];
  apparent_temperature_hourly: string[];
  temperature_2m_max: string[];
  temperature_2m_min: string[];
  wind_speed_10m_max: string[];
  time_daily: string[];
  weather_code_daily: string[];
  precipitation_probability_max: string[];
}

export type WeatherCardProps = {
  data: WeatherData;
  title: string;
  cardType: string;
  city: CityType;
}

export type WeatherCodeMapperType = {
  [key: string]: string;
};

export type WeatherCodeIconMapperType = {
  [key: string]: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
};
