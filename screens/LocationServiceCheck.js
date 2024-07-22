import React, { useEffect, useContext } from 'react';
import { Alert, Platform, Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { LocationContext } from '../components/LocationContext';

const LocationServiceCheck = () => {
  const { setLocation } = useContext(LocationContext);

  useEffect(() => {
    askUserPermission();
  }, []);

  const askUserPermission = () => {
    Alert.alert(
      'Location Access',
      'This app needs access to your location to provide better services. Do you want to enable location services?',
      [
        {
          text: 'No',
          onPress: () => {
            Alert.alert('Location services disabled', 'Some features may not be available.');
          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => checkLocationPermission(),
        },
      ]
    );
  };

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
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Current Location:', position.coords);  // Log the position to console
        setLocation(position.coords);  // Save the location in context
      },
      (error) => {
        Alert.alert('Location services disabled', 'Please enable location services.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return null;  // No UI elements are returned
};

export default LocationServiceCheck;
