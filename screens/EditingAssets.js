
// ////////part4//////////

// import React, { useState, useEffect, useMemo,useCallback } from 'react';
// import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Dimensions, StatusBar, Alert, PermissionsAndroid, Linking } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import AntDesign from "react-native-vector-icons/AntDesign";
// import Mapbox from '@rnmapbox/maps';
// import Modal from 'react-native-modal';
// import { RadioButton } from 'react-native-paper';
// import ImagePicker from 'react-native-image-crop-picker';
// import axios from 'axios';
// import { fetchAuthSession } from 'aws-amplify/auth';
// Mapbox.setAccessToken('sk.eyJ1IjoiY2l2aWNseSIsImEiOiJjbHk4a3NjcmcwZGxzMmpzYnA5dGw4OWV1In0.oCECiSHLJO6qnEzyBmQoNw');

// const EditingAssets = ({ route }) => {
//   const {tenantId } = route.params;
//   const { asset } = route.params;
//   const [imageUri, setImageUri] = useState(asset?.asset_uploads?.[0]?.file || null);
//   const [name, setName] = useState(asset?.name || '');
//   // const [selectedAsset, setSelectedAsset] = useState( asset?.asset_type_name ? { name: asset.asset_type_name } : null); // Ensure this matches your asset structure
//   const [selectedAsset, setSelectedAsset] = useState(asset?.asset_type_name ? { name: asset.asset_type_name, id: asset.asset_type_id } : null);
//   const [checkedStatus, setCheckedStatus] = useState(asset?.status || 'ACTIVE');
//   const [checkedCondition, setCheckedCondition] = useState(asset?.condition || '');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [returnedLocation, setReturnedLocation] = useState({
//     latitude: asset?.latitude || null,
//     longitude: asset?.longitude || null
//   });
//   const [address, setAddress] = useState('');
//   const [fileName, setFileName] = useState('');
//   const [fileType, setFileType] = useState('');
 

//   const navigation = useNavigation();

//   const initialData = useMemo(() => ({
//     assetId: asset?.id || null,
//     imageUri: asset?.asset_uploads?.[0]?.file || null,
//     name: asset?.name || '',
//     // selectedAsset: asset?.asset_type_name ? { name: asset.asset_type_name } : null,  // Updated line
//     selectedAsset: asset?.asset_type_name ? { name: asset.asset_type_name, id: asset.asset_type_id } : null,
//     checkedStatus: asset?.status || 'ACTIVE',
//     checkedCondition: asset?.condition || '',
//     location: {
//       latitude: asset?.latitude || null,
//       longitude: asset?.longitude || null
//     },
//   }), [asset]);
//   // Ensure tenantId and asset.id are defined
//   if (!tenantId || !asset?.id) {
//     console.error('Missing tenantId or asset.id');
//     return null;
//   }


//   const isSaveDisabled = useMemo(() => {
//     return (
//       initialData.imageUri === imageUri &&
//       initialData.name === name &&
//       initialData.selectedAsset?.name === selectedAsset?.name &&  // Updated line
//       initialData.checkedStatus === checkedStatus &&
//       initialData.checkedCondition === checkedCondition &&
//       initialData.location.latitude === returnedLocation.latitude &&
//       initialData.location.longitude === returnedLocation.longitude
//     );
//   }, [initialData, imageUri, name, selectedAsset, checkedStatus, checkedCondition, returnedLocation]);

//   useEffect(() => {
//     if (route.params?.selectedAsset) {
//       setSelectedAsset(route.params.selectedAsset);
//     }
//   }, [route.params?.selectedAsset]);

//   useEffect(() => {
//     if (route.params?.selectedLocation) {
//       setReturnedLocation(route.params.selectedLocation);
//     }
//   }, [route.params?.selectedLocation]);

//   useEffect(() => {
//     const fetchAddress = async () => {
//       if (!returnedLocation.latitude || !returnedLocation.longitude) return;

//       const { latitude, longitude } = returnedLocation;
//       try {
//         const response = await axios.get(
//           `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=sk.eyJ1IjoiY2l2aWNseSIsImEiOiJjbHk4a3NjcmcwZGxzMmpzYnA5dGw4OWV1In0.oCECiSHLJO6qnEzyBmQoNw`
//         );
//         const placeName = response.data.features[0].place_name;
//         setAddress(placeName);
//       } catch (error) {
//         console.error('Error fetching address:', error);
//         setAddress('Unable to fetch address');
//       }
//     };

//     fetchAddress();
//   }, [returnedLocation]);

//   const selectImage = async () => {
//     const permissionsGranted = await requestPermissions();
//     if (permissionsGranted) {
//       setModalVisible(true);
//     }
//   };

//   // const handleSave = async () => {
//   //   const session = await fetchAuthSession({ forceRefresh: true });
//   //   const accessToken = session.tokens.accessToken.toString();
//   //   const myHeaders = new Headers();
//   //   myHeaders.append("Authorization", `Bearer ${accessToken}`);

    
//   //   const formdata = new FormData();
//   //   formdata.append("location", `{\"latitude\": ${returnedLocation.latitude}, \"longitude\":${returnedLocation.longitude}, \"comment\":\"Local Test\"}`);
//   //   formdata.append("condition", checkedCondition);
//   //   formdata.append("name", name);
    
//   //   const requestOptions = {
//   //     method: "PATCH",
//   //     headers: myHeaders,
//   //     body: formdata,
//   //     redirect: "follow"
//   //   };
    
//   //   fetch(`https://api.dev.nonprod.civic.ly/assets/${tenantId}/asset/${initialData.assetId}`, requestOptions)
//   //     .then((response) => response.text())
//   //     .then((result) => console.log(result))
//   //     .catch((error) => console.error(error));
//   //     Alert.alert('Success', 'Asset updated successfully');
//   //     navigation.navigate("AssetsPage", { tenantId: tenantId });
//   // };

 
//   const handleSave = useCallback(async () => {
//     console.log('tenantId:', tenantId);
//     console.log('assetId:', initialData.assetId);
  
//     try {
//       const session = await fetchAuthSession({ forceRefresh: true });
//       const accessToken = session.tokens.accessToken.toString();
  
//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${accessToken}`);
  
//       const formdata = new FormData();
//       // formdata.append("condition", checkedCondition);
//       // formdata.append("name", name);
//       // formdata.append("status", checkedStatus);
//       // formdata.append("location", `{\"latitude\": ${returnedLocation.latitude}, \"longitude\": ${returnedLocation.longitude}, \"comment\":\"Local Test\"}`);
//       // formdata.append("location", "{\"latitude\": 52.67566641051710, \"longitude\": 1.2828212154745986, \"comment\":\"Local Test\"}");

//       // formdata.append("condition", checkedCondition);
//       // formdata.append("name", name);
//       formdata.append("condition", checkedCondition);
// formdata.append("location", "{\"latitude\": 52.67566641051710, \"longitude\": 1.2828212154745986, \"comment\":\"Local Test\"}");
// formdata.append("name", name);
// formdata.append("status", checkedStatus);
//     // Append asset type ID, either the initial one or the updated one
//     const assetTypeId = selectedAsset?.id || initialData.selectedAsset.id;
//     formdata.append("asset_type_id", assetTypeId);
// // formdata.append("asset_type_id", "6680e867-45e6-483d-b649-f8ef13407526");

  
//       const url = `https://api.dev.nonprod.civic.ly/assets/${tenantId}/asset/${initialData.assetId}`;
//       console.log('PATCH URL:', url);
//       console.log('FormData:', formdata);
  
//       const requestOptions = {
//         method: "PATCH",
//         headers: myHeaders,
//         body: formdata,
//         redirect: "follow"
//       };
  
//       const response = await fetch(url, requestOptions);
  
//       console.log('Response status:', response.status);
//       console.log('Response headers:', response.headers);
  
//       // Check if response is successful
//       if (!response.ok) {
//         const text = await response.text();
//         console.error('Non-200 response:', text);
//         throw new Error(`Request failed with status ${response.status}`);
//       }
  
//       // Check if response is JSON
//       const contentType = response.headers.get("content-type");
//       if (!contentType || !contentType.includes("application/json")) {
//         const text = await response.text();
//         console.error('Non-JSON response:', text);
//         throw new Error('Received non-JSON response');
//       }
  
//       const result = await response.json();
//       console.log('API Response:', result);
  
//       Alert.alert('Success', 'Asset updated successfully');
//       navigation.navigate("AssetsPage", { tenantId });
//     } catch (error) {
//       Alert.alert('Error', 'Failed to update asset');
//       console.error('API Error:', error);
//     }
//   }, [checkedCondition, name, checkedStatus, tenantId, initialData.assetId, navigation]);
  
  
//   const handleCancel = () => {
//     navigation.navigate("AssetsPage", { tenantId: tenantId });
//     console.log('Edit cancelled');
//   };

//   const requestPermissions = async () => {
//     try {
//       const storageGranted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         {
//           title: 'Storage Permission',
//           message: 'This app needs access to your storage to display images.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       if (storageGranted !== PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('Storage permission denied');
//         return false;
//       }

//       const cameraGranted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//       );
//       if (cameraGranted !== PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('Camera permission denied');
//         showPermissionAlert('Camera');
//         return false;
//       }

//       return true;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   };

//   const showPermissionAlert = (permissionType) => {
//     Alert.alert(
//       `${permissionType} Permission`,
//       `This app needs access to your ${permissionType.toLowerCase()} to function properly. Please go to settings and enable ${permissionType.toLowerCase()} permissions.`,
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Go to Settings',
//           onPress: () => Linking.openSettings(),
//         },
//       ],
//       { cancelable: false }
//     );
//   };

//   const pickAndCropImage = () => {
//     ImagePicker.openPicker({
//       mediaType: 'photo',
//       includeExif: true,
//     }).then(image => {
//       setImageUri(image.path);
//       setFileName(image.path.split('/').pop());
//       setFileType(image.path.split('.').pop());
//       setModalVisible(false);
//     }).catch(error => {
//       if (error.message !== 'User cancelled image selection') {
//         console.error('Error picking and cropping image:', error);
//       }
//     });
//   };

//   const pickAndCropImageCamera = () => {
//     ImagePicker.openCamera({
//       mediaType: 'photo',
//       includeExif: true,
//     }).then(image => {
//       setImageUri(image.path);
//       setFileName(image.path.split('/').pop());
//       setFileType(image.path.split('.').pop());
//       setModalVisible(false);
//     }).catch(error => {
//       if (error.message !== 'User cancelled image selection') {
//         console.error('Error capturing image:', error);
//       }
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="white" barStyle={"dark-content"} />
//       <TouchableOpacity onPress={selectImage} style={styles.imagePicker}>
//         {imageUri ? (
//           <Image source={{ uri: imageUri }} style={styles.image} />
//         ) : (
//           <View style={styles.placeholder}>
//             <Text>Upload Photo</Text>
//           </View>
//         )}
//       </TouchableOpacity>

//       <View style={styles.container2}>
//         <Text style={styles.label2}>Asset Type*</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('AssetTypeSearch', { previousSelected: selectedAsset, sourcePage: 'EditingAssets' })} style={styles.assetContainer}>
//           <View style={styles.nameField2}>
//             <Text style={styles.input2}>
//               {selectedAsset ? selectedAsset.name : 'Asset Type'}
//             </Text>
//             <AntDesign name="right" size={20} color="black" />
//           </View>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.nameField}>
//         <Text style={styles.label}>Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Name"
//           value={name}
//           onChangeText={setName}
//           placeholderTextColor="#999"
//         />
//       </View>

//       <View style={styles.container2}>
//         <Text style={styles.label2}>Add Location*</Text>
//         <TouchableOpacity style={styles.assetContainer} onPress={() => navigation.navigate('MapMap', { locationData: returnedLocation, sourcePage: 'EditingAssets' })}>
//           <View style={styles.nameField2}>
//             <Text style={styles.input2}>
//               {address ? address : 'Location'}
//             </Text>
//             <AntDesign name="right" size={20} color="black" />
//           </View>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.statu}>
//         <Text>Status*</Text>
//         <View style={styles.radioButo}>
//           {['ACTIVE', 'INACTIVE', 'DRAFT'].map(status => (
//             <View key={status} style={styles.radioContainer}>
//               <RadioButton
//                 value={status}
//                 status={checkedStatus === status ? 'checked' : 'unchecked'}
//                 onPress={() => setCheckedStatus(status)}
//                 color={checkedStatus === status ? 'rgb(0, 168, 84)' : undefined}
//               />
//               <Text style={styles.label}>{status}</Text>
//             </View>
//           ))}
//         </View>
//       </View>

//       <View style={styles.statu}>
//         <Text>Condition*</Text>
//         <View style={styles.radioButo}>
//           {['NEW', 'FAIR', 'GOOD', 'POOR'].map(condition => (
//             <View key={condition} style={styles.radioContainer}>
//               <RadioButton
//                 value={condition}
//                 status={checkedCondition === condition ? 'checked' : 'unchecked'}
//                 onPress={() => setCheckedCondition(condition)}
//                 color={checkedCondition === condition ? 'rgb(0, 168, 84)' : undefined}
//               />
//               <Text style={styles.label}>{condition}</Text>
//             </View>
//           ))}
//         </View>
//       </View>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[styles.saveButton, isSaveDisabled ? styles.saveButtonDisabled : styles.saveButtonEnabled]}
//           onPress={handleSave}
//           disabled={isSaveDisabled}
//         >
//           <Text style={styles.saveButtonText}>Save</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.cancelButton}
//           onPress={handleCancel}
//         >
//           <Text style={styles.cancelButtonText}>Cancel</Text>
//         </TouchableOpacity>
//       </View>

//       <Modal
//         isVisible={modalVisible}
//         onBackdropPress={() => setModalVisible(false)}
//         onBackButtonPress={() => setModalVisible(false)}
//         style={styles.modal}
//       >
//         <View style={styles.modalContent}>
//           <Text style={styles.modalText}>Upload Photo</Text>
//           <TouchableOpacity style={styles.button} onPress={pickAndCropImageCamera}>
//             <AntDesign name="camera" size={20} color="#000" style={styles.buttonIcon} />
//             <Text style={styles.buttonText}>Take Photo</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={pickAndCropImage}>
//             <AntDesign name="picture" size={20} color="#000" style={styles.buttonIcon} />
//             <Text style={styles.buttonText}>Choose from Library</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
//             <AntDesign name="close" size={20} color="#000" style={styles.buttonIcon} />
//             <Text style={styles.buttonText}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 80,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },
//   imagePicker: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 150,
//     width: 150,
//     borderRadius: 75,
//     backgroundColor: '#e0e0e0',
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   image: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//   },
//   placeholder: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     height: 40,
//     width: '100%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     color: '#333',
//   },
//   nameField: {
//     width: Dimensions.get('window').width - 40,
//     paddingHorizontal: 20,
//     marginVertical: 5,
//     marginBottom: -10,
//     alignItems: 'flex-start',
//   },
//   label: {
//     marginBottom: 5,
//   },
//   statu: {
//     width: Dimensions.get('window').width - 40,
//     paddingHorizontal: 20,
//     alignItems: 'flex-start',
//     marginVertical: 10,
//   },
//   radioButo: {
//     flexDirection: 'row',
//   },
//   radioContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   container2: {
//     width: Dimensions.get('window').width - 40,
//     paddingHorizontal: 20,
//     marginVertical: 7,
//     alignItems: 'flex-start',
//   },
//   assetContainer: {
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 4,
//     borderColor: 'gray',
//     width: 310,
//   },
//   nameField2: {
//     marginBottom: 5,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   label2: {
//     marginBottom: 8,
//   },
//   input2: {},
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 10,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     borderRadius: 4,
//     marginBottom: 16,
//   },
//   buttonIcon: {
//     marginRight: 10,
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 16,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   saveButton: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 4,
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   saveButtonEnabled: {
//     backgroundColor: 'rgb(0, 168, 84)',
//   },
//   saveButtonDisabled: {
//     backgroundColor: '#ccc',
//   },
//   saveButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   cancelButton: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 4,
//     alignItems: 'center',
//     backgroundColor: '#f44336',
//   },
//   cancelButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default EditingAssets;

import React, { useState, useEffect, useMemo, useCallback,useContext } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Dimensions, StatusBar, Alert, PermissionsAndroid, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from "react-native-vector-icons/AntDesign";
import Mapbox from '@rnmapbox/maps';
import Modal from 'react-native-modal';
import { RadioButton } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';
import { handleAssetFileUpload } from '../components/AssetUploads';
Mapbox.setAccessToken('sk.eyJ1IjoiY2l2aWNseSIsImEiOiJjbHk4a3NjcmcwZGxzMmpzYnA5dGw4OWV1In0.oCECiSHLJO6qnEzyBmQoNw');
import { LocationContext } from '../components/LocationContext';
const EditingAssets = ({ route }) => {
  const navigation = useNavigation();
  const { tenantId} = route.params || {};
  const{asset} = route.params || {};
  const[tenantId2, setTenantId] = useState(tenantId);
  const[assetId2, setAssetId] = useState(asset?.id);
  const[image,setImage]=useState(null);
  const [imageUri, setImageUri] = useState(asset?.asset_uploads?.[0]?.file || null);
  const [name, setName] = useState(asset?.name || '');
  const [selectedAsset, setSelectedAsset] = useState(asset?.asset_type_name ? { name: asset.asset_type_name, id: asset.asset_type_id } : null);
  const [checkedStatus, setCheckedStatus] = useState(asset?.status || 'ACTIVE');
  const [checkedCondition, setCheckedCondition] = useState(asset?.condition || '');
  const [modalVisible, setModalVisible] = useState(false);
  const [returnedLocation, setReturnedLocation] = useState({
    latitude: asset?.latitude || null,
    longitude: asset?.longitude || null
  });
  const [address, setAddress] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const { location: currentLocation } = useContext(LocationContext);  // Access current location from context
  const [highAccuracyUsed, setHighAccuracyUsed] = useState(false);

  const initialData = useMemo(() => ({
   
    imageUri: asset?.asset_uploads?.[0]?.file || null,
    name: asset?.name || '',
    selectedAsset: asset?.asset_type_name ? { name: asset.asset_type_name, id: asset.asset_type_id } : null,
    checkedStatus: asset?.status || 'ACTIVE',
    checkedCondition: asset?.condition || '',
    location: {
      latitude: asset?.latitude || null,
      longitude: asset?.longitude || null
    },
  }), [asset]);

  const isSaveDisabled = useMemo(() => (
    initialData.imageUri === imageUri &&
    initialData.name === name &&
    initialData.selectedAsset?.name === selectedAsset?.name &&
    initialData.checkedStatus === checkedStatus &&
    initialData.checkedCondition === checkedCondition &&
    initialData.location.latitude === returnedLocation.latitude &&
    initialData.location.longitude === returnedLocation.longitude
  ), [initialData, imageUri, name, selectedAsset, checkedStatus, checkedCondition, returnedLocation]);

  useEffect(() => {
    if (route.params?.selectedAsset) {
      setSelectedAsset(route.params.selectedAsset);
    }
  }, [route.params?.selectedAsset]);

  useEffect(() => {
    if (route.params?.selectedLocation) {
      setReturnedLocation(route.params.selectedLocation);
    }
  }, [route.params?.selectedLocation]);

  useEffect(() => {
    const fetchAddress = async () => {
      if (!returnedLocation.latitude || !returnedLocation.longitude) return;

      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${returnedLocation.longitude},${returnedLocation.latitude}.json?access_token=sk.eyJ1IjoiY2l2aWNseSIsImEiOiJjbHk4a3NjcmcwZGxzMmpzYnA5dGw4OWV1In0.oCECiSHLJO6qnEzyBmQoNw`
        );
        const placeName = response.data.features[0].place_name;
        setAddress(placeName);
      } catch (error) {
        console.error('Error fetching address:', error);
        setAddress('Unable to fetch address');
      }
    };

    fetchAddress();
  }, [returnedLocation]);

  const selectImage = useCallback(async () => {
    const permissionsGranted = await requestPermissions();
    if (permissionsGranted) {
      setModalVisible(true);
    }
  }, []);
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setReturnedLocation({ latitude, longitude });
        console.log('Using current location:', { latitude, longitude });
      },
      error => {
        console.error('Error getting current location:', error);
        setReturnedLocation(null);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const handleSave = useCallback(async () => {
    console.log('tenantId:', tenantId2);
    console.log('assetId:', assetId2);

    try {
      const session = await fetchAuthSession({ forceRefresh: true });
      const accessToken = session.tokens.accessToken.toString();

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const formdata = new FormData();
      formdata.append("condition", checkedCondition);
      formdata.append("name", name);
      formdata.append("status", checkedStatus);

      // Append asset type ID, either the initial one or the updated one
      const assetTypeId = selectedAsset?.id || initialData.selectedAsset.id;
      formdata.append("asset_type_id", assetTypeId);

      // Append location, either the initial one or the updated one
      const location = {
        latitude: returnedLocation.latitude,
        longitude: returnedLocation.longitude,
        comment: "Local Test"
      };
      formdata.append("location", JSON.stringify(location));



      const url = `https://api.dev.nonprod.civic.ly/assets/${tenantId2}/asset/${assetId2}`;
      console.log('PATCH URL:', url);

      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };

      const response = await fetch(url, requestOptions);

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const text = await response.text();
        console.error('Non-200 response:', text);
        throw new Error(`Request failed with status ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Received non-JSON response');
      }

      const result = await response.json();
      console.log('API Response:', result);
      //Updating the image//
      await handleAssetFileUpload({ assetId: assetId2,
        fileName: fileName ,
        fileType: image.mime,
        tenantId: tenantId,
        image: {
          path: image.path,
          filename: fileName,
          mime: image.mime
        }})

      Alert.alert('Success', 'Asset updated successfully');
    
      navigation.navigate("AssetsPage", { tenantId });
    } catch (error) {
      Alert.alert('Error', 'Failed to update asset');
      console.error('API Error:', error);
    }
  },[checkedCondition, name, checkedStatus, tenantId2, assetId2, returnedLocation, navigation, selectedAsset]);

  const handleCancel = useCallback(() => {
    navigation.navigate("AssetsPage", { tenantId: tenantId2 });
  }, [navigation, tenantId2]);

  const requestPermissions = async () => {
    try {
      const storageGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
        title: 'Storage Permission',
        message: 'This app needs access to your storage to display images.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (storageGranted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission denied');
        return false;
      }

      const cameraGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (cameraGranted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission denied');
        showPermissionAlert('Camera');
        return false;
      }

      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const showPermissionAlert = (permissionType) => {
    Alert.alert(
      `${permissionType} Permission`,
      `This app needs access to your ${permissionType.toLowerCase()} to function properly. Please go to settings and enable ${permissionType.toLowerCase()} permissions.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Go to Settings', onPress: () => Linking.openSettings() },
      ],
      { cancelable: false }
    );
  };

  // const pickAndCropImage = () => {
  //   ImagePicker.openPicker({ mediaType: 'photo', includeExif: true })
  //     .then(image => {
  //       setImage(image)
  //       setImageUri(image.path);
  //       setModalVisible(false);
  //     })
  //     .catch(error => {
  //       if (error.message !== 'User cancelled image selection') {
  //         console.error('Error picking and cropping image:', error);
  //       }
  //     });
  // };

  // const pickAndCropImageCamera = () => {
  //   ImagePicker.openCamera({ mediaType: 'photo', includeExif: true })
  //     .then(image => {
  //       setImage(image)
  //       setImageUri(image.path);
  //       setModalVisible(false);
  //     })
  //     .catch(error => {
  //       if (error.message !== 'User cancelled image selection') {
  //         console.error('Error capturing image:', error);
  //       }
  //     });
  // };
  // const pickAndCropImage = () => {
  //   ImagePicker.openPicker({
  //     mediaType: 'photo',
  //     // cropping: true, // Enable cropping
  //     includeExif: true, // Ensure EXIF data is included
  //   }).then(image => {
  //     setImage(image)
  //    console.log(image)
  //     setImageUri(image.path);
  //     console.log('Picked and cropped image:', image);

  //       // Extract file name from the path
  //   const extractedFileName = image.path.split('/').pop();
  //   setFileName(extractedFileName);
  //   console.log('File name:', extractedFileName);

  //   // Extract file extension from the file name
  //   const extractedFileType = extractedFileName.split('.').pop();
  //   setFileType(extractedFileType);
  //   console.log('File type:', extractedFileType);


  //     if (image.exif) {
  //       const { Latitude, Longitude } = image.exif;
  //       if (Latitude && Longitude) {
  //         setReturnedLocation({
  //           latitude: Latitude,
  //           longitude: Longitude,
  //         });
  //       } else {
  //         console.log('No GPS location data found in EXIF');
         
  //       }
  //     } else {
  //       console.log('No EXIF data found');
     
  //     }
  //   }).catch(error => {
  //     if (error.message !== 'User cancelled image selection') {
  //       console.error('Error picking and cropping image:', error);
  //     }
  //     setReturnedLocation(currentLocation);
  //   });
  //   setModalVisible(false); // Hide the modal
  // };


  // const pickAndCropImageCamera = () => {
  //   ImagePicker.openCamera({
  //     mediaType: 'photo',
  //     // cropping: true, // Enable cropping
  //     includeExif: true, // Ensure EXIF data is included
  //   }).then(image => {
  //     setImage(image)
  //     setImageUri(image.path);
  //     console.log('Picked and cropped image: camera', image);

  //            // Extract file name from the path
  //   const extractedFileName = image.path.split('/').pop();
  //   setFileName(extractedFileName);
  //   console.log('File name:', extractedFileName);

  //   // Extract file extension from the file name
  //   const extractedFileType = extractedFileName.split('.').pop();
  //   setFileType(extractedFileType);
  //   console.log('File type:', extractedFileType);
    

  //     if (image.exif) {
  //       const { Latitude, Longitude } = image.exif;
  //       if (Latitude && Longitude) {
  //         setReturnedLocation({
  //           latitude: Latitude,
  //           longitude: Longitude,
  //         });
  //       } else {
  //         console.log('No GPS location data found in EXIF');
  //         getCurrentLocation(); // Fallback to current location
  //       }
  //     } else {
  //       console.log('No EXIF data found');
  //       getCurrentLocation(); // Fallback to current location
  //     }
  //   }).catch(error => {
  //     if (error.message !== 'User cancelled image selection') {
  //       console.error('Error capturing image:', error);
  //     }
  //     getCurrentLocation(); // Fallback to current location
  //   });
  //   setModalVisible(false); // Hide the modal
  // };


  const pickAndCropImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      includeExif: true, // Ensure EXIF data is included
    }).then(image => {
      setImage(image);
      setImageUri(image.path);
      console.log('Picked and cropped image:', image);

      // Extract file name from the path
      const extractedFileName = image.path.split('/').pop();
      setFileName(extractedFileName);
      console.log('File name:', extractedFileName);

      // Extract file extension from the file name
      const extractedFileType = extractedFileName.split('.').pop();
      setFileType(extractedFileType);
      console.log('File type:', extractedFileType);

      if (image.exif) {
        const { Latitude, Longitude } = image.exif;
        if (Latitude && Longitude) {
          setReturnedLocation({
            latitude: Latitude,
            longitude: Longitude,
          });
        } else {
          console.log('No GPS location data found in EXIF');
          if (currentLocation) {
            setReturnedLocation(currentLocation);
          } else {
            console.log('Current location not available');
          }
        }
      } else {
        console.log('No EXIF data found');
        if (currentLocation) {
          setReturnedLocation(currentLocation);
        } else {
          console.log('Current location not available');
        }
      }
    }).catch(error => {
      if (error.message !== 'User cancelled image selection') {
        console.error('Error picking and cropping image:', error);
      }
      if (currentLocation) {
        setReturnedLocation(currentLocation);
      } else {
        console.log('Current location not available');
      }
    });
    setModalVisible(false); // Hide the modal
  };

  const pickAndCropImageCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      includeExif: true, // Ensure EXIF data is included
    }).then(image => {
      setImage(image);
      setImageUri(image.path);
      console.log('Picked and cropped image: camera', image);

      // Extract file name from the path
      const extractedFileName = image.path.split('/').pop();
      setFileName(extractedFileName);
      console.log('File name:', extractedFileName);

      // Extract file extension from the file name
      const extractedFileType = extractedFileName.split('.').pop();
      setFileType(extractedFileType);
      console.log('File type:', extractedFileType);

      if (image.exif) {
        const { Latitude, Longitude } = image.exif;
        if (Latitude && Longitude) {
          setReturnedLocation({
            latitude: Latitude,
            longitude: Longitude,
          });
        } else {
          console.log('No GPS location data found in EXIF');
          if (currentLocation) {
            setReturnedLocation(currentLocation);
          } else {
            console.log('Current location not available');
          }
        }
      } else {
        console.log('No EXIF data found');
        if (currentLocation) {
          setReturnedLocation(currentLocation);
        } else {
          console.log('Current location not available');
        }
      }
    }).catch(error => {
      if (error.message !== 'User cancelled image selection') {
        console.error('Error capturing image:', error);
      }
      if (currentLocation) {
        setReturnedLocation(currentLocation);
      } else {
        console.log('Current location not available');
      }
    });
    setModalVisible(false); // Hide the modal
  };


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle={"dark-content"} />
      <TouchableOpacity onPress={selectImage} style={styles.imagePicker}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text>Upload Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.container2}>
        <Text style={styles.label2}>Asset Type*</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AssetTypeSearch', { previousSelected: selectedAsset, sourcePage: 'EditingAssets' })} style={styles.assetContainer}>
          <View style={styles.nameField2}>
            <Text style={styles.input2}>
              {selectedAsset ? selectedAsset.name : 'Asset Type'}
            </Text>
            <AntDesign name="right" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.nameField}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.container2}>
        <Text style={styles.label2}>Add Location*</Text>
        <TouchableOpacity style={styles.assetContainer} onPress={() => navigation.navigate('MapMap', { locationData: returnedLocation, sourcePage: 'EditingAssets' })}>
          <View style={styles.nameField2}>
            <Text style={styles.input2}>
              {address ? address : 'Location'}
            </Text>
            <AntDesign name="right" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.statu}>
        <Text>Status*</Text>
        <View style={styles.radioButo}>
          {['ACTIVE', 'INACTIVE', 'DRAFT'].map(status => (
            <View key={status} style={styles.radioContainer}>
              <RadioButton
                value={status}
                status={checkedStatus === status ? 'checked' : 'unchecked'}
                onPress={() => setCheckedStatus(status)}
                color={checkedStatus === status ? 'rgb(0, 168, 84)' : undefined}
              />
              <Text style={styles.label}>{status}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.statu}>
        <Text>Condition*</Text>
        <View style={styles.radioButo}>
          {['NEW', 'FAIR', 'GOOD', 'POOR'].map(condition => (
            <View key={condition} style={styles.radioContainer}>
              <RadioButton
                value={condition}
                status={checkedCondition === condition ? 'checked' : 'unchecked'}
                onPress={() => setCheckedCondition(condition)}
                color={checkedCondition === condition ? 'rgb(0, 168, 84)' : undefined}
              />
              <Text style={styles.label}>{condition}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.saveButton, isSaveDisabled ? styles.saveButtonDisabled : styles.saveButtonEnabled]}
          onPress={handleSave}
          disabled={isSaveDisabled}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Upload Photo</Text>
          <TouchableOpacity style={styles.button} onPress={pickAndCropImageCamera}>
            <AntDesign name="camera" size={20} color="#000" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickAndCropImage}>
            <AntDesign name="picture" size={20} color="#000" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Choose from Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
            <AntDesign name="close" size={20} color="#000" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 80,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#333',
  },
  nameField: {
    width: Dimensions.get('window').width - 40,
    paddingHorizontal: 20,
    marginVertical: 5,
    marginBottom: -10,
    alignItems: 'flex-start',
  },
  label: {
    marginBottom: 5,
  },
  statu: {
    width: Dimensions.get('window').width - 40,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  radioButo: {
    flexDirection: 'row',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  container2: {
    width: Dimensions.get('window').width - 40,
    paddingHorizontal: 20,
    marginVertical: 7,
    alignItems: 'flex-start',
  },
  assetContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    borderColor: 'gray',
    width: 310,
  },
  nameField2: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label2: {
    marginBottom: 8,
  },
  input2: {},
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    flex: 1,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginRight: 10,
  },
  saveButtonEnabled: {
    backgroundColor: 'rgb(0, 168, 84)',
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: '#f44336',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EditingAssets;
