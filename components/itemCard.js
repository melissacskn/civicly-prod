// ItemCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ItemCard = ({ name, status, imageUrl,assetTypeName,condition }) => {

    const statusStyles = status === 'ACTIVE' ? styles.activeStatus : styles.inactiveStatus;
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
    <View style={styles2.post}>
      <Text style={styles.assetTypeName}>{assetTypeName}</Text>
      <Image source={{ uri: imageUrl }} style={styles2.image} />
      
      <Text style={styles.name}>{name}</Text>
      <View style={styles.row}>

      
      <Text style={[styles.condition, conditionStyles()]}>{condition}</Text>
      <Text style={[styles.status, statusStyles]}>{status}</Text>
     
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
      image: {
        width: 100,
        height: 100,
        // borderRadius: 10,
      },
      assetTypeName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
      },
      name: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
      },
      status: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
      },
      condition: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
        marginRight: 10,
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

            
        

    });

    
const styles2 = StyleSheet.create({
  post: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  user: {
    fontWeight: 'bold',
  },
});



 
export default ItemCard;