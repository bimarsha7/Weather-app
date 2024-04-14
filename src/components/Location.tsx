import { useEffect, useState } from 'react';

type Location = {
  latitude: number;
  longitude: number;
}

export default function Location() {
  const [location, setLocation] = useState<any>({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude: latitude, longitude: longitude });
      })
    }
  })
  return location
}