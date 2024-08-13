import React, { useState,useEffect,useContext } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Dimensions,StatusBar,Alert,PermissionsAndroid,Linking } from 'react-native';

import { useNavigation,useRoute } from '@react-navigation/native';
import AntDesign from "react-native-vector-icons/AntDesign"
import Mapbox from '@rnmapbox/maps';
import Modal from 'react-native-modal';

import { RadioButton } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';


import { CreateNewAsset } from '../components/HandleCreateAsset';

Mapbox.setAccessToken('sk.eyJ1IjoiY2l2aWNseSIsImEiOiJjbHk4a3NjcmcwZGxzMmpzYnA5dGw4OWV1In0.oCECiSHLJO6qnEzyBmQoNw');
import axios from 'axios';

import { LocationContext } from '../components/LocationContext';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CreateAsset2=({route})=>{
 
    const [imageUri, setImageUri] = useState(null);
    const [name, setName] = useState('');
    const[image,setImage]=useState(null);
    
    const{tenantid,assetData}=route.params
    const[tenantId,setTenantId]=useState(tenantid)
   
  
   
    const [selectedAsset, setSelectedAsset] = useState(null);

    const [checkedStatus, setCheckedStatus] = React.useState('ACTIVE');
    const [checkedCondition, setCheckedCondition] = React.useState();
    const [modalVisible, setModalVisible] = useState(false);
   
    const isSaveDisabled = !checkedStatus || !checkedCondition || !selectedAsset;

    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const [returnedLocation, setReturnedLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');
    const { location: currentLocation } = useContext(LocationContext);  // Access current location from context
    const [highAccuracyUsed, setHighAccuracyUsed] = useState(false);

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
 
// console.log(returnedLocation)


useEffect(() => {
  const fetchAddress = async () => {
    if (!returnedLocation) return;

    const { latitude, longitude } = returnedLocation;
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=sk.eyJ1IjoiY2l2aWNseSIsImEiOiJjbHk4a3NjcmcwZGxzMmpzYnA5dGw4OWV1In0.oCECiSHLJO6qnEzyBmQoNw`
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


  
    const selectImage =async () =>{
      const permissionsGranted = await requestPermissions();
      if (permissionsGranted) {
        setModalVisible(true);
      }
    };


  
  const handleSave = async () => {
    try {
     
  
      const result = await CreateNewAsset({ name: name, checkedStatus: checkedStatus, checkedCondition: checkedCondition,selectedAsset:selectedAsset,tenantId: tenantId,location:returnedLocation,fileName:fileName,fileType:fileType,image:image });
      
      

      ///THIS IS THE PLACE TO UPLOAD THE IMAGE////
      Alert.alert('Success', 'Asset saved successfully');
      navigation.navigate("AssetsPage",{tenantid:tenantId})
      // Handle the result as needed
    } catch (error) {
      Alert.alert('Error', 'Failed to save asset');
    }
  };
  
    const handleCancel = () => {
      // Handle cancel logic here
      navigation.navigate("AssetsPage",{tenantid:tenantId})
      console.log('Edit cancelled');
      // Reset the form or perform any other necessary action
    };

 



    // useEffect(() => {
    //   const requestPermissions = async () => {
    //     if (Platform.OS === 'android') {
    //       try {
    //         const storageGranted = await PermissionsAndroid.request(
    //           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //           {
    //             title: 'Storage Permission',
    //             message: 'This app needs access to your storage to display images.',
    //             buttonNeutral: 'Ask Me Later',
    //             buttonNegative: 'Cancel',
    //             buttonPositive: 'OK',
    //           },
    //         );
    //         if (storageGranted !== PermissionsAndroid.RESULTS.GRANTED) {
    //           console.log('Storage permission denied');
    //         }
    //         const cameraGranted = await PermissionsAndroid.request(
    //           PermissionsAndroid.PERMISSIONS.CAMERA,
    //           {
    //             title: 'Camera Permission',
    //             message: 'This app needs access to your camera to take photos.',
    //             buttonNeutral: 'Ask Me Later',
    //             buttonNegative: 'Cancel',
    //             buttonPositive: 'OK',
    //           },
    //         );
  
    //         if (cameraGranted !== PermissionsAndroid.RESULTS.GRANTED) {
    //           console.log('Camera permission denied');
    //         }
    //       } catch (err) {
    //         console.warn(err);
    //       }
    //     }
    //   };
  
    //   requestPermissions();
    // }, []); 
    // useEffect(() => {
    //   const requestPermissions = async () => {
    //     if (Platform.OS === 'android') {
    //       try {
    //         // Request Storage Permission
    //         const storageGranted = await PermissionsAndroid.request(
    //           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //           {
    //             title: 'Storage Permission',
    //             message: 'This app needs access to your storage to display images.',
    //             buttonNeutral: 'Ask Me Later',
    //             buttonNegative: 'Cancel',
    //             buttonPositive: 'OK',
    //           },
    //         );
    //         if (storageGranted !== PermissionsAndroid.RESULTS.GRANTED) {
    //           console.log('Storage permission denied');
    //           showPermissionAlert('Storage');
    //         }
  
    //         // Request Camera Permission
    //         const cameraGranted = await PermissionsAndroid.request(
    //           PermissionsAndroid.PERMISSIONS.CAMERA,
    //           {
    //             title: 'Camera Permission',
    //             message: 'This app needs access to your camera to take photos.',
    //             buttonNeutral: 'Ask Me Later',
    //             buttonNegative: 'Cancel',
    //             buttonPositive: 'OK',
    //           },
    //         );
    //         if (cameraGranted !== PermissionsAndroid.RESULTS.GRANTED) {
    //           console.log('Camera permission denied');
    //           showPermissionAlert('Camera');
    //         }
  
    //         // Request Location Permission
    //         const locationGranted = await PermissionsAndroid.request(
    //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //           {
    //             title: 'Location Permission',
    //             message: 'This app needs access to your location to provide location-based services.',
    //             buttonNeutral: 'Ask Me Later',
    //             buttonNegative: 'Cancel',
    //             buttonPositive: 'OK',
    //           },
    //         );
    //         if (locationGranted !== PermissionsAndroid.RESULTS.GRANTED) {
    //           console.log('Location permission denied');
    //           showPermissionAlert('Location');
    //         }
    //       } catch (err) {
    //         console.warn(err);
    //       }
    //     }
    //   };
  
    //   // Function to show alert when a permission is denied
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
  
    //   requestPermissions();
    // }, []);
  
    const requestPermissions = async () => {
      try {
        const storageGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage to display images.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (storageGranted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission denied');
          // showPermissionAlert('Storage');
          return false;
        }
    
        const cameraGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          /////////////When you write this message it shows an extra alert because automaticaly when you call the request function it asks you allow ... to take picture extra with allow , deny,dent&don't ask again
          // {
          //   title: 'Camera Permission',
          //   message: 'This app needs access to your camera to take photos.',
          //   buttonNeutral: 'Ask Me Later',
          //   buttonNegative: 'Cancel',
          //   buttonPositive: 'OK',
          // },
        );
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
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Go to Settings',
            onPress: () => Linking.openSettings(),
          },
        ],
        { cancelable: false }
      );
    };     
              
  
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
           <StatusBar
          backgroundColor="white"
          barStyle={"dark-content"}
         
        />
       
        <TouchableOpacity onPress={selectImage} style={styles.imagePicker}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text  style={{color: '#333',fontFamily:'PublicSans-Regular'}}>Upload Photo</Text>
            </View>
          )}
        </TouchableOpacity>


<     View style={styles.container2}>
<Text style={styles.label2} >Asset Type*</Text>
<TouchableOpacity onPress={() => navigation.navigate('AssetTypeSearch', { previousSelected: selectedAsset, sourcePage: 'CreateAsset2' })} style={styles.assetContainer}>
  <View style={styles.nameField2}>
    <Text style={styles.input2}>
      {selectedAsset ? selectedAsset.name : 'Asset Type'}
    </Text>
    <AntDesign name="right" size={20} color="black"/>
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
            
            placeholderTextColor={ "#333"}
          />
        </View>

      
        <View style={styles.container2}>
<Text style={styles.label2} >Add Location*</Text>
<TouchableOpacity  style={styles.assetContainer} onPress={() => navigation.navigate('MapMap', { locationData: location, sourcePage: 'CreateAsset2' })}>
        <View style={styles.nameField2}>
         
          <Text style={styles.input2}>
          {returnedLocation ? address : 'Location'}
          </Text>
          <AntDesign name="right" size={20} color="black"/>
        </View>

    
      </TouchableOpacity>
      </View>
    
     
        
         <View style={styles.statu}>
          <Text style={{color: '#333',fontFamily:'PublicSans-SemiBold'}}>Status*</Text>
          <View style={styles.radioButo}>
          <View style={styles.radioContainer}>
          <RadioButton
            value="ACTIVE"
            status={checkedStatus === 'ACTIVE' ? 'checked' : 'unchecked'}
            onPress={() => setCheckedStatus('ACTIVE')}
            color={checkedStatus === 'ACTIVE' ? 'rgb(0, 168, 84)' : undefined}
          />
          <Text style={styles.label3}>ACTIVE</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            value="INACTIVE"
            status={checkedStatus === 'INACTIVE' ? 'checked' : 'unchecked'}
            onPress={() => setCheckedStatus('INACTIVE')}
            color={checkedStatus === 'INACTIVE' ? 'rgb(0, 168, 84)' : undefined}
          />
          <Text style={styles.label3}>INACTIVE</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            value="DRAFT"
            status={checkedStatus === 'DRAFT' ? 'checked' : 'unchecked'}
            onPress={() => setCheckedStatus('DRAFT')}
            color={checkedStatus === 'DRAFT' ? 'rgb(0, 168, 84)' : undefined}
          />
          <Text style={styles.label3}>DRAFT</Text>
        </View>
          
        
       
          </View>
      
  
  
      </View>
      <View style={styles.statu}>
          <Text  style={{color: '#333',fontFamily:'PublicSans-SemiBold'}}>Condition*</Text>
          <View style={styles.radioButo}>
          <View style={styles.radioContainer}>
          <RadioButton
            value="NEW"
            status={checkedCondition === 'NEW' ? 'checked' : 'unchecked'}
            onPress={() => setCheckedCondition('NEW')}
            color={checkedCondition === 'NEW' ? 'rgb(0, 168, 84)' : undefined}
          />
          <Text style={styles.label3}>NEW</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            value="FAIR"
            status={checkedCondition === 'FAIR' ? 'checked' : 'unchecked'}
            onPress={() => setCheckedCondition('FAIR')}
            color={checkedCondition === 'FAIR' ? 'rgb(0, 168, 84)' : undefined}
          />
          <Text style={styles.label3}>FAIR</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            value="GOOD"
            status={checkedCondition === 'GOOD' ? 'checked' : 'unchecked'}
            onPress={() => setCheckedCondition('GOOD')}
            color={checkedCondition === 'GOOD' ? 'rgb(0, 168, 84)' : undefined}
          />
          <Text style={styles.label3}>GOOD</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            value="POOR"
            status={checkedCondition === 'POOR' ? 'checked' : 'unchecked'}
            onPress={() => setCheckedCondition('POOR')}
            color={checkedCondition === 'POOR' ? 'rgb(0, 168, 84)' : undefined}
          />
          <Text style={styles.label3}>POOR</Text>
        </View>
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


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('8%'), // 8% of screen width
    paddingVertical: hp('10%'), // 10% of screen height
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    height: wp('40%'), // 40% of screen width
    width: wp('40%'),
    borderRadius: wp('20%'), // Make it circular
    backgroundColor: '#e0e0e0',
    marginBottom: hp('1%'), // 2% of screen height
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: wp('20%'), // Circular image
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#333',
  },
  input: {
    height: hp('5%'), // 5% of screen height
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: hp('2%'), // 2% of screen height
    paddingHorizontal: wp('3%'), // 3% of screen width
    color: '#333',
    fontFamily:'PublicSans-Regular',
  },
  nameField: {
    width: wp('90%'), // 90% of screen width
    paddingHorizontal: wp('5%'), // 5% of screen width
    marginVertical: hp('1%'), // 1% of screen height
    alignItems: 'flex-start',
  },
  label: {
    marginBottom: hp('0.5%'), // 0.5% of screen height
    color: '#333',
    fontFamily:'PublicSans-SemiBold',
  },
  statu: {
    width: wp('90%'), // 90% of screen width
    paddingHorizontal: wp('5%'), // 5% of screen width
    alignItems: 'flex-start',
    marginVertical: hp('1%'), // 1% of screen height
  },
  radioButo: {
    flexDirection: 'row',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'), // 1% of screen height
  },
  radioLabel: {
    color: '#333',
  },
  container2: {
    width: wp('90%'), // 90% of screen width
    paddingHorizontal: wp('5%'), // 5% of screen width
    marginVertical: hp('1%'), // 1% of screen height
    alignItems: 'flex-start',
  },
  assetContainer: {
    borderWidth: 1,
    padding: hp('1.5%'), // 1.5% of screen height
    borderRadius: 4,
    borderColor: 'gray',
    width: '100%', // Full width of the container
  },
  nameField2: {
    marginBottom: hp('0.3%'), // 0.3% of screen height
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label2: {
    marginBottom: hp('1%'), // 1% of screen height
    color: '#333',
    fontFamily:'PublicSans-SemiBold',
  },
  input2: {
    color: '#333',
    fontFamily:'PublicSans-Regular'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: hp('2%'), // 2% of screen height
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalText: {
    fontSize: wp('4%'), // 4% of screen width
    marginBottom: hp('1%'), // 1% of screen height
    color: '#333',
    fontFamily:'PublicSans-SemiBold'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: hp('2%'), // 2% of screen height
    borderRadius: 4,
    marginBottom: hp('2%'), // 2% of screen height
  },
  buttonIcon: {
    marginRight: wp('2%'), // 2% of screen width
  },
  buttonText: {
    color: '#333',
    fontSize: wp('4%'), // 4% of screen width,
    fontFamily: 'PublicSans-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Full width of the container
  },
  saveButton: {
    flex: 1,
    padding: hp('2%'), // 2% of screen height
    borderRadius: 4,
    alignItems: 'center',
    marginRight: wp('2%'), // 2% of screen width
  },
  saveButtonEnabled: {
    backgroundColor: 'rgb(0, 168, 84)',
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    color: 'white',
    fontSize: wp('4%'), // 4% of screen width,
    fontFamily: 'PublicSans-SemiBold',
  },
  cancelButton: {
    flex: 1,
    padding: hp('2%'), // 2% of screen height
    borderRadius: 4,
    alignItems: 'center',
    backgroundColor: '#f44336',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: wp('4%'), // 4% of screen width,
    fontFamily: 'PublicSans-SemiBold',
  },
  label3: {
    marginBottom: hp('0.5%'),
    color: '#333',
    fontFamily:'PublicSans-Regular',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: hp('5%'), // 5% of screen height
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: hp('2%'), // 2% of screen height
    paddingHorizontal: wp('3%'), // 3% of screen width
    color: '#333',
  },
  inputAndroid: {
    height: hp('5%'), // 5% of screen height
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: hp('2%'), // 2% of screen height
    paddingHorizontal: wp('3%'), // 3% of screen width
    color: '#333',
  },
});



export default CreateAsset2;