

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
import config from '../src/config';

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

      const response = await fetch(`${config.ASSET_BASE_URL_DEV}/assets/${tenantId}/asset/${assetId}`, requestOptions);
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
                  <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('CreateAsset2')} // Navigate to CreateAsset2
      >
       
       <AntDesign name="plus" size={23} color="white" />

       
      </TouchableOpacity>
         
          </View>
        </View>
      </View>
    </>
  );
};

export default AssetsPage;
