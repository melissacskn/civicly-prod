// import React, { useContext, useState } from "react";
// import { Alert, StatusBar, ImageBackground, StyleSheet, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import { signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
// import { LogInContext } from "../navigators/RootStack";
// import config from "../src/config";
// import {
//   StyledContainer,
//   InnerContainer,
//   PageLogo,
//   PageTitle,
//   SubTitle,
//   StyledFormArea,
//   StyledButton,
//   ButtonText,
//   WelcomeContainer,
//   Colors
// } from '../components/stylesWelcome';


// const { darkLight, primary, green } = Colors;

// const Item = ({ item, onPress, backgroundColor, textColor }) => (
//   <TouchableOpacity onPress={onPress} style={[styles2.item, { backgroundColor }]}>
//     <Text style={[styles2.title, styles2.itemText, { color: textColor }]}>{item.title}</Text>
//   </TouchableOpacity>
// );

// const Welcome = ({ route }) => {
//   const setIsUser = useContext(LogInContext);
//   const navigation = useNavigation();
  

//   const [data, setData] = useState([]);
//   const [selectedId, setSelectedId] = useState();
//   const [loading, setLoading] = useState(true);
//   const [firstname, setFirstname] = useState('');
//   const [lastname, setLastname] = useState('');

//   const renderItem = ({ item }) => {
//     const backgroundColor = item.id === selectedId ? green : primary;
//     const color = item.id === selectedId ? 'white' : 'black';

//     const handlePress = (item) => {
//       navigation.navigate('AssetsPage', { itemId: item.id, itemName: item.title });
//     };

//     return (
//       <Item
//         item={item}
//         onPress={() => {
//           setSelectedId(item.id);
//           handlePress(item);
//         }}
//         backgroundColor={backgroundColor}
//         textColor={color}
//       />
//     );
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut();
//       setIsUser(false);
//       setTimeout(() => navigation.navigate('Login'), 500);
//     } catch (error) {
//       Alert.alert('Oops', error.message);
//     }
//   };

//   const fetchAuthData = async () => {
//     try {
      
//       const session = await fetchAuthSession({ forceRefresh: true });
//       if (!session || !session.tokens) throw new Error('Session tokens are undefined');

//       // const idToken = session.tokens.idToken.toString();
//       const accessToken = session.tokens.accessToken.toString();

//       console.log(`Access Token: ${accessToken}`);
//       const myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${accessToken}`);



//     const requestOptions = {
//       method: "GET",
//       headers: myHeaders,
//       redirect: "follow"
//     };
    
//     fetch("https://api.dev.nonprod.civic.ly/core/user/", requestOptions)
//       .then((response) => response.json()) // Parse the response as JSON
//       .then((result) => {
//         // Extract firstname and lastname from the result
//         const firstname = setFirstname(result.firstname);
//         const lastname = setLastname(result.lastname);
    
       
//       })
//       .catch((error) => console.error(error));
//     } catch (error) {
//       Alert.alert('Oops', error.message);
//       console.error('Error fetching auth session', error);
//     } 
    
//   };

//   const getTenants = async () => {
//     setLoading(true); // Start loading indicator
//     setData([]); // Clear previous data
//     try {
//       const session = await fetchAuthSession({ forceRefresh: true });
//       if (!session || !session.tokens) throw new Error('Session tokens are undefined');

//       const accessToken = session.tokens.accessToken.toString();
//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${accessToken}`);

//       const requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow"
//       };

//       const response = await fetch("https://api.dev.nonprod.civic.ly/core/user/tenant", requestOptions);
//       const json = await response.json();
//       const newData = json.results.map((item) => ({
//         id: item.id,
//         title: item.name,
//       }));

//       setData(newData);
//     } catch (error) {
//       Alert.alert('Oops', error.message);
//       console.error('Error fetching tenants', error);
//     } finally {
//       setLoading(false); // Stop loading indicator
//     }

    
//   };

//   // const createTenant = async () => {
//   //   try {
//   //     const session = await fetchAuthSession({ forceRefresh: true });
//   //     const accessToken = session.tokens.accessToken.toString();

//   //     const myHeaders = new Headers();
//   //     myHeaders.append("Authorization", `Bearer ${accessToken}`);
//   //     myHeaders.append("Content-Type", "application/json");

//   //     const raw = JSON.stringify({
//   //       "subdomain": "hogwarts",
//   //       "name": "Hogwarts tenant ",
//   //       "address": "Accra",
//   //       "longitude": "11.3232",
//   //       "latitude": "53.343"
//   //     });

//   //     const requestOptions = {
//   //       method: "POST",
//   //       headers: myHeaders,
//   //       body: raw,
//   //       redirect: "follow"
//   //     };

//   //     const response = await fetch("https://api.dev.nonprod.civic.ly/core/user/tenant/", requestOptions);
//   //     const result = await response.text();
//   //     console.log(result);
//   //   } catch (error) {
//   //     Alert.alert('Oops', error.message);
//   //     console.error('Error creating tenant', error);
//   //   }
//   // };

//   // Using useFocusEffect to fetch data when the screen gains focus
//   useFocusEffect(
//     React.useCallback(() => {
//       fetchAuthData();
//       getTenants();
//     }, [])
//   );
  

//   return (
//     <ImageBackground
//       source={require('./../assets/Pulse-mobile.png')}
//       resizeMode='cover'
//       style={styles.container}
//       imageStyle={styles.image}
//     >
//       <StatusBar backgroundColor='transparent' translucent={true} />
//       <InnerContainer>
//         <PageLogo
//           resizeMode="cover"
//           source={require('./../assets/images/civicly-remove.png')}
//         />
//         <WelcomeContainer>
//           <StyledFormArea>
//             <PageTitle style={styles.pageTitle} welcome={true}>Welcome</PageTitle>
//             <SubTitle style={styles.subTitle}  welcome={true}>{firstname} {lastname}</SubTitle>
//             <SubTitle style={styles.subTitle} welcome={true}>Select Organisation</SubTitle>
//             {loading ? (
//               <ActivityIndicator size="large" color={primary} />
//             ) : (
//               <FlatList
//                 data={data}
//                 renderItem={renderItem}
//                 keyExtractor={item => item.id}
//                 extraData={selectedId}
//               />
//             )}
//             {/* <StyledButton onPress={createTenant}>
//               <ButtonText>Create tenant</ButtonText>
//             </StyledButton> */}
//             <StyledButton onPress={handleLogout}>
//               <ButtonText>Logout</ButtonText>
//             </StyledButton>
//           </StyledFormArea>
//         </WelcomeContainer>
//       </InnerContainer>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   image: {
//     opacity: 0.7
//   },
//   pageTitle: {
//     fontSize: 20,
//     letterSpacing: 0.25,
//     padding: 10,
//     fontFamily: 'PublicSans-SemiBold', // Insert your fontFamily here
//   },
//   subTitle: {
//     fontSize: 15,
//     marginBottom: 20,
//     letterSpacing: 1,
//     color: '#1F2937', // Tertiary color
//     textAlign: 'left',
//     fontFamily: 'PublicSans-Regular', // Insert your fontFamily here
//   },


// });

// const styles2 = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   item: {
//     padding: 15,
//     marginVertical: 8,
//     backgroundColor: primary,
//     borderWidth: 1,
//   },
//   itemText: {
//     fontSize: 19,
//   },
// });

// export default Welcome;

// import React, { useContext, useState } from "react";
// import { Alert, StatusBar, ImageBackground, StyleSheet, Text, FlatList, TouchableOpacity, ActivityIndicator, View } from "react-native";
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import { signOut, fetchAuthSession } from 'aws-amplify/auth';
// import { LogInContext } from "../navigators/RootStack";
// import {
//   StyledContainer,
//   InnerContainer,
//   PageLogo,
//   PageTitle,
//   SubTitle,
//   StyledFormArea,
//   StyledButton,
//   ButtonText,
//   WelcomeContainer,
//   Colors
// } from '../components/stylesWelcome';

// const { darkLight, primary, green,tertiary } = Colors;

// const Welcome = ({ route }) => {
//   const setIsUser = useContext(LogInContext);
//   const navigation = useNavigation();

//   const [data, setData] = useState([]);
//   const [selectedId, setSelectedId] = useState();
//   const [loading, setLoading] = useState(true);
//   const [firstname, setFirstname] = useState('');
//   const [lastname, setLastname] = useState('');

//   const renderItem = ({ item }) => {
//     const backgroundColor = item.id === selectedId ? green : primary;
//     const color = item.id === selectedId ? 'white' : 'black';

//     const handlePress = (item) => {
//       navigation.navigate('AssetsPage', { itemId: item.id, itemName: item.title });
//     };

//     return (
//       <TouchableOpacity onPress={() => {
//         setSelectedId(item.id);
//         handlePress(item);
//       }} style={[styles.itemContainer, { backgroundColor }]}>
//         <View style={styles.iconContainer}>
//           <Text style={[styles.iconText, { color }]}>{item.title.charAt(0).toUpperCase()}</Text>
//         </View>
//         <Text style={[styles.itemTitle, { color }]}>{item.title}</Text>
//       </TouchableOpacity>
//     );
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut();
//       setIsUser(false);
//       setTimeout(() => navigation.navigate('Login'), 500);
//     } catch (error) {
//       Alert.alert('Oops', error.message);
//     }
//   };

//   const fetchAuthData = async () => {
//     try {
//       const session = await fetchAuthSession({ forceRefresh: true });
//       if (!session || !session.tokens) throw new Error('Session tokens are undefined');

//       const accessToken = session.tokens.accessToken.toString();
//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${accessToken}`);

//       const requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow"
//       };

//       fetch("https://api.dev.nonprod.civic.ly/core/user/", requestOptions)
//         .then((response) => response.json()) // Parse the response as JSON
//         .then((result) => {
//           setFirstname(result.firstname);
//           setLastname(result.lastname);
//         })
//         .catch((error) => console.error(error));
//     } catch (error) {
//       Alert.alert('Oops', error.message);
//       console.error('Error fetching auth session', error);
//     }
//   };

//   const getTenants = async () => {
//     setLoading(true);
//     setData([]);
//     try {
//       const session = await fetchAuthSession({ forceRefresh: true });
//       const accessToken = session.tokens.accessToken.toString();
//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${accessToken}`);

//       const requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow"
//       };

//       const response = await fetch("https://api.dev.nonprod.civic.ly/core/user/tenant", requestOptions);
//       const json = await response.json();
//       const newData = json.results.map((item) => ({
//         id: item.id,
//         title: item.name,
//       }));

//       setData(newData);
//     } catch (error) {
//       Alert.alert('Oops', error.message);
//       console.error('Error fetching tenants', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       fetchAuthData();
//       getTenants();
//     }, [])
//   );

//   return (
//     <ImageBackground
//       source={require('./../assets/Pulse-mobile.png')}
//       resizeMode='cover'
//       style={styles.container}
//       imageStyle={styles.image}
//     >
//       <StatusBar backgroundColor='transparent' translucent={true} />
//       <InnerContainer>
//         <PageLogo
//           resizeMode="cover"
//           source={require('./../assets/images/civicly-remove.png')}
//         />
//         <WelcomeContainer>
//           <StyledFormArea>
//             <View style={styles.profileContainer}>
//               <View style={styles.profileIconContainer}>
//                 <Text style={styles.profileIcon}>{firstname.charAt(0).toUpperCase()}</Text>
//               </View>
//               <Text style={styles.profileName}>{firstname} {lastname}</Text>
//             </View>
//             <SubTitle welcome={true} style={styles.subTitle}>Select Organisation</SubTitle>
//             {loading ? (
//               <ActivityIndicator size="large" color={primary} />
//             ) : (
//               <FlatList
//                 data={data}
//                 renderItem={renderItem}
//                 keyExtractor={item => item.id}
//                 extraData={selectedId}
//               />
//             )}
//             <StyledButton onPress={handleLogout}>
//               <ButtonText>Logout</ButtonText>
//             </StyledButton>
//           </StyledFormArea>
//         </WelcomeContainer>
//       </InnerContainer>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     opacity: 0.7,
//   },
//   profileContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   profileIconContainer: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#E5E7EB',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   profileIcon: {
//     fontSize: 20,
//     color: green,
//   },
//   profileName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: tertiary,
//   },
//   subTitle: {
//     fontSize: 15,
//     marginBottom: 20,
//     letterSpacing: 1,
//     fontWeight: 'bold',
//     color: tertiary,
//     textAlign: 'left',
//     fontFamily: 'PublicSans-Regular',
//   },
//   itemContainer: {
//     padding: 15,
//     marginVertical: 8,
//     backgroundColor: primary,
//     borderWidth: 1,
//     borderRadius: 8,
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   iconContainer: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#E5E7EB',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   iconText: {
//     fontSize: 20,
//     color: green,
//   },
//   itemTitle: {
//     fontSize: 16,
//     textAlign: 'left',
//   },
// });

// export default Welcome;

import React, { useContext, useState } from "react";
import { Alert, StatusBar, StyleSheet, Text, FlatList, TouchableOpacity, ActivityIndicator, View, Image } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { signOut, fetchAuthSession } from 'aws-amplify/auth';
import { LogInContext } from "../navigators/RootStack";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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


const { darkLight, primary, green, tertiary } = Colors;

const Welcome = ({ route }) => {
  const setIsUser = useContext(LogInContext);
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? green : primary;
    const color = item.id === selectedId ? 'white' : 'black';

    const handlePress = (item) => {
      setSelectedId(item.id);
      navigation.navigate('AssetsPage', { itemId: item.id, itemName: item.title });
    };

    return (
      <TouchableOpacity onPress={() => handlePress(item)} style={[styles.itemContainer, { backgroundColor }]}>
        <View style={styles.iconContainer}>
          <Text style={[styles.iconText, { color }]}>{item.title.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={[styles.itemTitle, { color }]}>{item.title}</Text>
      </TouchableOpacity>
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

      fetch("https://api.dev.nonprod.civic.ly/core/user/", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setFirstname(result.firstname);
          setLastname(result.lastname);
          setImageUrl(result.profile_image.image);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      Alert.alert('Oops', error.message);
      console.error('Error fetching auth session', error);
    }
  };

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
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setSelectedId(null);
      fetchAuthData();
      getTenants();
    }, [])
  );

  return (
    <StyledContainer>
      <StatusBar backgroundColor="white" barStyle="dark-content" translucent={true} />
      <InnerContainer>
        <PageLogo
          resizeMode="cover"
          source={require('./../assets/images/civicly-remove.png')}
        />
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="green" />
          </View>
        ) : (
          <WelcomeContainer>
            <StyledFormArea>
              <View style={styles.profileContainer}>
                <View style={styles.profileIconContainer}>
                  {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.profileImage} />
                  ) : (
                    <Text style={styles.profileIcon}>{firstname.charAt(0).toUpperCase()}</Text>
                  )}
                </View>
                <Text style={styles.profileName}>{firstname} {lastname}</Text>
              </View>
              <SubTitle style={styles.subTitle} welcome={true}>Select Organisation</SubTitle>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
              />
              <StyledButton onPress={handleLogout}>
                <ButtonText>Logout</ButtonText>
              </StyledButton>
            </StyledFormArea>
          </WelcomeContainer>
        )}
      </InnerContainer>
    </StyledContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('5%'), // Responsive horizontal padding
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'), // Responsive margin
  },
  profileIconContainer: {
    width: wp('10%'), // Responsive width
    height: wp('10%'), // Responsive height (same as width for square)
    borderRadius: wp('5%'), // Responsive border radius
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('2.5%'), // Responsive margin right
  },
  profileIcon: {
    fontSize: wp('5%'), // Responsive font size
    color: '#10B981', // Use color directly instead of variable for clarity
  },
  profileImage: {
    width: wp('13%'),  // Set the width as a percentage of the screen width
    height: wp('13%'), // Set the height equal to the width to keep it square
    borderRadius: wp('6.5%'), // Half of the width to make the image circular
  },
  profileName: {
    fontSize: wp('4.5%'), // Responsive font size
    fontWeight: 'bold',
    color: '#1F2937', // Use color directly instead of variable for clarity
  },
  subTitle: {
    fontSize: wp('4%'), // Responsive font size
    marginBottom: hp('2%'), // Responsive margin bottom
    letterSpacing: wp('0.25%'), // Responsive letter spacing
    fontWeight: 'bold',
    color: '#1F2937', // Use color directly instead of variable for clarity
    textAlign: 'left',
    fontFamily: 'PublicSans-Regular',
  },
  itemContainer: {
    padding: wp('3.5%'), // Responsive padding
    marginVertical: hp('1%'), // Responsive vertical margin
    backgroundColor: '#ffffff', // Use color directly instead of variable for clarity
    borderWidth: 1,
    borderRadius: wp('2%'), // Responsive border radius
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    width: wp('12%'), // Responsive width
    height: wp('12%'), // Responsive height (same as width for square)
    borderRadius: wp('6%'), // Responsive border radius
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('2.5%'), // Responsive margin right
  },
  iconText: {
    fontSize: wp('5%'), // Responsive font size
    color: '#10B981', // Use color directly instead of variable for clarity
  },
  itemTitle: {
    fontSize: wp('4%'), // Responsive font size
    textAlign: 'left',
    flex: 1, // Allows text to take available space
  },
});

export default Welcome;
