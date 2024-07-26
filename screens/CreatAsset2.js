import React, { useState,useEffect } from 'react';
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
import { handleAssetFileUpload } from '../components/AssetUploads';

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
        // cropping: true, // Enable cropping
        includeExif: true, // Ensure EXIF data is included
      }).then(image => {
        setImage(image)
       console.log(image)
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
            setLocation({
              latitude: Latitude,
              longitude: Longitude,
            });
          } else {
            console.log('No GPS location data found in EXIF');
            setLocation(null);
          }
        } else {
          console.log('No EXIF data found');
          setLocation(null);
        }
      }).catch(error => {
        if (error.message !== 'User cancelled image selection') {
          console.error('Error picking and cropping image:', error);
        }
        setLocation(null);
      });
      setModalVisible(false); // Hide the modal
    };

 
    const pickAndCropImageCamera = () => {
      ImagePicker.openCamera({
        mediaType: 'photo',
        // cropping: true, // Enable cropping
        includeExif: true, // Ensure EXIF data is included
      }).then(image => {
        setImage(image)
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
            setLocation({
              latitude: Latitude,
              longitude: Longitude,
            });
          } else {
            console.log('No GPS location data found in EXIF');
            setLocation(null);
          }
        } else {
          console.log('No EXIF data found');
          setLocation(null);
        }
      }).catch(error => {
        if (error.message !== 'User cancelled image selection') {
          console.error('Error capturing image:', error);
        }
        setLocation(null);
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
              <Text>Upload Photo</Text>
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
            placeholderTextColor="#999"
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
          <Text>Status*</Text>
          <View style={styles.radioButo}>
          <View style={styles.radioContainer}>
          <RadioButton
            value="ACTIVE"
            status={checkedStatus === 'ACTIVE' ? 'checked' : 'unchecked'}
            onPress={() => setCheckedStatus('ACTIVE')}
            color={checkedStatus === 'ACTIVE' ? 'rgb(0, 168, 84)' : undefined}
          />
          <Text style={styles.label}>ACTIVE</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            value="INACTIVE"
            status={checkedStatus === 'INACTIVE' ? 'checked' : 'unchecked'}
            onPress={() => setCheckedStatus('INACTIVE')}
            color={checkedStatus === 'INACTIVE' ? 'rgb(0, 168, 84)' : undefined}
          />
          <Text style={styles.label}>INACTIVE</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            value="DRAFT"
            status={checkedStatus === 'DRAFT' ? 'checked' : 'unchecked'}
            onPress={() => setCheckedStatus('DRAFT')}
            color={checkedStatus === 'DRAFT' ? 'rgb(0, 168, 84)' : undefined}
          />
          <Text style={styles.label}>DRAFT</Text>
        </View>
          
        
       
          </View>
      
  
  
      </View>
      <View style={styles.statu}>
          <Text>Condition*</Text>
          <View style={styles.radioButo}>
          <View style={styles.radioContainer}>
          <RadioButton
            value="NEW"
            status={checkedCondition === 'NEW' ? 'checked' : 'unchecked'}
            onPress={() => setCheckedCondition('NEW')}
            color={checkedCondition === 'NEW' ? 'rgb(0, 168, 84)' : undefined}
          />
          <Text style={styles.label}>NEW</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            value="FAIR"
            status={checkedCondition === 'FAIR' ? 'checked' : 'unchecked'}
            onPress={() => setCheckedCondition('FAIR')}
            color={checkedCondition === 'FAIR' ? 'rgb(0, 168, 84)' : undefined}
          />
          <Text style={styles.label}>FAIR</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            value="GOOD"
            status={checkedCondition === 'GOOD' ? 'checked' : 'unchecked'}
            onPress={() => setCheckedCondition('GOOD')}
            color={checkedCondition === 'GOOD' ? 'rgb(0, 168, 84)' : undefined}
          />
          <Text style={styles.label}>GOOD</Text>
        </View>
        <View style={styles.radioContainer}>
          <RadioButton
            value="POOR"
            status={checkedCondition === 'POOR' ? 'checked' : 'unchecked'}
            onPress={() => setCheckedCondition('POOR')}
            color={checkedCondition === 'POOR' ? 'rgb(0, 168, 84)' : undefined}
          />
          <Text style={styles.label}>POOR</Text>
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
      padding: 80,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    imagePicker: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 150,
      width: 150,
      // borderRadius: 75, EGER KARE DEGIL YUVARLAK ISTERSEN AC
      borderRadius:75,
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
      width: Dimensions.get('window').width - 40, // Width minus padding (20px on each side)
      paddingHorizontal: 20, // Horizontal padding
      marginVertical: 5, // Vertical margin if needed
      marginBottom: -10, ///// The space between the add location and the name container when you make minus they come closer
      
      alignItems: 'flex-start', // Align children to the start of the container
   
     
    },
    label: {
      marginBottom: 5, // Add some space between the label and the TextInput
    },
    statu:{
     
      width: Dimensions.get('window').width - 40, // Width minus padding (20px on each side)
      paddingHorizontal: 20, // Horizontal padding
    
      alignItems: 'flex-start', // Align children to the start of the container
      marginVertical: 10, // Add some vertical margin if needed
    
      
    
    },
    radioButo:{
      flexDirection:'row'
  
    },
    radioContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
  
   

    container2:{
   
      width: Dimensions.get('window').width - 40, // Width minus padding (20px on each side)
      paddingHorizontal: 20, // Horizontal padding
      marginVertical: 7, // Vertical margin if needed
      alignItems: 'flex-start', // Align children to the start of the container
    
    
    },


    assetContainer: {
    
      borderWidth: 1,
      padding: 10,
      borderRadius: 4,
      borderColor: 'gray',
      
      
      width:310
      
    },
    nameField2: {
      marginBottom: 5,
      flexDirection:'row',
      justifyContent: 'space-between',
    },
    label2: {
      
      marginBottom: 8,
    },
    input2: {
      
    },

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
      flexDirection: 'row',  // Ensure icon and text are in a row
      alignItems: 'center',  // Center items vertically
      padding: 12,
      borderRadius: 4,
      marginBottom: 16,
    },
    buttonIcon: {
      marginRight: 10,  // Add space between icon and text
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
  
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      height: 40,
      width: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
    
    },
    inputAndroid: {
      height: 40,
      width: '100%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
     
    },
 
  });
export default CreateAsset2