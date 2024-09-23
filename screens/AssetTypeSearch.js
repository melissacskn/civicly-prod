

import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Text, ActivityIndicator } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchAuthSession } from 'aws-amplify/auth';
import config from "../src/config";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const AssetTypeSearch = () => {
  const [filterData, setFilteredData] = useState([]);
  const [search, setSearch] = useState(''); // State to hold the user's search input
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { sourcePage, previousSelected } = route.params || {}; // Get sourcePage and previousSelected from route params

  // Function to fetch data from the API based on the search query
  const fetchPosts = async (searchParam) => {
    setLoading(true); // Set loading state to true
    try {
      const session = await fetchAuthSession({ forceRefresh: true });
      const accessToken = session.tokens.accessToken.toString();

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        body: "",
        redirect: "follow"
      };

      const response = await fetch(`${config.ASSET_BASE_URL_DEV}/asset-type/?search=${searchParam}`, requestOptions); // Fetch data from API with dynamic query
      const responseJson = await response.json();
      setFilteredData(responseJson.results); // Set the filtered data to be the API response
    } catch (error) {
      console.log("Error you have is: ", error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  useEffect(() => {
    if (previousSelected) {
      setFilteredData([previousSelected]);
    }
  }, [previousSelected]);

  useEffect(() => {
    if (search) {
      fetchPosts(search);
    } else if (previousSelected) {
      setFilteredData([previousSelected]);
    } else {
      setFilteredData([]);
    }
  }, [search, previousSelected]);

  const clearSearch = () => {
    setSearch(''); // Clear the search input
    if (previousSelected) {
      setFilteredData([previousSelected]); // Reset to previous selected item
    } else {
      setFilteredData([]); // Clear the data when search is cleared
    }
  };

  const selectItem = (item) => {
    navigation.navigate({
      name: sourcePage, // Specify the name of the screen to navigate to
      params: { selectedAsset: item },
    });
  };

  const MemoizedItemView = React.memo(({ item }) => (
    <TouchableOpacity onPress={() => selectItem(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>
          {item.name}
        </Text>
        <Text style={styles.itemSubtitle}>
          {item.asset_category?.name || 'Unknown Category'} - {item.asset_category?.parent?.name || 'Unknown Parent'}
        </Text>
      </View>
    </TouchableOpacity>
  ), (prevProps, nextProps) => prevProps.item === nextProps.item);

  const ItemSeparatorView = () => (
    <View style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }} />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor='transparent' translucent={true} barStyle={'dark-content'} />
      <View style={styles.container}>
        <View style={styles.sectionStyle}>
          <AntDesign name="search1" size={14} color="#000" />
          <TextInput
            style={{ flex: 1 ,fontFamily:'PublicSans-Regular'}}
            value={search} // Bind the search input to the search state
            placeholder="Search and select asset type"
            placeholderTextColor="#999"
            underlineColorAndroid="transparent"
            onChangeText={(text) => setSearch(text)} // Update the search state with user input
          />
          {search ? (
            <TouchableOpacity onPress={clearSearch}>
              <AntDesign name="close" size={20} color="#000" />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.loadingContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : null}
        </View>
        <FlatList
          data={filterData}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({ item }) => (
            <MemoizedItemView item={item} />
          )}
          getItemLayout={(data, index) => (
            { length: 70, offset: 70 * index, index }
          )}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('4%'), // Dynamic horizontal padding based on screen width
    backgroundColor: 'white',
    marginHorizontal: wp('2.5%'), // Dynamic horizontal margin based on screen width
    marginVertical: hp('1%'), // Dynamic vertical margin based on screen height
    paddingTop: hp('10%'), // Dynamic padding top based on screen height
  },
  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: wp('2%'), // Dynamic border radius based on screen width
    paddingHorizontal: wp('3%'), // Dynamic horizontal padding based on screen width
    marginBottom: hp('2%'), // Dynamic margin bottom based on screen height
},
input: {
  flex: 1,
  height: hp('5%'), // Dynamic height based on screen height
  fontSize: wp('4%'), // Dynamic font size based on screen width
  color: '#333',
},
  loadingContainer: {
    height: 40, // Fixed height to prevent layout shift
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemContainer: {
    paddingVertical: hp('2%'), // Dynamic vertical padding based on screen height
    paddingHorizontal: wp('4%'), // Dynamic horizontal padding based on screen width
},
itemTitle: {
    fontSize: wp('4.4%'), // Dynamic font size based on screen width
    fontFamily: 'PublicSans-Bold',
},
itemSubtitle: {
    fontSize: wp('3.4%'), // Dynamic font size based on screen width
    color: 'gray',
    fontFamily: 'PublicSans-Regular',
},
})

export default AssetTypeSearch;
