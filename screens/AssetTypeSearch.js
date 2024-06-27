import React, { useEffect, useState, useCallback } from "react";
import { FlatList, SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { fetchAuthSession } from 'aws-amplify/auth';
import { useNavigation,useRoute } from '@react-navigation/native';
import AntDesign from "react-native-vector-icons/AntDesign"

const AssetTypeSearch = () => {
  const [filterData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();

  const route = useRoute();

  const fetchPosts =async () => {
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


    setLoading(true);
    const apiURL = "https://api.dev.nonprod.civic.ly/assets/asset-type/?search=Bin"; // Replace with your actual API URL
    fetch(apiURL,requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        setMasterData(responseJson.results);
        setLoading(false);
      }).catch((error) => {
        console.log("Error you have is: ", error);
        setLoading(false);
      });
  }
  catch(error) {
    console.log("Error you have is: ", error);
  }
}

  const searchFilter = (text) => {
    setSearch(text);
    if (text) {
        const newData =  masterData && masterData.filter((item) => {
        const itemData = (item.name ? item.name.toUpperCase() : '') +
        (item.asset_category.name ? item.asset_category.name.toUpperCase() : '') +
        (item.asset_category.parent.name ? item.asset_category.parent.name.toUpperCase() : '');
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      if(newData){
      newData.sort((a, b) => a.name.localeCompare(b.name)); // Sort the filtered data alphabetically
      setFilteredData(newData);
      
    } else {
      setFilteredData([]);
    }
  } else {
    setFilteredData([]);
  }
}

    const selectItem = (item) => {
        setSearch(item.name);
        setFilteredData([]);
        if (!selectedItems.some(selected => selected.name === item.name)) {
          setSelectedItems([...selectedItems, item]);
        }
        navigation.navigate('CreateAsset2', {selectedAsset: item });
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

  const ItemSeparatorView = () => {
    return (
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }}></View>
    );
  }

  const getItemLayout = (data, index) => (
    { length: 70, offset: 70 * index, index }
  );
  const clearSearch = () => {
    setSearch('');
    setFilteredData(masterData); // Reset to master data when search is cleared
  };

  useEffect(() => {
    fetchPosts();
    return () => { }
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.sectionStyle}>
          <AntDesign name="search1" size={14} color="#000" />
          <TextInput
            style={{ flex: 1 }}
            value={search}
            placeholder="Search and select asset type"
            placeholderTextColor="#999"
            underlineColorAndroid="transparent"
            onChangeText={(text) => searchFilter(text)}
          />
          {search ? (
            <TouchableOpacity onPress={clearSearch}>
              <AntDesign name="close" size={20} color="#000" />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.loadingContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="green" />
          ) : null}
        </View>
        <FlatList
          data={search ? filterData : selectedItems}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({ item }) => (
            search ?
              <MemoizedItemView item={item} /> :
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
          )}
          getItemLayout={getItemLayout}
        />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    paddingTop:80,
  },
  itemContainer: {
    padding: 15,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#999'
  },
  itemSubtitle: {
    fontSize: 14,
    color: 'gray',
  },
 
   sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    margin: 15,
    marginHorizontal:5,
    paddingLeft:4, //Search Icon is starts with a bit space between the textfield and the icon
    paddingRight:4 //Cancel Icon is ends with a bit space between the textfield and the icon
  },
  loadingContainer: {
    height: 40, // Fixed height to prevent layout shift
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  }
)

export default AssetTypeSearch;