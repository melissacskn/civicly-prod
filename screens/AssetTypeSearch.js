import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Text, ActivityIndicator } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchAuthSession } from 'aws-amplify/auth';

const AssetTypeSearch = () => {
  const [filterData, setFilteredData] = useState([]);
  const [search, setSearch] = useState(''); // State to hold the user's search input
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  // Function to fetch data from the API based on the search query
  const fetchPosts = async (searchParam) => {
    setLoading(true); // Set loading state to true
    try {
      const session = await fetchAuthSession({ forceRefresh: true });
      const accessToken = session.tokens.accessToken.toString();
      

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

const raw = "";

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

      const response = await fetch(`https://api.dev.nonprod.civic.ly/assets/asset-type/?search=${searchParam}`,requestOptions); // Fetch data from API with dynamic query
      const responseJson = await response.json();
      setFilteredData(responseJson.results); // Set the filtered data to be the API response
    } catch (error) {
      console.log("Error you have is: ", error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  }

  // useEffect(() => {
  //   if (route.params?.previousSelected) {
  //     setFilteredData([route.params.previousSelected]);
  //   }
  // }, [route.params?.previousSelected]);

  // // Trigger fetchPosts whenever the search state changes
  // useEffect(() => {
  //   if (search) {
  //     fetchPosts(search); // Call fetchPosts with the current search value
  //   } else {
  //     setFilteredData([]); // Clear data when search is empty
  //   }
  // }, [search]);

  useEffect(() => {
    if (route.params?.previousSelected) {
      setFilteredData([route.params.previousSelected]);
    }
  }, [route.params?.previousSelected]);

  useEffect(() => {
    if (search) {
      fetchPosts(search);
    } else if (route.params?.previousSelected) {
      setFilteredData([route.params.previousSelected]);
    } else {
      setFilteredData([]);
    }
  }, [search]);

  const clearSearch = () => {
    setSearch(''); // Clear the search input
    setFilteredData([]); // Clear the data when search is cleared
  };

  const selectItem = (item) => {
    navigation.navigate('CreateAsset2', { selectedAsset: item }); // Navigate to CreateAssets with the selected item
  }

  const MemoizedItemView = React.memo(({ item }) => (
    <TouchableOpacity onPress={() => selectItem(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>
          {item.name}
        </Text>
        <Text style={styles.itemSubtitle}>
          {item.asset_category.name} - {item.asset_category.parent.name}
        </Text>
      </View>
    </TouchableOpacity>
  ), (prevProps, nextProps) => prevProps.item === nextProps.item);

  const ItemSeparatorView = () => (
    <View style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }} />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.sectionStyle}>
          <AntDesign name="search1" size={14} color="#000" />
          <TextInput
            style={{ flex: 1 }}
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
          keyExtractor={(item, index) => `${item.name}-${index}`}
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
    padding: 16,
    backgroundColor: 'white',
    margin: 10,
    paddingTop:95,
  },
  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  loadingContainer: {
    height: 40, // Fixed height to prevent layout shift
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemContainer: {
    padding: 15,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 14,
    color: 'gray',
  }
})

export default AssetTypeSearch;
