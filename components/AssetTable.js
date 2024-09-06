import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native';
import { AssetContext } from './AssetContext';
import { TenantContext } from '../components/TenantContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native'; // Import navigation
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../components/stylesSignUp';  
const AssetTable = () => {
  const { assets, loading, fetchAssets } = useContext(AssetContext);
  const { tenantId } = useContext(TenantContext);  // Get tenantId from context
  const navigation = useNavigation(); // Initialize navigation


  useEffect(() => {
    if (tenantId) {
      fetchAssets(tenantId);
    }
  }, [tenantId]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        <View style={[styles.conditionIndicator, getConditionIndicatorStyle(item.condition)]} />
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.assetNameContainer}>
              <Text style={styles.assetName}>{item.name}</Text>
              <Text style={styles.assetType}>{item.asset_type_name}</Text>
            </View>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.assetImageContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.assetImage} />
            <View style={styles.statusConditionBelow}>
                <Text style={[styles.status, getStatusStyle(item.status)]}>{item.status}</Text>
                <Text style={[styles.condition, getConditionStyle(item.condition)]}>{item.condition}</Text>
              </View>
            </View>
            <View style={styles.assetDetails}>
              <Text style={styles.detailText}>{item.main_category}</Text>
              <Text style={styles.detailText}>{item.sub_category}</Text>
              <Text style={styles.detailText}>Current Value: £{item.purchase_value.toFixed(2)}</Text>
              <Text style={styles.detailText}>Insurance Value: £{item.insurance_value.toFixed(2)}</Text>
              {/* <Text style={styles.boldDetailText}>Last Inspection: {item.last_inspection_date || 'N/A'}</Text>
              <Text style={styles.boldDetailText}>Next Inspection: {item.next_inspection_date || 'N/A'}</Text>
               */}
               <Text style={styles.boldDetailText}>
  Last Inspection: {item.last_inspection_date ? new Date(item.last_inspection_date).toLocaleDateString() : 'N/A'}
</Text>
<Text style={styles.boldDetailText}>
  Next Inspection: {item.next_inspection_date ? new Date(item.next_inspection_date).toLocaleDateString() : 'N/A'}
</Text>

             
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={assets}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('CreateAsset2')} // Navigate to CreateAsset2
      >
       
       <AntDesign name="plus" size={23} color="white" />

       
      </TouchableOpacity>
    </View>
  );
};

const getStatusStyle = (status) => {
  switch (status.toLowerCase()) {
    case 'active':
      return styles.activeStatus;
    case 'inactive':
      return styles.inactiveStatus;
    case 'draft':
      return styles.draftStatus;
    default:
      return styles.defaultCondition;
  }
};

const getConditionStyle = (condition) => {
  switch (condition.toLowerCase()) {
    case 'good':
      return styles.goodCondition;
    case 'fair':
      return styles.fairCondition;
    case 'poor':
      return styles.poorCondition;
    case 'new':
      return styles.newCondition;
    default:
      return styles.defaultCondition;
  }
};

const getConditionIndicatorStyle = (condition) => {
  switch (condition.toLowerCase()) {
    case 'good':
      return { backgroundColor: 'rgb(0, 168, 84)' }; // Green
    case 'fair':
      return { backgroundColor: 'rgb(255, 191, 0)' }; // Yellow
    case 'poor':
      return { backgroundColor: 'rgb(240, 65, 52)' }; // Red
    case 'new':
      return { backgroundColor: 'rgb(0, 162, 174)' }; // Blue
    default:
      return { backgroundColor: '#e2e3e5' }; // Gray
  }
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 50,
  },
  cardContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  conditionIndicator: {
    width: wp('2%'), // Width of the colored indicator bar
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  assetNameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  assetName: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    maxWidth: wp('60%'), // Set a max width to prevent overlap
    fontFamily: 'PublicSans-SemiBold',
  },
  assetType: {
    fontSize: wp('3.5%'),
    color: '#666',
    marginTop: hp('0.5%'), // Place it on the next line with a margin
    fontFamily: 'PublicSans-Regular',
  },
  cardBody: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  assetImage: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: 8,
    marginRight: 16,
  },
  assetDetails: {
    flex: 1,
  },
  detailText: {
    fontSize: wp('3.5%'),
    color: '#444',
    marginBottom: 4,
    fontFamily: 'PublicSans-Regular',
  },
  boldDetailText: {
    fontSize: wp('3.5%'),
    fontFamily: 'PublicSans-SemiBold',
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#444',
  },
  status: {
    fontSize: wp('3.5%'),
    color: 'gray',
    marginTop: hp('0.5%'),
    fontFamily: 'PublicSans-Regular',
   
  },
  condition: {
    fontSize: wp('3.5%'),
    color: 'gray',
    marginTop: hp('0.5%'),
    marginRight: wp('2%'),
    fontFamily: 'PublicSans-Regular',
  
  },
  statusContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('0.5%'),
  },
  goodCondition: {
    backgroundColor: 'rgb(0, 168, 84)',
    color: 'white',
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('2%'),
    borderRadius: wp('2%'),
    textAlign: 'center',
  },
  newCondition: {
    backgroundColor: 'rgb(0, 162, 174)',
    color: '#004085',
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('2%'),
    borderRadius: wp('2%'),
    textAlign: 'center',
  },
  fairCondition: {
    backgroundColor: 'rgb(255, 191, 0)',
    color: 'white',
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('2%'),
    borderRadius: wp('2%'),
    textAlign: 'center',
  },
  poorCondition: {
    backgroundColor: 'rgb(240, 65, 52)',
    color: 'white',
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('2%'),
    borderRadius: wp('2%'),
    textAlign: 'center',
  },
  defaultCondition: {
    backgroundColor: '#e2e3e5',
    color: 'white',
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('2%'),
    borderRadius: wp('2%'),
    textAlign: 'center',
  },
  activeStatus: {
    color: 'green',
    backgroundColor: '#e0fce4',
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('2%'),
    borderRadius: wp('2%'),
    textAlign: 'center',
  },
  inactiveStatus: {
    color: 'red',
    backgroundColor: '#fce4e4',
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('2%'),
    borderRadius: wp('2%'),
    textAlign: 'center',
  },
  draftStatus: {
    color: 'rgb(140, 140, 140)',
    backgroundColor: 'rgb(217, 217, 217)',
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('2%'),
    borderRadius: wp('2%'),
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('7.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: 'rgb(0, 168, 84)', // Green background color
   
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assetImageContainer: {
    flexDirection: 'column', // Align image and status/condition vertically
    alignItems: 'center', // Center them horizontally
    marginBottom: 10,
  },
  statusConditionBelow: {
    flexDirection: 'column', // Keep status and condition in a row
    justifyContent: 'space-between', // Separate status and condition evenly
    alignItems: 'center',
  
    marginTop: 10, // Add some space between image and text
  },

});

export default AssetTable;
