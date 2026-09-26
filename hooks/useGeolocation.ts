import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

export function useGeolocation() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchLocation() {
      try {
        if (Capacitor.isNativePlatform()) {
          // Request permissions first on Native
          const perm = await Geolocation.checkPermissions();
          if (perm.location !== 'granted') {
            const req = await Geolocation.requestPermissions();
            if (req.location !== 'granted') {
              throw new Error('Permission denied');
            }
          }
          const position = await Geolocation.getCurrentPosition();
          if (mounted) {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          }
        } else {
          // Web fallback
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                if (mounted) {
                  setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  });
                }
              },
              (err) => {
                if (mounted) setError(err.message);
              }
            );
          } else {
            if (mounted) setError('Geolocation not supported');
          }
        }
      } catch (err: any) {
        if (mounted) setError(err.message);
      }
    }

    fetchLocation();

    return () => {
      mounted = false;
    };
  }, []);

  return { location, error };
}
