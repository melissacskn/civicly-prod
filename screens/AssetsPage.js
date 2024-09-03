// import React, { useEffect, useState, useCallback, useContext } from 'react';
// import { Alert, StatusBar, StyleSheet, View, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Image, Text } from 'react-native';
// import { fetchAuthSession } from 'aws-amplify/auth';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import config from '../src/config';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { AssetContext } from '../components/AssetContext';  // Import AssetContext
// import ItemCard from '../components/itemCard';
// import styles, { Colors } from '../components/stylesAssetsPage';
// import { TenantContext } from '../components/TenantContext';

// const { darkLight, primary, green, black } = Colors;

// const AssetsPage = () => {
//   const navigation = useNavigation();
//   const { tenantId } = useContext(TenantContext);  // Get tenantId from context
//   const { assets, setAssets } = useContext(AssetContext);  // Get assets and setAssets from AssetContext

//   const [loading, setLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   // Fetch asset data from the API
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

//       const response = await fetch(`https://api.dev.nonprod.civic.ly/assets/${tenantId}/asset/`, requestOptions);
//       const json = await response.json();
//       console.log("Response JSON:", json);

//       const newData = json.results.map((item) => {
//         const coordinates = item.asset_location?.features[0]?.geometry?.coordinates || [null, null];
//         const assetUploads = item.asset_uploads || [];
//         const imageUrl = assetUploads.length > 0 ? assetUploads[0].medium_file_url : 'https://via.placeholder.com/100';
//         return {
//           id: item.id,
//           name: item.name,
//           asset_uploads: item.asset_uploads,
//           status: item.status,
//           condition: item.condition,
//           asset_type_name: item.asset_type?.name || 'Unknown',
//           latitude: coordinates[1],
//           longitude: coordinates[0],
//           asset_type_id: item.asset_type?.id || 0,
//           imageUrl: imageUrl
//         };
//       });

//       setAssets(newData);  // Store fetched data in context
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   // Fetch data when screen is focused
//   useFocusEffect(
//     useCallback(() => {
//       fetchData();
//     }, [])
//   );

//   // Handle asset addition
//   const handlePressAddButton = () => {
//     navigation.navigate("CreateAsset2", { tenantid: tenantId, assetData: assets });
//   };

//   // Handle asset deletion
//   const handlePressDeleteButton = (assetId) => {
//     Alert.alert(
//       "Are you sure you want to delete?",
//       "This action cannot be undone.",
//       [
//         { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
//         { text: "Delete", onPress: () => deleteAsset(assetId) }
//       ],
//       { cancelable: false }
//     );
//   };

//   // Function to delete an asset
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

//       const response = await fetch(`https://api.dev.nonprod.civic.ly/assets/${tenantId}/asset/${assetId}`, requestOptions);
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`HTTP Error: ${response.status} ${response.statusText}`);
//         throw new Error(errorText);
//       }

//       await fetchData();  // Re-fetch data after deletion
//     } catch (error) {
//       console.error('Error deleting the asset:', error);
//     }
//   };

//   // Handle edit button press
//   const handlePressEditButton = (assetItem) => {
//     navigation.navigate("EditingAssets", { tenantId: tenantId, asset: assetItem });
//   };

//   // Handle refresh
//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchData();
//   }, []);

//   // Render asset item
//   const renderItem = ({ item }) => (
//     <ItemCard
//       onEdit={() => handlePressEditButton(item)}
//       onDelete={() => handlePressDeleteButton(item.id)}
//       key={item.id}
//       tenantId={tenantId}
//       assetId={item.id}
//       name={item.name}
//       status={item.status}
//       imageUrl={item.imageUrl}
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
//       <View style={styles.innerContainer}>
//         <Image
//           resizeMode="cover"
//           source={require('./../assets/images/civicly-remove.png')}
//           style={styles.pageLogo}
//         />
//         <View style={styles.welcomeContainer}>
//           <View style={styles.styledFormArea}>
//             <View style={styles.leftCornerContainer}>
//               <TouchableOpacity onPress={handlePressAddButton} style={styles.iconButton}>
//                 <AntDesign name="pluscircleo" size={23} color="black" />
//               </TouchableOpacity>
//             </View>
//             <FlatList
//               data={assets}  
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={renderItem}
//               refreshControl={
//                 <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//               }
//             />
//           </View>
//         </View>
//       </View>
//     </>
//   );
// };

// export default AssetsPage;

// import React, { useEffect, useState, useCallback, useContext } from 'react';
// import { View, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Image, Text } from 'react-native';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { AssetContext } from '../components/AssetContext';  // Import AssetContext
// import ItemCard from '../components/itemCard';
// import styles from '../components/stylesAssetsPage';
// import { TenantContext } from '../components/TenantContext';
// import { fetchAuthSession } from 'aws-amplify/auth';

// const AssetsPage = () => {
//   const navigation = useNavigation();
//   const { tenantId } = useContext(TenantContext);  // Get tenantId from context
//   const { assets, loading, fetchAssets,sortAssetsByName } = useContext(AssetContext);  // Get assets and fetchAssets from context

//   const [refreshing, setRefreshing] = useState(false);

//   useFocusEffect(
//     useCallback(() => {
//       if (tenantId) {
//         fetchAssets(tenantId)
//           .catch(error => console.error("Error fetching assets:", error));
//       }
//     }, [tenantId])
//   );

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchAssets(tenantId)
//       .then(() => setRefreshing(false))
//       .catch((error) => {
//         console.error('Error refreshing assets:', error);
//         setRefreshing(false);
//       });
//   }, [tenantId]);

//   const handlePressAddButton = () => {
//     navigation.navigate("CreateAsset2", { tenantid: tenantId });
//   };
  
//   // Handle edit button press
//   const handlePressEditButton = (assetItem) => {
//     navigation.navigate("EditingAssets", { tenantId: tenantId, asset: assetItem });
//   };
//     // Handle asset deletion
//   const handlePressDeleteButton = (assetId) => {
//     Alert.alert(
//       "Are you sure you want to delete?",
//       "This action cannot be undone.",
//       [
//         { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
//         { text: "Delete", onPress: () => deleteAsset(assetId) }
//       ],
//       { cancelable: false }
//     );
//   };
//     // Function to delete an asset
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

//       const response = await fetch(`https://api.dev.nonprod.civic.ly/assets/${tenantId}/asset/${assetId}`, requestOptions);
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`HTTP Error: ${response.status} ${response.statusText}`);
//         throw new Error(errorText);
//       }

//       await fetchData();  // Re-fetch data after deletion
//     } catch (error) {
//       console.error('Error deleting the asset:', error);
//     }
//   };


//   if (loading) {
//     return (
//       <View style={styles.containerForLoading}>
//         <ActivityIndicator size="large" color='green' />
//       </View>
//     );
//   }
//   const handleSortByName = () => {
//     sortAssetsByName();
//   };

//   const renderItem = ({ item }) => (
//     <ItemCard
//       onEdit={() => handlePressEditButton(item)}
//       onDelete={() => handlePressDeleteButton(item.id)}
//       key={item.id}
//       tenantId={tenantId}
//       assetId={item.id}
//       name={item.name}
//       status={item.status}
//       imageUrl={item.imageUrl}
//       assetTypeName={item.asset_type_name}
//       condition={item.condition}
//     />
//   );
//   const handlePressTableButton = () => {
//     navigation.navigate("AssetsTable");
//   };
//   return (
//     <>
//       <View style={styles.innerContainer}>
        
//         <View style={styles.welcomeContainer}>
//           <View style={styles.styledFormArea}>
//             <FlatList
//               data={assets}
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={renderItem}
//               refreshControl={
//                 <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//               }
//             />
//           </View>
//         </View>
//       </View>
//     </>
//   );
// };

// export default AssetsPage;

import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AssetContext } from '../components/AssetContext';
import ItemCard from '../components/itemCard';
import styles from '../components/stylesAssetsPage';
import { TenantContext } from '../components/TenantContext';
import { fetchAuthSession } from 'aws-amplify/auth';

const AssetsPage = () => {
  const navigation = useNavigation();
  const { tenantId } = useContext(TenantContext);
  const { assets, loading, fetchAssets, sortAssetsByName } = useContext(AssetContext);

  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (tenantId) {
        fetchAssets(tenantId)
          .catch(error => console.error("Error fetching assets:", error));
      }
    }, [tenantId])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAssets(tenantId)
      .then(() => setRefreshing(false))
      .catch((error) => {
        console.error('Error refreshing assets:', error);
        setRefreshing(false);
      });
  }, [tenantId]);

  const handlePressAddButton = () => {
    navigation.navigate("CreateAsset2", { tenantid: tenantId });
  };

  const handlePressEditButton = (assetItem) => {
    navigation.navigate("EditingAssets", { tenantId: tenantId, asset: assetItem });
  };

  const handlePressDeleteButton = (assetId) => {
    Alert.alert(
      "Are you sure you want to delete?",
      "This action cannot be undone.",
      [
        { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "Delete", onPress: () => deleteAsset(assetId) }
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

      await fetchData();  // Re-fetch data after deletion
    } catch (error) {
      console.error('Error deleting the asset:', error);
    }
  };


  if (loading) {
    return (
      <View style={styles.containerForLoading}>
        <ActivityIndicator size="large" color='green' />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <ItemCard
      onEdit={() => handlePressEditButton(item)}
      onDelete={() => handlePressDeleteButton(item.id)}
      key={item.id}
      tenantId={tenantId}
      assetId={item.id}
      name={item.name}
      status={item.status}
      imageUrl={item.imageUrl}
      assetTypeName={item.asset_type_name}
      condition={item.condition}
    />
  );

  return (
    <>
      <View style={styles.innerContainer}>
        <View style={styles.welcomeContainer}>
          <View style={styles.styledFormArea}>
            <FlatList
              data={assets}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default AssetsPage;
