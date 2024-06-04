
import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, ImageBackground,StyleSheet,View, Text,FlatList,TouchableOpacity,Button} from "react-native";
import { signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import styled from 'styled-components';

import AntDesign from "react-native-vector-icons/AntDesign";
import Post from '../components/post';

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
  const [nameArray,setNameArray]=useState([])
  const [nana,setNana]=useState('')
  const [status,setStaus]=useState([])
  const [str,setstr]=useState("")

  const[typeAssest,setTypeAsset]=useState([])


  

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
    let ar=[]
    let sta=[]
    let assetTypes=[]
    let uplo=[]
     for(let i=0; i<count;i++){

      ar.push(jsonnn.results[i].name)
      sta.push(jsonnn.results[i].status)
      assetTypes.push (jsonnn.results[i].asset_type.name)
      uplo.push(jsonnn.results[i].asset_uploads.map(item => item.file));
    

    }

const urls = jsonnn.results[0].asset_uploads.map(item => item.file);
console.log(urls[0]);  // Access the second URL using its index
setstr(urls);
console.log(str)


    
    setNameArray(ar)
    setStaus(sta)
    setTypeAsset(assetTypes)

    console.log(nameArray[0])
    console.log(typeAssest[0])
    console.log(typeof(nameArray[0]))
    
    // setNana(nameArray[0])

  

   
    
     
}
const exampleData = {
  image: "https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?cs=srgb&dl=pexels-jonaskakaroto-736230.jpg&fm=jpg",
  assetType: typeAssest[0],
  name: nameArray[0],
  status: status[0],
  postImage:"https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?cs=srgb&dl=pexels-jonaskakaroto-736230.jpg&fm=jpg",
};

useEffect(() => {
    getAssets()
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
        <AssetTitle>Assets</AssetTitle>
        <Post
          image={exampleData.image}
          name={exampleData.name}
          assetType={exampleData.assetType}
          status={exampleData.status}
          postImage={exampleData.postImage}
        />
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
    justifyContent: 'center'
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





     export default AssetsPage
   
