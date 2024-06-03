
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,FlatList } from 'react-native';
import { signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

const AssetsPage = ({ route }) => {
  const { itemId, itemName } = route.params;
 const [count,setCount]=useState(0)

      //GETTING ASSETS OF AN INDIVUAL TENANT
      const getAssets=async ()=>{
      const session = await fetchAuthSession({ forceRefresh: true });
      const accessToken = session.tokens.accessToken.toString();
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const requestOptionsss = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    const responseee = await fetch(`https://api.dev.nonprod.civic.ly/assets/${itemId}/asset/`,requestOptionsss)
    const jsonnn = await responseee.json();
     console.log("Response JSON:", jsonnn);
    setCount(jsonnn.count)
     for(let i=0; i<count;i++){

      console.log("Asset Name: ",jsonnn.results[i].name)

    }
    
     
}
useEffect(() => {
    getAssets()
  }, []); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Text>Id: {itemId}</Text>
      <Text>Organisation Name: {itemName}</Text>
      <Text>Number of asset {count}</Text>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});





     export default AssetsPage
   
