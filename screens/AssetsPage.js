import React,{useState,useContext} from "react";
import { Alert, StatusBar, TextInput, TouchableWithoutFeedbackBase, View } from "react-native";
import { ImageBackground ,StyleSheet,Text} from "react-native";


const AssetsPage=({route})=>{
    const email = route.params 
    return(

    <View style={styles.container}>
        <Text> welcome {email}</Text>
    </View>


    )
}
const styles =StyleSheet.create({
    container: {
      flex:1,
      
      alignItems: 'center',
      justifyContent: 'center'
      
    },
   

  });

export default AssetsPage