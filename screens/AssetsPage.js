
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
   
    const newData = jsonnn.results.map((item) => {
      const coordinates = item.asset_location?.features[0]?.geometry?.coordinates || [null, null];
      return {
        id: item.id,
        name: item.name,
        asset_uploads: item.asset_uploads,
        status: item.status,
        condition: item.condition,
        asset_type_name: item.asset_type?.name || 'Unknown',
        latitude: coordinates[1],  // Extracted latitude
        longitude: coordinates[0], // Extracted longitude
      };
    });
    return newData;

  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
};
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
    navigation.navigate("CreateAsset2",{tenantid:itemId,assetData:data});
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
    
      
     
     
         
      <LeftCornerContainer>
        <AssetTitle>Assets</AssetTitle>
        
        <TouchableOpacity onPress={handlePressAddButton} style={styles.iconButton}>
        <AntDesign name="pluscircleo" size={23} color="black" />
      </TouchableOpacity>
      
      </LeftCornerContainer>
      
       
        
        
      
       
        
      
     
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
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
 
  
});


const styles2 = StyleSheet.create({
 
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
   