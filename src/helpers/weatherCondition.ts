import {
  WbSunny as WbSunnyIcon,
  WbCloudy as WbCloudyIcon,
  Thunderstorm as ThunderstormIcon,
  AcUnit as AcUnitIcon,
  Shower as ShowerIcon
} from '@mui/icons-material';

import {
  DrizzleRain as DrizzleRainIcon,
  FreezingRain as FreezingRainIcon,
  Rain as RainIcon
} from '@/helpers/icons';
import { WeatherCodeMapperType, WeatherCodeIconMapperType} from '@/types';


export const weatherCodeMapper: WeatherCodeMapperType = {
  '0': 'Clear Sky',
  '1': 'Mainly Clear',
  '2': 'Partly Cloudy',
  '3': 'Overcast',
  '51': 'Drizzle: Light',
  '53': 'Drizzle: Moderate',
  '55': 'Drizzle: Dense',
  '56': 'Freezing Drizzle: Light',
  '57': 'Freezing Drizzle: Dense',
  '61': 'Rain: Slight',
  '63': 'Rain: Moderate',
  '65': 'Rain: Heavy',
  '66': 'Freezing Rain: Light',
  '67': 'Freezing Rain: Heavy',
  '71': 'Snow Fall: Slight',
  '73': 'Snow Fall: Moderate',
  '75': 'Snow Fall: Heavy',
  '77': 'Snow Grains',
  '80': 'Rain Showers: Slight',
  '81': 'Rain Showers: Moderate',
  '82': 'Rain Showers: Violent',
  '85': 'Snow Showers: Slight',
  '86': 'Snow Showers: Heavy',
  '95': 'Thunderstorm',
  '96': 'Thunderstorm + hail',
  '99': 'Thunderstorm + heavy hail',
}

export const weatherCodeIconMapper: WeatherCodeIconMapperType = {
  '0': WbSunnyIcon,
  '1': WbSunnyIcon,
  '2': WbCloudyIcon,
  '3': WbCloudyIcon,
  '51': DrizzleRainIcon,
  '53': DrizzleRainIcon,
  '55': DrizzleRainIcon,
  '56': FreezingRainIcon,
  '57': FreezingRainIcon,
  '61': RainIcon,
  '63': RainIcon,
  '65': RainIcon,
  '66': FreezingRainIcon,
  '67': FreezingRainIcon,
  '71': AcUnitIcon,
  '73': AcUnitIcon,
  '75': AcUnitIcon,
  '77': AcUnitIcon,
  '80': ShowerIcon,
  '81': ShowerIcon,
  '82': ShowerIcon,
  '85': AcUnitIcon,
  '86': AcUnitIcon,
  '95': ThunderstormIcon,
  '96': ThunderstormIcon,
  '99': ThunderstormIcon,
}
