import React, { useState, useEffect ,useContext} from "react";
import { Alert, Text, FlatList, TouchableOpacity, View, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import { fetchAuthSession } from 'aws-amplify/auth';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TenantContext } from "../components/TenantContext";
import config from "../src/config";

const Colors = {
  primary: "#ffffff",
  secondary: "#E5E7EB",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  green: 'rgb(0, 168, 84)',
  red: "#EF4444",
  black: "#000000",
  lightGreen:"rgba(209, 232, 217, 0.61)"
};

const ListingTenants = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setTenantName, setTenantId } = useContext(TenantContext); // Get the setter functions from the context
  const getTenants = async () => {
    try {
      const session = await fetchAuthSession({ forceRefresh: true });
      const accessToken = session.tokens.accessToken.toString();
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${config.CORE_BASE_URL_DEV}/user/tenant`, requestOptions);
      const json = await response.json();
      const newData = json.results.map((item) => ({
        id: item.id,
        title: item.name,
      }));

      setData(newData);
    } catch (error) {
      Alert.alert('Oops', error.message);
      console.error('Error fetching tenants', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTenants();
  }, []);
  const handleTenantSelect = (item) => {
    // console.log('Selected Tenant ID:', item.id, 'Tenant Name:', item.title);  // Verify tenant selection
    
    // Set the global tenantName and tenantId
    setTenantName(item.title);
    setTenantId(item.id);

    navigation.navigate('MainDrawer');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.tenantItem} 
      onPress={() => handleTenantSelect(item)}>
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>
          {item.title.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.tenantTextContainer}>
        <Text style={styles.tenantTitle}>{item.title}</Text>
      </View>
      <AntDesign name="right" size={20} color={Colors.tertiary} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
     
      {loading ? (
        <ActivityIndicator size="large" color={Colors.green} />

      ) : (
        
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContentContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContentContainer: {
    width: '85%',
    paddingVertical: hp('10%'),
  },
  tenantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: wp('4%'),
    marginBottom: hp('1.5%'),
    borderRadius: wp('2%'),
    borderWidth: 1,
    borderColor: Colors.darkLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    width: '90%', // Ensure the item doesn't occupy full width
    alignSelf: 'center',
    justifyContent: 'space-between', // Ensure space between icon, name, and arrow
  },
  iconContainer: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: Colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
  },
  iconText: {
    fontSize: wp('5%'),
    color: Colors.green,
    fontFamily: 'PublicSans-SemiBold',
  },
  tenantTextContainer: {
    flex: 1, // Ensure the tenant name container takes available space
    justifyContent: 'center', // Vertically center text
   
  },
  tenantTitle: {
    fontSize: wp('5%'),
    color: Colors.tertiary,
    textAlign: 'left', // Ensure tenant name is aligned to the left
    fontFamily: 'PublicSans-Regular',
  },
});

export default ListingTenants;
