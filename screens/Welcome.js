import React, { useContext, useState } from "react";
import { Alert, StatusBar, ImageBackground, StyleSheet, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { LogInContext } from "../navigators/RootStack";
import config from "../src/config";
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  WelcomeContainer,
  Colors
} from '../components/stylesWelcome';

const { darkLight, primary, green } = Colors;

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles2.item, { backgroundColor }]}>
    <Text style={[styles2.title, styles2.itemText, { color: textColor }]}>{item.title}</Text>
  </TouchableOpacity>
);

const Welcome = ({ route }) => {
  const setIsUser = useContext(LogInContext);
  const navigation = useNavigation();
  const email = route.params?.email;

  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [loading, setLoading] = useState(true);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? green : primary;
    const color = item.id === selectedId ? 'white' : 'black';

    const handlePress = (item) => {
      navigation.navigate('AssetsPage', { itemId: item.id, itemName: item.title });
    };

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          handlePress(item);
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setIsUser(false);
      setTimeout(() => navigation.navigate('Login'), 500);
    } catch (error) {
      Alert.alert('Oops', error.message);
    }
  };

  const fetchAuthData = async () => {
    try {
      const currentUser = await getCurrentUser();
      const session = await fetchAuthSession({ forceRefresh: true });
      if (!session || !session.tokens) throw new Error('Session tokens are undefined');

      const idToken = session.tokens.idToken.toString();
      const accessToken = session.tokens.accessToken.toString();

      console.log(`Access Token: ${accessToken}`);
    } catch (error) {
      Alert.alert('Oops', error.message);
      console.error('Error fetching auth session', error);
    }
  };

  const getTenants = async () => {
    setLoading(true); // Start loading indicator
    setData([]); // Clear previous data
    try {
      const session = await fetchAuthSession({ forceRefresh: true });
      if (!session || !session.tokens) throw new Error('Session tokens are undefined');

      const accessToken = session.tokens.accessToken.toString();
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch("https://api.dev.nonprod.civic.ly/core/user/tenant", requestOptions);
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
      setLoading(false); // Stop loading indicator
    }
  };

  const createTenant = async () => {
    try {
      const session = await fetchAuthSession({ forceRefresh: true });
      const accessToken = session.tokens.accessToken.toString();

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "subdomain": "hogwarts",
        "name": "Hogwarts tenant ",
        "address": "Accra",
        "longitude": "11.3232",
        "latitude": "53.343"
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch("https://api.dev.nonprod.civic.ly/core/user/tenant/", requestOptions);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      Alert.alert('Oops', error.message);
      console.error('Error creating tenant', error);
    }
  };

  // Using useFocusEffect to fetch data when the screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      fetchAuthData();
      getTenants();
    }, [])
  );

  return (
    <ImageBackground
      source={require('./../assets/Pulse-mobile.png')}
      resizeMode='cover'
      style={styles.container}
      imageStyle={styles.image}
    >
      <StatusBar backgroundColor='transparent' translucent={true} />
      <InnerContainer>
        <PageLogo
          resizeMode="cover"
          source={require('./../assets/images/civicly-remove.png')}
        />
        <WelcomeContainer>
          <StyledFormArea>
            <PageTitle welcome={true}>Welcome</PageTitle>
            <SubTitle welcome={true}>{JSON.stringify(email)}</SubTitle>
            <SubTitle welcome={true}>Select Organisation</SubTitle>
            {loading ? (
              <ActivityIndicator size="large" color={primary} />
            ) : (
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
              />
            )}
            <StyledButton onPress={createTenant}>
              <ButtonText>Create tenant</ButtonText>
            </StyledButton>
            <StyledButton onPress={handleLogout}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    opacity: 0.7
  }
});

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: primary,
    borderWidth: 1,
  },
  itemText: {
    fontSize: 19,
  },
});

export default Welcome;
