import React, { useEffect, useState, useCallback } from "react";
import { FlatList, SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";

const AssetTypeSearch = () => {
  const [filterData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const fetchPosts = () => {
    const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJraWQiOiJVa3l3YXdaVGRVMXp1ejZXU05NdXVxOUliQUJGWGQ1QVp2MWU3alM0YVRzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1NjQyNDIyNC0yMGYxLTcwNmEtOTUzMC1mODc4MzA5ZWFjZGUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl95d2k1TENpanEiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI1Y2FjYWdiNjJnNGhhZzNsMXRmYmo3ZDZlZiIsIm9yaWdpbl9qdGkiOiIxYWI3YzM4NS0wNzU0LTRkN2EtYTIyNS00MzVkYTQzMjQzMWMiLCJldmVudF9pZCI6ImNmNmQ0NGZjLWI4ZjItNDA5OC1hOWIxLTgzZTRkYTYzODNlMSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE3MTkzMTE1MTMsImV4cCI6MTcxOTM5NzkxMywiaWF0IjoxNzE5MzExNTEzLCJqdGkiOiJkZDIyOGQ3Yy0zM2M3LTRiMzAtYmViNS1lNmQyMjVmOTdmNjQiLCJ1c2VybmFtZSI6IjU2NDI0MjI0LTIwZjEtNzA2YS05NTMwLWY4NzgzMDllYWNkZSJ9.sCfs52JQr_xVsW2_m8XcLd4Vdjb8ikipYD5_WkANt0ca_v-0G-S7ds8TWZChFqgZTQKtPi_UZZscpRzbaLykQ9I8L-EZJamIxH9apt7nzQvV8WPOtwc-HULXnQYUzEX27R53oXfm3g3ha5Vo0TOjnk0QsZkLyqGgjz8s1IuHZNIdZwPY8JxBrRGQWyCZawl1t3Bbyz0St5jvHFXu0VgAsyviPjTWV2Jy8vNmDsIUjPXlQ0mcN0FI-Au0MlYzFZtOkF0iIRwdB1C2wHxGXXwxmLK4aJhHoBU109JITtfL79oUVfFYAGG7JraKxUJ7eaCVSRLtBXx2OX9Aap_tc_0nOw");

const raw = "";

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};


    setLoading(true);
    const apiURL = "https://api.dev.nonprod.civic.ly/assets/asset-type"; // Replace with your actual API URL
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

  const searchFilter = (text) => {
    setSearch(text);
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      newData.sort((a, b) => a.name.localeCompare(b.name)); // Sort the filtered data alphabetically
      setFilteredData(newData);
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

  useEffect(() => {
    fetchPosts();
    return () => { }
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:"white" }}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          value={search}
          placeholder="Search and select asset type"
          underlineColorAndroid="transparent"
          onChangeText={(text) => searchFilter(text)}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
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
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop:70
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
  },
  textInputStyle: {
    height: 60,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 10,
    borderColor: "#009688",
    backgroundColor: "white",
    
  }
})

export default AssetTypeSearch;