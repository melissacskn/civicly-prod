
import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, Modal, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Mapbox from '@rnmapbox/maps';
import { AssetContext } from '../components/AssetContext';
import { TenantContext } from '../components/TenantContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
Mapbox.setAccessToken('sk.eyJ1IjoiY2l2aWNseSIsImEiOiJjbHk4a3NjcmcwZGxzMmpzYnA5dGw4OWV1In0.oCECiSHLJO6qnEzyBmQoNw');

// Helper function to group assets by location
const groupAssetsByLocation = (assets) => {
  const grouped = assets.reduce((acc, asset) => {
    const key = `${asset.latitude}-${asset.longitude}`;
    if (!acc[key]) {
      acc[key] = { ...asset, count: 1, assets: [asset] };
    } else {
      acc[key].count += 1;
      acc[key].assets.push(asset);
    }
    return acc;
  }, {});

  return Object.values(grouped);  // Return grouped assets as an array
};

const AssetMap = () => {
  const { assets, loading, fetchAssets } = useContext(AssetContext);  // Use context to get assets and loading state
  const { tenantId } = useContext(TenantContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState([]);

  // Fetch assets when the map screen is focused
  useFocusEffect(
    useCallback(() => {
      if (tenantId) {
        fetchAssets(tenantId);  // Fetch assets when tenantId is available
      }
    }, [tenantId])
  );

  // Handle circle press to show modal
  const handleCirclePress = (assetsInGroup) => {
    setSelectedAssets(assetsInGroup);
    setModalVisible(true);
  };

  // Render grouped assets on the map
  const groupedAssets = groupAssetsByLocation(assets);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <View style={styles.mapContainer}>
      <Mapbox.MapView style={{ flex: 1 }}>
        <Mapbox.Camera zoomLevel={14} followUserLocation={true} />
        {groupedAssets.map((group, index) => (
          <Mapbox.PointAnnotation
            key={`group-${index}`}
            id={`group-${index}`}
            coordinate={[group.longitude, group.latitude]}
            onSelected={() => handleCirclePress(group.assets)}
          >
            <View style={styles.annotationContainer}>
              <Text style={styles.annotationText}>{group.count}</Text>
            </View>
          </Mapbox.PointAnnotation>
        ))}
      </Mapbox.MapView>

      {/* Modal to display assets at a selected location */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Assets at this location</Text>
            <ScrollView>
              {selectedAssets.map((asset, index) => (
                <View key={index} style={styles.assetItemContainer}>
                  <Image source={{ uri: asset.imageUrl }} style={styles.assetImage} />
                  <View style={styles.assetInfo}>
                    <Text style={styles.assetName}>{asset.name}</Text>
                    <Text style={styles.assetDetails}>Condition: {asset.condition}</Text>
                    <Text style={styles.assetDetails}>Status: {asset.status}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  annotationContainer: {
    height: wp('10%'),
    width: wp('10%'),
    backgroundColor: '#10B981', // Green color for the circle
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  annotationText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp('4%'),
    fontFamily:'PublicSans-Regular',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: wp('80%'),
    backgroundColor: 'white',
    borderRadius: wp('3%'),
    padding: wp('5%'),
  },
  modalTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
    textAlign: 'center',
    fontFamily:'PublicSans-Regular',
  },
  assetItemContainer: {
    flexDirection: 'row',
    marginBottom: hp('2%'),
    paddingBottom: hp('1%'),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  assetImage: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('2%'),
    marginRight: wp('4%'),
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    fontFamily:'PublicSans-Regular',
  },
  assetDetails: {
    fontSize: wp('3.5%'),
    color: '#555',
  },
  closeButton: {
    marginTop: hp('2%'),
    backgroundColor: '#10B981',
    paddingVertical: hp('1.5%'),
    borderRadius: wp('2%'),
  },
  closeButtonText: {
    color: 'white',
    fontSize: wp('4%'),
    textAlign: 'center',
    fontFamily:'PublicSans-Regular',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AssetMap;
