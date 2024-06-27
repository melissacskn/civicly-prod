
import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Dimensions,StatusBar } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation,useRoute } from '@react-navigation/native';
import AntDesign from "react-native-vector-icons/AntDesign"

import Modal from 'react-native-modal';

import { RadioButton } from 'react-native-paper';



const CreateAsset2=()=>{
    const [imageUri, setImageUri] = useState(null);
    const [name, setName] = useState('');
    const [assetType, setassetType] = useState('');
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [checkedStatus, setCheckedStatus] = React.useState('ACTIVE');
    const [checkedCondition, setCheckedCondition] = React.useState();
    const [modalVisible, setModalVisible] = useState(false);
   
    const route = useRoute();

    const navigation = useNavigation();
  
    useEffect(() => {
      if (route.params?.selectedAsset) {
        setSelectedAsset(route.params.selectedAsset);
      }
    }, [route.params?.selectedAsset]);
    

    // const accessToken=route.params
  
    const selectImage = () => {
      setModalVisible(true);
    };
  
    const handleImagePickerResponse = (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
      setModalVisible(false); // Hide the modal
    };
  
    const openCamera = () => {
      launchCamera({ mediaType: 'photo', maxHeight: 200, maxWidth: 200 }, handleImagePickerResponse);
    };
  
    const openGallery = () => {
      launchImageLibrary({ mediaType: 'photo', maxHeight: 200, maxWidth: 200 }, handleImagePickerResponse);
    };
  
  
    
  
    const handleSave = () => {
      // Handle save logic here
      console.log('Profile saved:', { name, email, address, country });
    };
  
    const handleCancel = () => {
      // Handle cancel logic here
      console.log('Edit cancelled');
      // Reset the form or perform any other necessary action
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

{/* 
        <View style={styles.nameField}>
        <Text style={styles.label}>Asset Type*</Text>
        <TextInput
            style={styles.input}
            placeholder="Asset Type"
            value={assetType}
            onChangeText={setassetType}
            onFocus={() => navigation.navigate('AssetTypeSearch')}
          />
           </View> */}    

<     View style={styles.container2}>
<Text style={styles.label2} >Asset Type*</Text>
<TouchableOpacity onPress={() => navigation.navigate('AssetTypeSearch')} style={styles.assetContainer}>
        <View style={styles.nameField2}>
         
          <Text style={styles.input2}>
            {selectedAsset ? selectedAsset.name : 'Asset Type'}
          </Text>
          <AntDesign name="right" size={20} color="black"/>
        </View>

        {/* {selectedAsset && (
          <View style={styles.assetDetails}>
            <Text style={styles.detailText}>
                      {selectedAsset.asset_category.name} - {selectedAsset.asset_category.parent.name}
                    </Text>
          </View>
        )} */}
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
      
      
          
    
         {/* <RNPickerSelect
          onValueChange={(value) => setCountry(value)}
           items={[
             { label: 'United States', value: 'us' },
            { label: 'Canada', value: 'ca' },
             { label: 'United Kingdom', value: 'uk' },
           ]}
           style={pickerSelectStyles}
           placeholder={{ label: 'Search and select asset type...', value: null }}
           
         /> */}
     
      
         
        
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
        <Button title="Save" onPress={handleSave} color="rgb(0, 168, 84)" />
         
          <View style={styles.buttonSpacer} />
          <Button title="Cancel" onPress={handleCancel} color="rgb(240, 65, 52)" />
        </View>
  
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}
          style={styles.modal}
        >
           <View style={styles.modalContent}>
            <Text style={styles.modalText}>Upload Photo</Text>
            <Button title="Take Photo" onPress={openCamera} />
            <Button title="Choose from Library" onPress={openGallery} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View> 
  
          {/*
           <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Upload Photo</Text>
            <Button title="Take Photo" onPress={() => {openCamera}} />
            <Button title="Choose from Library" onPress={() => {openGallery}} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
            </View>
        */}
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
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
  
      width: '100%',
    },
    buttonSpacer: {
      width: 10,
    },
    modal: {
      justifyContent: 'flex-end',
  
      margin: 0,
     
      
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 30,
      
    
      marginTop:15,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    
      alignItems: 'center',
  
      justifyContent:"space-between"
     
    },
    modalText: {
      fontSize: 18,
      marginBottom: 15,
   
    },
    nameField: {
      width: Dimensions.get('window').width - 40, // Width minus padding (20px on each side)
      paddingHorizontal: 20, // Horizontal padding
      marginVertical: 10, // Vertical margin if needed
      alignItems: 'flex-start', // Align children to the start of the container
      marginVertical: 10, // Add some vertical margin if needed
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
  
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end', // Align content at the end of the modal
      backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent background
    
    },
    modalContent: {
      backgroundColor: 'white',
      padding:10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    modalText: {
      fontSize: 18,
      marginBottom: 10,
    },
    assetDetails: {
      marginTop: 5,
    },
    detailText: {
      fontSize: 16,
      marginBottom: 5,
    },
    container2:{
   
      width: Dimensions.get('window').width - 40, // Width minus padding (20px on each side)
      paddingHorizontal: 20, // Horizontal padding
      marginVertical: 10, // Vertical margin if needed
      alignItems: 'flex-start', // Align children to the start of the container
      marginVertical: 10, // Add some vertical margin if needed
    
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
    assetDetails: {
      fontSize: 14,
      color: '#333',
    },
    detailText: {
      fontSize: 16,
      marginBottom: 10,
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
    assetDetails: {
      marginTop: 20,
    },
    detailText: {
      fontSize: 16,
      marginBottom: 10,
    },
  });
export default CreateAsset2