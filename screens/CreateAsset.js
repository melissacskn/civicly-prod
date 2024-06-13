import {View,Text, Image,TextInput, TouchableOpacity,StyleSheet, SafeAreaView,Button} from 'react-native';
import { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const CreateAsset = ({ route}) => {
    const [photo, setPhoto] = useState(null);
    const [caption, setCaption] = useState('');
    // const [selectImage,setSelectImage]=useState('')
    // const ImagePicker=()=>{
    //     let options={
    //         storageOptions:{
    //             path:'image',
    //         }
    //     }
    //     launchImageLibrary(options,response=>{
    //         setSelectImage(response.assets[0].uri)
    //         console.log(response.assets[0].uri)
    //     })

    // }
    const selectPhoto = () => {
        launchImageLibrary({}, (data) => {
          if (data && data.assets && data.assets[0] && data.assets[0].uri) {
            setPhoto(data.assets[0].uri);
          }
        });
      };
    
      const takePhoto = () => {
        launchCamera({}, (data) => {
          if (data && data.assets && data.assets[0] && data.assets[0].uri) {
            setPhoto(data.assets[0].uri);
          }
        });
      };
    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{height:200, width:'100%'}}></View>
            {photo ? (
        <Image source={{ uri: photo }} style={styles.photo} />
      ) : (
        <Image source={require('./../assets/images/civicly-remove.png')} style={styles.photo} />
      )}
            <Image style={{width:"100%"}} source={{uri:photo}}></Image>
            <TouchableOpacity 
            onPress={()=>{
            selectPhoto()}}
            style={{
                marginTop:20,
                height:50,
                width:'60%',
                backgroundColor:'skyblue',
                justifyContent:"center",
                alignItems:"center",
                alignSelf:"center"            
            }}
            
            >
                <Text style={{fontSize:20}}>gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{
            takePhoto()}}
            style={{
                marginTop:20,
                height:50,
                width:'60%',
                backgroundColor:'skyblue',
                justifyContent:"center",
                alignItems:"center",
                alignSelf:"center"            
            }}
            
            >
                <Text style={{fontSize:20}}>Take Photo</Text>
            </TouchableOpacity>

        </SafeAreaView>
       
    )


}
   

  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    photo: {
      width: 300,
      height: 300,
      marginBottom: 16,
      resizeMode: 'contain',
    },})

export default CreateAsset;