
import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, ImageBackground,StyleSheet,View, Text,FlatList,TouchableOpacity,Button,ScrollView} from "react-native";
import { signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import styled from 'styled-components';

import AntDesign from "react-native-vector-icons/AntDesign";


import ItemCard from '../components/itemCard';
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  WelcomeContainer,
  Colors,
  AssetTitle,
  TenantTitle,
  Container,
  LeftIcon,
  RightCornerContainer

  
} from '../components/styles4';
// Colors
const { darkLight, primary, green,black } = Colors;

const AssetsPage = ({ route }) => {
 

const { itemId, itemName } = route.params;
 const [count,setCount]=useState(0)
 
 const [data,setdata]=useState([])

// //       //GETTING ASSETS OF AN INDIVUAL TENANT
// //       const getAssets=async ()=>{
// //       const session = await fetchAuthSession({ forceRefresh: true });
// //       const accessToken = session.tokens.accessToken.toString();
// //       const myHeaders = new Headers();
// //       myHeaders.append("Authorization", `Bearer ${accessToken}`);

// //     const requestOptionsss = {
// //       method: "GET",
// //       headers: myHeaders,
// //       redirect: "follow"
// //     };
// //     const responseee = await fetch(`https://api.dev.nonprod.civic.ly/assets/${itemId}/asset/`,requestOptionsss)
// //     const jsonnn = await responseee.json();
// //     console.log("Response JSON:", jsonnn);
// //     setCount(jsonnn.count)
// //     const newData = jsonnn.results.map((item) => ({
// //       name: item.name,
// //       asset_uploads: item.asset_uploads,
// //       status: item.status,
// //     }));
// //     setdata(newData);
    
    
// //       }
      

// // useEffect(() => {
// //     getAssets()
// //   }, []); 
//   useEffect(() => {
//     if (data.length > 0) {
//       const firstElement = data[0];
//       const firstName = firstElement.name;
//       const firstStatus = firstElement.status;
//       const firstAssetUploads = firstElement.asset_uploads;

//       console.log("Name:", firstName);
//       console.log("Status:", firstStatus);
//       console.log("Asset Uploads:", firstAssetUploads);


//             // Access the first file URL
//             if (firstAssetUploads.length > 0) {
//               const firstFileUrl = firstAssetUploads[0].file;
//               console.log("First File URL:", firstFileUrl);
//             }
      
//     }

    

//   }, [data]);

  // GETTING ASSETS OF AN INDIVUAL TENANT
      const fetchData=async ()=>{
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
    // console.log("Response JSON:", jsonnn);
    setCount(jsonnn.count)
    const newData = jsonnn.results.map((item) => ({
      name: item.name,
      asset_uploads: item.asset_uploads,
      status: item.status,
      condition:item.condition,
      asset_type_name: item.asset_type?.name || 'Unknown'
    })
  );
  // console.log(newData[1].asset_type_name)

    return newData

  }
  useEffect(() => {
    const loadData = async () => {
      const newData = await fetchData();
      setdata(newData);
      
    };

    loadData();
  }, []);


  return (

    <>
    <ImageBackground
      source={require('./../assets/Pulse-mobile.png')}
      resizeMode='cover'
      style={styles.container}
      imageStyle={styles.image}
    >
    
        <StatusBar backgroundColor='transparent'
            translucent={true}
            />
            
   
      <InnerContainer>
      <PageLogo
          resizeMode="cover"
          source={require('./../assets/images/civicly-remove.png')}
        />
        <WelcomeContainer>
      <StyledFormArea>
       
      <Container>
      
     
        <RightCornerContainer>
          <LeftIcon>
            <AntDesign name='user' size={23} color='green' />
          </LeftIcon>
          <TenantTitle>{itemName}</TenantTitle>
        </RightCornerContainer>
        <ScrollView contentContainerStyle={styles2.container}>
        <AssetTitle>Assets</AssetTitle>
        
      

        
          
      {data.map((item, index) => (
        <ItemCard
          key={index}
          name={item.name}
          status={item.status}
          condition={item.condition}
          imageUrl={item.asset_uploads.length > 0 ? item.asset_uploads[0].file : 'https://via.placeholder.com/100'}
          assetTypeName={item.asset_type_name}
        />
      ))}
       
    
       </ScrollView>
      </Container>
      
  
    </StyledFormArea>
    
    </WelcomeContainer>
    </InnerContainer>
  
  
      </ImageBackground>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  image: {
    opacity: 0.7
  }
});


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
// });
const styles2 = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    // alignItems: 'center', // Center the items horizontally
    // justifyContent: 'center',
    
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
});




     export default AssetsPage
   
