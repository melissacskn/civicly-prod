// ItemCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ItemCard = ({ name, status, imageUrl,assetTypeName,condition }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.assetTypeName}>Type: {assetTypeName}</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.condition}>{condition}</Text>
      <Text style={styles.status}>{status}</Text>
     
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
      },
});

export default ItemCard;
