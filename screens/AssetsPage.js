
import React, { useEffect, useState ,useMemo} from 'react';
import { Alert, StatusBar, ImageBackground,StyleSheet,View, Text,FlatList,TouchableOpacity,Button,ScrollView,ActivityIndicator} from "react-native";
import { signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import styled from 'styled-components';

import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';



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
  RightCornerContainer,
  LeftCornerContainer,
  RightIcon,
  

  
} from '../components/styles4';
// Colors
const { darkLight, primary, green,black } = Colors;

const AssetsPage = ({ route }) => {
  const navigation = useNavigation();
 

const { itemId, itemName } = route.params;
 const [count,setCount]=useState(0)
 const [loading, setLoading] = useState(false);
 
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
        setLoading(true);
        try {
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
    const newData = jsonnn.results.map((item) => ({
      id:item.id,
      name: item.name,
      asset_uploads: item.asset_uploads,
      status: item.status,
      condition:item.condition,
      asset_type_name: item.asset_type?.name || 'Unknown',

    })
  );
  return newData
}
catch (error) {
  console.error('Error fetching data:', error);
} finally {
  setLoading(false);
}
  // console.log(newData)
  // console.log(newData[0].name)
  // console.log(newData[0].id) ASSET'IN ID'SI ITEMCARD'A GONDEREBILIRSIN
 

  }
  useEffect(() => {
    const loadData = async () => {
      const newData = await fetchData();
      setdata(newData);
      
    };
    loadData();
  }, []);

  useEffect(()=>{

  },[data])

  const handlePressAddButton = () => {
    console.log('Icon pressed!');
    navigation.navigate("CreateAsset2");
    // Add your logic here
  };
  
  const handlePressDeleteButton = (assetId) => {
    Alert.alert(
      "Are you sure you want to delete?",
      "This action cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => deletePost(assetId)
        }
      ],
      { cancelable: false }
    );
  };


  const deletePost = async (assetId) => {
    setLoading(true);

   try{
    const session = await fetchAuthSession({ forceRefresh: true });
    const accessToken = session.tokens.accessToken.toString();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };

    // const response1 = fetch(`https://api.dev.nonprod.civic.ly/assets/${itemId}/asset/${assetId}`, requestOptions)
    // const json1 = await response1.json();
    // console.log(json1)
    fetch(`https://api.dev.nonprod.civic.ly/assets/${itemId}/asset/${assetId}`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

  console.log('Deleting post with assetId:', assetId); // Debug log
  // Call your API to delete the post
  // For example: await deletePostApi(assetId);

  // Remove the post from the state
  const newData = data.filter(item => item.assetId !== assetId);
  // console.log('Updated data:', newData); // Debug log
  setdata(newData);
  const newDataa = await fetchData();
  setdata(newDataa);
  }

 catch (error) {
    console.error('Error deleting the post:', error);
  }
  finally {
    setLoading(false);
  }


}
// useEffect(() => {
//   console.log('Data has been updated:');
//   // Any additional operations to handle after data update
// }, [data]);

    
  const handlePressEditButton = async (assetId) => {
    navigation.navigate("EditingAssets")
  
  };
  
  const renderItem = ({ item }) => (
    
    <ItemCard
      onEdit={handlePressEditButton}
      onDelete={() => handlePressDeleteButton(item.id)}
      key={item.id}

      tenantId={itemId}
      assetId={item.id}
      name={item.name}
      status={item.status}
      imageUrl={item.asset_uploads.length > 0 ? item.asset_uploads[0].file : 'https://via.placeholder.com/100'}
      assetTypeName={item.asset_type_name}
      condition={item.condition}
      
    />
  );

  if (loading) {
    return (
      <View style={styles.containerForLoading}>
        <ActivityIndicator size="large" color='green' />
      </View>
    );
  }

  return (

    <>
    {/* <ImageBackground
      source={require('./../assets/Pulse-mobile.png')}
      resizeMode='cover'
      style={styles.container}
      imageStyle={styles.image}
    > */}
    
        <StatusBar backgroundColor='white'
            translucent={true}
            barStyle={'dark-content'}
            />
            
   
      <InnerContainer>
       

      <PageLogo
         
          source={require('./../assets/images/civicly-remove.png')}
          
        />
     
        <WelcomeContainer>
      <StyledFormArea>
       
      <Container>
    
      
     
        {/* <RightCornerContainer>
          <LeftIcon>
            <AntDesign name='user' size={23} color='green' />
          </LeftIcon>
          <TenantTitle>{itemName}</TenantTitle>
        </RightCornerContainer> */}
         
      <LeftCornerContainer>
        <AssetTitle>Assets</AssetTitle>
        
        <TouchableOpacity onPress={handlePressAddButton} style={styles.iconButton}>
        <AntDesign name="pluscircleo" size={23} color="black" />
      </TouchableOpacity>
      
      </LeftCornerContainer>
      
       
        
        
      
        {/* {data.map((item, index) => (
        <ItemCard
          key={index}
          name={item.name}
          status={item.status}
          condition={item.condition}
          imageUrl={item.asset_uploads.length > 0 ? item.asset_uploads[0].file : 'https://via.placeholder.com/100'}
          assetTypeName={item.asset_type_name}
        />
      ))} */}
        
      
     
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          // renderItem={({ item }) => (
          //   <ItemCard
          //     key={item.id}

          //     renderItem={renderItem}
          //   />
          // )}
          // contentContainerStyle={styles.listContainer}
          />
        
      
      </Container>
      
  
    </StyledFormArea>
    
    </WelcomeContainer>
    </InnerContainer>
  
  
      {/* </ImageBackground> */}
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
  },
  iconButton: {
    padding: 15,
    marginTop:10
  
   
  },
  containerForLoading: {
    flex: 1,
    justifyContent: 'center',
  },
  // horizontal: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   padding: 10,
  // },

  // listContainer: {
  //   paddingBottom: 20,
  // },
  
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
  // container: {
  //   padding: 10,
  //   backgroundColor: '#f5f5f5',
  //   // alignItems: 'center', // Center the items horizontally
  //   // justifyContent: 'center',
    
  // },
  container: {
    flex: 1,
    padding: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
});




     export default AssetsPage
   