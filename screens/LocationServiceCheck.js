import React, { useEffect, useContext, useState } from 'react';
import { Alert, Platform, Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { LocationContext } from '../components/LocationContext';

const LocationServiceCheck = () => {
  const { setLocation } = useContext(LocationContext);
  const [highAccuracyUsed, setHighAccuracyUsed] = useState(false);

  useEffect(() => {
   checkLocationPermission();
  }, []);


  const checkLocationPermission = async () => {
    const permission = Platform.OS === 'ios' 
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE 
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      checkLocationServices();
    } else {
      requestLocationPermission();
    }
  };

  const requestLocationPermission = async () => {
    const permission = Platform.OS === 'ios' 
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE 
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  
    const result = await request(permission);
  
    console.log('Permission result:', result);  // Log the result for debugging
  
    if (result === RESULTS.GRANTED) {
      checkLocationServices();
    } else {
      Alert.alert(
        'Permission not granted',
        'You need to grant location permissions to use this feature. Please go to settings to enable it.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => openAppSettings() }
        ]
      );
    }
  };
  
  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:').catch(() => {
        Alert.alert('Error', 'Unable to open app settings');
      });
    } else {
      Linking.openSettings().catch(() => {
        Alert.alert('Error', 'Unable to open app settings');
      });
    }
  };
  
  const checkLocationServices = () => {
    const getLocation = (enableHighAccuracy) => {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log('Current Location:', position.coords);  // Log the position to console
          setLocation(position.coords);  // Save the location in context
          if (enableHighAccuracy) {
            setHighAccuracyUsed(true);
          }
        },
        (error) => {
          Alert.alert('Location services disabled', 'Please enable location services.');
        },
        { 
          enableHighAccuracy: enableHighAccuracy, 
          timeout: 20000, 
          maximumAge: 300000, 
          distanceFilter: 50 
        }
      );
    };

    if (!highAccuracyUsed) {
      getLocation(true); // Initial high accuracy request
    } else {
      getLocation(false); // Subsequent low accuracy requests
    }
  };

  return null;  // No UI elements are returned
};

export default LocationServiceCheck;



