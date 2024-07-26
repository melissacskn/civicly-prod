import React, { useEffect,useState,useRef } from 'react';
import { StyleSheet, View, PermissionsAndroid, Platform, BackHandler } from 'react-native';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('sk.eyJ1IjoiY2l2aWNseSIsImEiOiJjbHk4a3NjcmcwZGxzMmpzYnA5dGw4OWV1In0.oCECiSHLJO6qnEzyBmQoNw');
import { useNavigation, useRoute} from '@react-navigation/native';



/////////////////////Working Part//////////////////////////


// const MapMap = () => {
//   const [zoomLevel, setZoomLevel] = useState(14);
//   const [userLocation, setUserLocation] = useState(null);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { locationData } = route.params;
//   const cameraRef = useRef(null);
//   const isNavigatingBack = useRef(false); // To prevent multiple navigations

//   useEffect(() => {
//     const requestLocationPermission = async () => {
//       if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app needs access to your location.',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           }
//         );
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('Location permission denied');
//         }
//       }
//     };

//     requestLocationPermission();
//   }, []);

//   useEffect(() => {
//     if (cameraRef.current) {
//       if (locationData) {
//         cameraRef.current.setCamera({
//           centerCoordinate: [locationData.longitude, locationData.latitude],
//           zoomLevel: 14,
//           animationDuration: 1000,
//         });
//         setSelectedLocation({ latitude: locationData.latitude, longitude: locationData.longitude });
//       } else if (userLocation) {
//         cameraRef.current.setCamera({
//           centerCoordinate: [userLocation.coords.longitude, userLocation.coords.latitude],
//           zoomLevel: 14,
//           animationDuration: 1000,
//         });
//         setSelectedLocation({ latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude });
//       }
//     }
//   }, [locationData, userLocation]);

//   const handleMapPress = (e) => {
//     const { geometry } = e;
//     const [longitude, latitude] = geometry.coordinates;
//     setSelectedLocation({ latitude, longitude });
//   };


//   useEffect(() => {
//     const beforeRemoveListener = (e) => {
//       e.preventDefault();
//       if (!isNavigatingBack.current) {
//         isNavigatingBack.current = true;
//         navigation.dispatch(e.data.action); // Complete the back action
//         setTimeout(() => {
//           navigation.navigate('CreateAsset2', { selectedLocation });
//         }, 0);
//       }
//     };

//     const unsubscribe = navigation.addListener('beforeRemove', beforeRemoveListener);

//     return () => {
//       unsubscribe();
//     };
//   }, [selectedLocation, navigation]);

//   useEffect(() => {
//     const backAction = () => {
//       if (!isNavigatingBack.current) {
//         isNavigatingBack.current = true;
//         setTimeout(() => {
//           navigation.navigate('CreateAsset2', { selectedLocation });
//         }, 0);
//         return true;
//       }
//       return false;
//     };

//     const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

//     return () => {
//       backHandler.remove();
//     };
//   }, [selectedLocation, navigation]);



  
//   return (
//     <View style={styles.page}>
//       <Mapbox.MapView style={styles.map} onPress={handleMapPress}>
//         <Mapbox.Camera ref={cameraRef} zoomLevel={zoomLevel} animationMode={'flyTo'} animationDuration={1000} />
//         <Mapbox.UserLocation
//           visible={true}
//           onUpdate={(location) => setUserLocation(location)}
        
//         />
//         {selectedLocation && (
//           <Mapbox.PointAnnotation
//             id="selected-location"
//             coordinate={[selectedLocation.longitude, selectedLocation.latitude]}
//           />
//         )}
//       </Mapbox.MapView>
    
//     </View>
//   );
// };

// export default MapMap;

// const styles = StyleSheet.create({
//   page: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },

// });
// MapMap.js









const MapMap = () => {
  const [zoomLevel, setZoomLevel] = useState(14);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { locationData, sourcePage } = route.params;
  const cameraRef = useRef(null);
  const isNavigatingBack = useRef(false);
  

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission denied');
        }
      }
    };

    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (cameraRef.current) {
      if (locationData) {
        cameraRef.current.setCamera({
          centerCoordinate: [locationData.longitude, locationData.latitude],
          zoomLevel: 14,
          animationDuration: 1000,
        });
        setSelectedLocation({ latitude: locationData.latitude, longitude: locationData.longitude });
      } else if (userLocation) {
        cameraRef.current.setCamera({
          centerCoordinate: [userLocation.coords.longitude, userLocation.coords.latitude],
          zoomLevel: 14,
          animationDuration: 1000,
        });
        setSelectedLocation({ latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude });
      }
    }
  }, [locationData, userLocation]);

  const handleMapPress = (e) => {
    const { geometry } = e;
    const [longitude, latitude] = geometry.coordinates;
    setSelectedLocation({ latitude, longitude });
  };

  useEffect(() => {
    const beforeRemoveListener = (e) => {
      e.preventDefault();
      if (!isNavigatingBack.current) {
        isNavigatingBack.current = true;
        navigation.dispatch(e.data.action); // Complete the back action
        setTimeout(() => {
          navigation.navigate({
            name: sourcePage, // Specify the name of the screen to navigate to
            params: { selectedLocation },
          });
        }, 0);
      }
    };

    const unsubscribe = navigation.addListener('beforeRemove', beforeRemoveListener);

    return () => {
      unsubscribe();
    };
  }, [selectedLocation, navigation, sourcePage]);

  useEffect(() => {
    const backAction = () => {
      if (!isNavigatingBack.current) {
        isNavigatingBack.current = true;
        setTimeout(() => {
          navigation.navigate({
            name: sourcePage, // Specify the name of the screen to navigate to
            params: { selectedLocation },
          });
        }, 0);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      backHandler.remove();
    };
  }, [selectedLocation, navigation, sourcePage]);

  return (
    <View style={styles.page}>
      <Mapbox.MapView style={styles.map} onPress={handleMapPress}>
        <Mapbox.Camera ref={cameraRef} zoomLevel={zoomLevel} animationMode={'flyTo'} animationDuration={1000} />
        <Mapbox.UserLocation
          visible={true}
          onUpdate={(location) => setUserLocation(location)}
        />
        {selectedLocation && (
          <Mapbox.PointAnnotation
            id="selected-location"
            coordinate={[selectedLocation.longitude, selectedLocation.latitude]}
          />
        )}
      </Mapbox.MapView>
    </View>
  );
};

export default MapMap;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
