// import React, { useEffect, useState, useCallback } from 'react';
// import { Alert, StatusBar, StyleSheet, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { fetchAuthSession } from 'aws-amplify/auth';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// import ItemCard from '../components/itemCard';
// import {
//   InnerContainer,
//   PageLogo,
//   StyledFormArea,
//   Container,
//   LeftCornerContainer,
//   AssetTitle,
//   WelcomeContainer,
//   Colors,
// } from '../components/stylesAssetsPage';

// const { darkLight, primary, green, black } = Colors;

// const AssetsPage = ({ route }) => {
//   const navigation = useNavigation();
//   const { itemId } = route.params;
//   const [tenantId, setTenantId] = useState(itemId);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const session = await fetchAuthSession({ forceRefresh: true });
//       const accessToken = session.tokens.accessToken.toString();
//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${accessToken}`);

//       const requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow",
//       };

//       const response = await fetch(`https://api.dev.nonprod.civic.ly/assets/${itemId}/asset/`, requestOptions);
//       const json = await response.json();
//       console.log("Response JSON:", json);

//       const newData = json.results.map((item) => {
//         const coordinates = item.asset_location?.features[0]?.geometry?.coordinates || [null, null];
//         return {
//           id: item.id,
//           name: item.name,
//           asset_uploads: item.asset_uploads,
//           status: item.status,
//           condition: item.condition,
//           asset_type_name: item.asset_type?.name || 'Unknown',
//           latitude: coordinates[1],
//           longitude: coordinates[0],
//           asset_type_id: item.asset_type?.id || 0
//         };
//       });
//       setData(newData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchData();
//     }, [])
//   );

//   const handlePressAddButton = () => {
//     console.log('Icon pressed!');
//     navigation.navigate("CreateAsset2", { tenantid: itemId, assetData: data });
//   };

//   const handlePressDeleteButton = (assetId) => {
//     Alert.alert(
//       "Are you sure you want to delete?",
//       "This action cannot be undone.",
//       [
//         {
//           text: "Cancel",
//           onPress: () => console.log("Cancel Pressed"),
//           style: "cancel"
//         },
//         {
//           text: "Delete",
//           onPress: () => deleteAsset(assetId)
//         }
//       ],
//       { cancelable: false }
//     );
//   };

//   const deleteAsset = async (assetId) => {
//     try {
//       const session = await fetchAuthSession({ forceRefresh: true });
//       const accessToken = session.tokens.accessToken.toString();
  
//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${accessToken}`);
  
//       const requestOptions = {
//         method: "DELETE",
//         headers: myHeaders,
//         redirect: "follow"
//       };
  
//       // Perform the DELETE request
//       const response = await fetch(`https://api.dev.nonprod.civic.ly/assets/${tenantId}/asset/${assetId}`, requestOptions);
      
//       if (!response.ok) {
//         // Log response status and status text for debugging
//         const errorText = await response.text();
//         console.error(`HTTP Error: ${response.status} ${response.statusText}`);
//         throw new Error(errorText);
//       }
      
     
      
//       // Fetch the updated data
//       await fetchData();
//     } catch (error) {
//       console.error('Error deleting the asset:', error);
//     }
//   };

//   const handlePressEditButton = (assetItem) => {
//     console.log(assetItem);
//     navigation.navigate("EditingAssets", { tenantId: tenantId, asset: assetItem });
//   };

//   const renderItem = ({ item }) => (
//     <ItemCard
//       onEdit={() => handlePressEditButton(item)}
//       onDelete={() => handlePressDeleteButton(item.id)}
//       key={item.id}
//       tenantId={itemId}
//       assetId={item.id}
//       name={item.name}
//       status={item.status}
//       imageUrl={item.asset_uploads.length > 0 ? item.asset_uploads[0].file : 'https://via.placeholder.com/100'}
//       assetTypeName={item.asset_type_name}
//       condition={item.condition}
//       assetTypeId={item.asset_type_id}
//     />
//   );

//   if (loading) {
//     return (
//       <View style={styles.containerForLoading}>
//         <ActivityIndicator size="large" color='green' />
//       </View>
//     );
//   }

//   return (
//     <>
//       <StatusBar backgroundColor='white' translucent={true} barStyle={'dark-content'} />
//       <InnerContainer>
//         <PageLogo source={require('./../assets/images/civicly-remove.png')} />
//         <WelcomeContainer>
//           <StyledFormArea>
//             <Container>
//               <LeftCornerContainer>
//                 <AssetTitle>Assets</AssetTitle>
//                 <TouchableOpacity onPress={handlePressAddButton} style={styles.iconButton}>
//                   <AntDesign name="pluscircleo" size={23} color="black" />
//                 </TouchableOpacity>
//               </LeftCornerContainer>
//               <FlatList
//                 data={data}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={renderItem}
//               />
//             </Container>
//           </StyledFormArea>
//         </WelcomeContainer>
//       </InnerContainer>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   iconButton: {
//     padding: 15,
//     marginTop: 10
//   },
//   containerForLoading: {
//     flex: 1,
//     justifyContent: 'center',
//   },
// });

// export default AssetsPage;

///////////PULL UP REFRESH FEAUTURE////////////
import React, { useEffect, useState, useCallback } from 'react';
import { Alert, StatusBar, StyleSheet, View, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { fetchAuthSession } from 'aws-amplify/auth';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import config from '../src/config';

import ItemCard from '../components/itemCard';
import {
  InnerContainer,
  PageLogo,
  StyledFormArea,
  Container,
  LeftCornerContainer,
  AssetTitle,
  WelcomeContainer,
  Colors,
} from '../components/stylesAssetsPage';

const { darkLight, primary, green, black } = Colors;

const AssetsPage = ({ route }) => {
  const navigation = useNavigation();
  const { itemId } = route.params;
  const [tenantId, setTenantId] = useState(itemId);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const session = await fetchAuthSession({ forceRefresh: true });
      const accessToken = session.tokens.accessToken.toString();
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(`https://api.dev.nonprod.civic.ly/assets/${itemId}/asset/`, requestOptions);
      const json = await response.json();
      console.log("Response JSON:", json);
      

      const newData = json.results.map((item) => {
        const coordinates = item.asset_location?.features[0]?.geometry?.coordinates || [null, null];
        const assetUploads = item.asset_uploads || [];
        // console.log(`Asset uploads for asset ${item.id}:`, assetUploads);
        const imageUrl = assetUploads.length > 0 ? assetUploads[0].medium_file_url : 'https://via.placeholder.com/100';
        // console.log(`Image URL for asset ${item.id}: ${imageUrl}`);
        return {
          id: item.id,
          name: item.name,
          asset_uploads: item.asset_uploads,
          status: item.status,
          condition: item.condition,
          asset_type_name: item.asset_type?.name || 'Unknown',
          latitude: coordinates[1],
          longitude: coordinates[0],
          asset_type_id: item.asset_type?.id || 0,
          imageUrl: imageUrl
        };
      });
      setData(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handlePressAddButton = () => {
    console.log('Icon pressed!');
    navigation.navigate("CreateAsset2", { tenantid: itemId, assetData: data });
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
          onPress: () => deleteAsset(assetId)
        }
      ],
      { cancelable: false }
    );
  };

  const deleteAsset = async (assetId) => {
    try {
      const session = await fetchAuthSession({ forceRefresh: true });
      const accessToken = session.tokens.accessToken.toString();
  
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
  
      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
      };
  
      const response = await fetch(`https://api.dev.nonprod.civic.ly/assets/${tenantId}/asset/${assetId}`, requestOptions);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP Error: ${response.status} ${response.statusText}`);
        throw new Error(errorText);
      }
      
      await fetchData();
    } catch (error) {
      console.error('Error deleting the asset:', error);
    }
  };

  const handlePressEditButton = (assetItem) => {
    console.log(assetItem);
    navigation.navigate("EditingAssets", { tenantId: tenantId, asset: assetItem });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);
  

  const renderItem = ({ item }) => (
    <ItemCard
      onEdit={() => handlePressEditButton(item)}
      onDelete={() => handlePressDeleteButton(item.id)}
      key={item.id}
      tenantId={itemId}
      assetId={item.id}
      name={item.name}
      status={item.status}
      imageUrl={item.imageUrl}
      assetTypeName={item.asset_type_name}
      condition={item.condition}
      assetTypeId={item.asset_type_id}
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
      <StatusBar backgroundColor='white' translucent={true} barStyle={'dark-content'} />
      <InnerContainer>
        <PageLogo source={require('./../assets/images/civicly-remove.png')} />
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
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
              />
            </Container>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
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
  iconButton: {
    padding: 15,
    marginTop: 10
  },
  containerForLoading: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default AssetsPage;

