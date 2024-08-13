// ItemCard.js
import React,{useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";

const { darkLight, primary, green,black,red } = Colors;
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {

  Colors,


  
} from './stylesAssetsPage';
import {
  Grayscale,
  ColorMatrix,
  concatColorMatrices,

} from 'react-native-color-matrix-image-filters'

const ItemCard = ({ name, status, imageUrl,assetTypeName,condition,assetTypeId, onEdit,onDelete,tenantId,assetId }) => {
 
  
  
  const [selection, setSelection] = useState(1);

    
    const statusStyles = status === 'ACTIVE' 
    ? styles.activeStatus 
    : status === 'DRAFT' ? styles.draftStatus 
      : styles.inactiveStatus;
  
  

    const conditionStyles = () => {
        switch (condition) {
          case 'GOOD':
            return styles.goodCondition;
          case 'NEW':
            return styles.newCondition;
          case 'FAIR':
            return styles.fairCondition;
          case 'POOR':
            return styles.poorCondition;
          default:
            return styles.defaultCondition;
        }
      };
  




  return (

      <View style={styles.post}>
 
        
      <Text style={styles.assetTypeName}>{assetTypeName}</Text>
      {
        status==='DRAFT' ?(
          <Grayscale>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </Grayscale>
        ):(
        <Image source={{ uri: imageUrl }} style={styles.image} />)}
     
      
      <Text style={styles.name}>{name}</Text>
      <View style={styles.row}>

      
      <Text style={[styles.condition, conditionStyles()]}>{condition}</Text>
      <Text style={[styles.status, statusStyles]}>{status}</Text>
     
 
    </View>
    <View style={styles.btnGroup}>
                <TouchableOpacity style={[styles.btn]}  onPress={() =>onEdit(assetId)} >
                  { <AntDesign name='edit' size={23} color={green} style={styles.btnIcon}></AntDesign> }
             
                  
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn]}   onPress={() => onDelete(assetId)} >
                { <AntDesign name='delete' size={23} color={red} style={styles.btnIcon}></AntDesign> }
                   
                </TouchableOpacity>
                </View>
    
 
    </View>
  );
};

const styles = StyleSheet.create({
 

       card: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%', // Ensure a fixed width or percentage widt
      },
      
      post: {
        marginBottom: hp('2%'), 
        width: '100%',
    
      },
      image: {
        width: '100%', // Maintain full width
        height: undefined, // Allow height to be determined by aspect ratio
        aspectRatio: 1, // Maintain a 1:1 aspect ratio for a square shape
        resizeMode: 'cover', // Ensure the image covers the entire space
      
    },
      
    assetTypeName: {
      fontSize: wp('5%'), // Dynamic font size based on screen width
      marginTop: hp('1%'), // Dynamic margin top based on screen height
      color: 'rgb(38, 38, 38)',
      fontFamily: 'PublicSans-SemiBold',
      // textAlign: 'center', // Center the text for a balanced look
  },
  name: {
    fontSize: wp('4.5%'), // Dynamic font size based on screen width
    color: 'rgb(38, 38, 38)',
    marginTop: hp('0.5%'), // Dynamic margin top based on screen height
    fontFamily: 'PublicSans-Regular',
    // textAlign: 'center', // Center the text for a balanced look
},

status: {
  fontSize: wp('3.5%'), // Dynamic font size based on screen width
  color: 'gray',
  marginTop: hp('0.5%'), // Dynamic margin top based on screen height
  fontFamily: 'PublicSans-Regular',
  // textAlign: 'center', // Center the text for a balanced look
},

condition: {
  fontSize: wp('3.5%'), // Dynamic font size based on screen width
  color: 'gray',
  marginTop: hp('0.5%'), // Dynamic margin top based on screen height
  marginRight: wp('2%'), // Dynamic margin right based on screen width
  fontFamily: 'PublicSans-Regular',
  // textAlign: 'center', // Center the text for a balanced look
},

    
goodCondition: {
  backgroundColor: 'rgb(0, 168, 84)', // Light green background
  color: 'white',
  paddingVertical: hp('0.5%'), // Dynamic vertical padding based on screen height
  paddingHorizontal: wp('2%'), // Dynamic horizontal padding based on screen width
  borderRadius: wp('2%'), // Adding border radius for a rounded badge look
  textAlign: 'center', // Center the text within the badge
},
newCondition: {
  backgroundColor: 'rgb(0, 162, 174)', // Light blue background
  color: '#004085',
  paddingVertical: hp('0.5%'),
  paddingHorizontal: wp('2%'),
  borderRadius: wp('2%'),
  textAlign: 'center',
},
fairCondition: {
  backgroundColor: 'rgb(255, 191, 0)', // Light yellow background
  color: 'white',
  paddingVertical: hp('0.5%'),
  paddingHorizontal: wp('2%'),
  borderRadius: wp('2%'),
  textAlign: 'center',
},
poorCondition: {
  backgroundColor: 'rgb(240, 65, 52)', // Light red background
  color: 'white',
  paddingVertical: hp('0.5%'),
  paddingHorizontal: wp('2%'),
  borderRadius: wp('2%'),
  textAlign: 'center',
},

defaultCondition: {
  backgroundColor: '#e2e3e5', // Light gray background
  color: 'white',
  paddingVertical: hp('0.5%'), // Dynamic vertical padding based on screen height
  paddingHorizontal: wp('2%'), // Dynamic horizontal padding based on screen width
  borderRadius: wp('2%'), // Adding border radius for a rounded badge look
  textAlign: 'center', // Center the text within the badge
},
activeStatus: {
  color: 'green',
  backgroundColor: '#e0fce4', // Light green background
  paddingVertical: hp('0.5%'),
  paddingHorizontal: wp('2%'),
  borderRadius: wp('2%'),
  textAlign: 'center',
},
inactiveStatus: {
  color: 'red',
  backgroundColor: '#fce4e4', // Light red background
  paddingVertical: hp('0.5%'),
  paddingHorizontal: wp('2%'),
  borderRadius: wp('2%'),
  textAlign: 'center',
},
draftStatus: {
  color: 'rgb(140, 140, 140)', // Light gray text color
  backgroundColor: 'rgb(217, 217, 217)', // Beige background
  paddingVertical: hp('0.5%'),
  paddingHorizontal: wp('2%'),
  borderRadius: wp('2%'),
  textAlign: 'center',
},

row: {
  flexDirection: 'row',
  marginTop: hp('1%'), // Dynamic margin top based on screen height
  justifyContent: 'center', // Center items horizontally
  alignItems: 'center', // Center items vertically
  width: '100%', // Ensure it takes full width of the card
  paddingHorizontal: wp('2%'), // Add horizontal padding to provide spacing from the edges
},

post: {
  marginBottom: 20,
},
button: {
  alignItems: 'center',
  backgroundColor: '#DDDDDD', // Light gray background
  paddingVertical: hp('1%'), // Dynamic vertical padding based on screen height
  paddingHorizontal: wp('3%'), // Dynamic horizontal padding based on screen width
  marginRight: wp('2%'), // Dynamic margin right based on screen width
  marginTop: hp('0.5%'), // Dynamic margin top based on screen height
  borderRadius: wp('2%'), // Adding a border radius for a rounded button look
},

btnGroup: {
  marginTop:12,
  paddingBottom:6,
  paddingTop:6,
  flexDirection: 'row',
  alignItems: "center",
  borderBottomWidth: 0.25,
  borderTopWidth:0.25,
  borderBottomColor: '#6B7280',
  borderTopColor:'#6B7280',
 
},
btn: {
  flex: 1,
  borderRightWidth: 0.5, // Increased border width for better visibility
  borderLeftWidth: 0.5, // Increased border width for better visibility
  borderColor: '#6B7280', // Consistent border color
  paddingVertical: hp('0.3%'), // Add vertical padding for better touch area
  alignItems: 'center', // Center the content inside the button
  justifyContent: 'center', // Center the content inside the button
},

btnIcon: {
  textAlign: 'center', // Center the icon text within the button
  paddingVertical: hp('0.5%'), // Dynamic vertical padding based on screen height
  paddingHorizontal: wp('2%'), // Dynamic horizontal padding based on screen width
},



      
});

export default ItemCard;