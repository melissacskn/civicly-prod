// ItemCard.js
import React,{useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import EditingAssets from '../screens/EditingAssets';
const { darkLight, primary, green,black,red } = Colors;
import { useNavigation } from '@react-navigation/native';
import {

  Colors,


  
} from '../components/styles4';
import {
  Grayscale,
  ColorMatrix,
  concatColorMatrices,

} from 'react-native-color-matrix-image-filters'

const ItemCard = ({ name, status, imageUrl,assetTypeName,condition, onEdit,onDelete,tenantId,assetId }) => {
  // const navigation = useNavigation();
  // // const handlePressEditButton = () => {
  // //   navigation.navigate("EditingAssets");
  // // };
  
  
  const [selection, setSelection] = useState(1);

    // const statusStyles = status === 'ACTIVE' ? styles.activeStatus : styles.inactiveStatus;
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
      // const handlePressDeleteButton = async () => {
      //   const session = await fetchAuthSession({ forceRefresh: true });
      //   const accessToken = session.tokens.accessToken.toString();
      //   const myHeaders = new Headers();
      //   myHeaders.append("Authorization", `Bearer ${accessToken}`);

      //   const requestOptions = {
      //     method: "DELETE",
      //     headers: myHeaders,
      //     redirect: "follow"
      //   };

      //   const response1 = fetch(`https://api.dev.nonprod.civic.ly/assets/${itemId}/asset/${assetId}`, requestOptions)
      //   const json1 = await response1.json();
        
  
      // };



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
             
                    {/* <Text style={[styles.btnText, ]}>Edit</Text> */}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn]}   onPress={() => onDelete(assetId)} >
                { <AntDesign name='delete' size={23} color={red} style={styles.btnIcon}></AntDesign> }
                    {/* <Text style={[styles.btnText, selection === 2 ? { color: "white" } : null]}>Delete</Text> */}
                </TouchableOpacity>
                </View>
    
    {/* <View style={styles.row}>
    <TouchableOpacity style={styles.button} >
        <Text>Press Here</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} >
        <Text>Press Here</Text>
      </TouchableOpacity>
      </View> */}
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
        marginBottom: 20,
       
        width: '100%',
        
    
      },
      image: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
       
      },
      
      assetTypeName: {
        fontSize: 20,
        marginTop: 10,
        color:'rgb(38, 38, 38)',
        fontFamily:'PublicSans-SemiBold'
        
       
      },
      name: {
        fontSize: 18,
        color: 'rgb(38, 38, 38)',
        // color:"rgb(38, 38, 38)",
        marginTop: 5, 
        fontFamily:'PublicSans-Regular'
      },
      status: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
        fontFamily:'PublicSans-Regular',
      },
      condition: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
        marginRight: 10,
        fontFamily:'PublicSans-Regular',
      },
    
      goodCondition: {
        backgroundColor: 'rgb(0, 168, 84)', // Light green background
        color: 'white', 
        padding:3
      },
      newCondition: {
        backgroundColor: 'rgb(0, 162, 174)', // Light blue background
        color: '#004085', 
        padding:3
      },
      fairCondition: {
        backgroundColor: 'rgb(255, 191, 0)', // Light yellow background
        color: 'white', 
        padding:3
      },
      poorCondition: {
        backgroundColor: 'rgb(240, 65, 52)', // Light red background
        color: 'white', 
        padding:3
      },
      defaultCondition: {
        backgroundColor: '#e2e3e5', // Light gray background
        color: 'white',
        padding:3
      },
      activeStatus: {
        color: 'green',
        backgroundColor: '#e0fce4', // Light green background
        padding:3
      },
      inactiveStatus: {
        color: 'red',
        backgroundColor: '#fce4e4', // Light red background
        padding:3
        
      },
      draftStatus: {
        color: 'rgb(140, 140, 140)', // Light gray
        backgroundColor: 'rgb(217, 217, 217)', // Beige background
        padding:3
        
      },
       

      row: {
          flexDirection: 'row',
          marginTop: 5,
          justifyContent: 'center', // Center items horizontally
          alignItems: 'center', // Center items vertically
          width: '100%', // Ensure it takes full width of the card
          },
      post: {
        marginBottom: 20,
      },
      button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginRight:10,
        marginTop: 5,

        
      },
      btnGroup: {
        marginTop:12,
        paddingBottom:6,
        paddingTop:6,
        // paddingVertical:3,
        flexDirection: 'row',
        alignItems: "center",
        borderBottomWidth: 0.25,
        borderTopWidth:0.25,
        borderBottomColor: '#6B7280',
        borderTopColor:'#6B7280',
       
    },
    btn: {
        flex: 1,
        borderRightWidth: 0.25,
        borderLeftWidth: 0.25,
        borderColor: '#6B7280'
    },
    btnIcon: {
        textAlign: 'center',
        padding: 6
        
        
    }


      
}


   
            
        

    );

    




 
export default ItemCard;