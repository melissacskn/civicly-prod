

// import React, { useContext, useState } from "react";
// import { Alert, StatusBar, StyleSheet, Text, FlatList, TouchableOpacity, ActivityIndicator, View, Image } from "react-native";
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import { signOut, fetchAuthSession } from 'aws-amplify/auth';
// import { LogInContext } from "../navigators/RootStack";
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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


// const { darkLight, primary, green, tertiary } = Colors;

// const Welcome = ({ route }) => {
//   const setIsUser = useContext(LogInContext);
//   const navigation = useNavigation();

//   const [data, setData] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [firstname, setFirstname] = useState('');
//   const [lastname, setLastname] = useState('');
//   const [imageUrl, setImageUrl] = useState('');

//   const renderItem = ({ item }) => {
//     const backgroundColor = item.id === selectedId ? green : primary;
//     const color = item.id === selectedId ? 'white' : 'black';

//     const handlePress = (item) => {
//       setSelectedId(item.id);
//       navigation.navigate('AssetsPage', { itemId: item.id, itemName: item.title });
//     };

//     return (
//       <TouchableOpacity onPress={() => handlePress(item)} style={[styles.itemContainer, { backgroundColor }]}>
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
//         .then((response) => response.json())
//         .then((result) => {
//           setFirstname(result.firstname);
//           setLastname(result.lastname);
//           setImageUrl(result.profile_image.image);
//         })
//         .catch((error) => console.error(error));
//     } catch (error) {
//       Alert.alert('Oops', error.message);
//       console.error('Error fetching auth session', error);
//     }
//   };

//   const getTenants = async () => {
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
//       setLoading(true);
//       setSelectedId(null);
//       fetchAuthData();
//       getTenants();
//     }, [])
//   );

//   return (
//     <StyledContainer>
//       <StatusBar backgroundColor="white" barStyle="dark-content" translucent={true} />
//       <InnerContainer>
//         <PageLogo
//           resizeMode="cover"
//           source={require('./../assets/images/civicly-remove.png')}
//         />
//         {loading ? (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="green" />
//           </View>
//         ) : (
//           <WelcomeContainer>
//             <StyledFormArea>
//               <View style={styles.profileContainer}>
//                 <View style={styles.profileIconContainer}>
//                   {imageUrl ? (
//                     <Image source={{ uri: imageUrl }} style={styles.profileImage} />
//                   ) : (
//                     <Text style={styles.profileIcon}>{firstname.charAt(0).toUpperCase()}</Text>
//                   )}
//                 </View>
//                 <Text style={styles.profileName}>{firstname} {lastname}</Text>
//               </View>
//               <SubTitle style={styles.subTitle} welcome={true}>Select Organisation</SubTitle>
//               <FlatList
//                 data={data}
//                 renderItem={renderItem}
//                 keyExtractor={item => item.id}
//                 extraData={selectedId}
//               />
//               <StyledButton onPress={handleLogout}>
//                 <ButtonText>Logout</ButtonText>
//               </StyledButton>
//             </StyledFormArea>
//           </WelcomeContainer>
//         )}
//       </InnerContainer>
//     </StyledContainer>
//   );
// }

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: wp('5%'), // Responsive horizontal padding
//   },
//   profileContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: hp('2%'), // Responsive margin
//   },
//   profileIconContainer: {
//     width: wp('10%'), // Responsive width
//     height: wp('10%'), // Responsive height (same as width for square)
//     borderRadius: wp('5%'), // Responsive border radius
//     backgroundColor: '#E5E7EB',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: wp('2.5%'), // Responsive margin right
//   },
//   profileIcon: {
//     fontSize: wp('5%'), // Responsive font size
//     color: '#10B981', // Use color directly instead of variable for clarity
//   },
//   profileImage: {
//     width: wp('13%'),  // Set the width as a percentage of the screen width
//     height: wp('13%'), // Set the height equal to the width to keep it square
//     borderRadius: wp('6.5%'), // Half of the width to make the image circular
//   },
//   profileName: {
//     fontSize: wp('4.5%'), // Responsive font size
//     fontWeight: 'bold',
//     color: '#1F2937', // Use color directly instead of variable for clarity
//   },
//   subTitle: {
//     fontSize: wp('4%'), // Responsive font size
//     marginBottom: hp('2%'), // Responsive margin bottom
//     letterSpacing: wp('0.25%'), // Responsive letter spacing
//     fontWeight: 'bold',
//     color: '#1F2937', // Use color directly instead of variable for clarity
//     textAlign: 'left',
//     fontFamily: 'PublicSans-Regular',
//   },
//   itemContainer: {
//     padding: wp('3.5%'), // Responsive padding
//     marginVertical: hp('1%'), // Responsive vertical margin
//     backgroundColor: '#ffffff', // Use color directly instead of variable for clarity
//     borderWidth: 1,
//     borderRadius: wp('2%'), // Responsive border radius
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   iconContainer: {
//     width: wp('12%'), // Responsive width
//     height: wp('12%'), // Responsive height (same as width for square)
//     borderRadius: wp('6%'), // Responsive border radius
//     backgroundColor: '#E5E7EB',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: wp('2.5%'), // Responsive margin right
//   },
//   iconText: {
//     fontSize: wp('5%'), // Responsive font size
//     color: '#10B981', // Use color directly instead of variable for clarity
//   },
//   itemTitle: {
//     fontSize: wp('4%'), // Responsive font size
//     textAlign: 'left',
//     flex: 1, // Allows text to take available space
//   },
// });

// export default Welcome;

import React, { useContext, useState } from "react";
import { Alert, StatusBar, Text, FlatList, TouchableOpacity, ActivityIndicator, View, Image } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { signOut, fetchAuthSession } from 'aws-amplify/auth';
import { LogInContext } from "../navigators/RootStack";
import styles, { Colors } from '../components/stylesWelcome'; // Ensure this is correctly imported

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
    const backgroundColor = item.id === selectedId ? Colors.green : Colors.primary;
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
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" translucent={true} />
      <View style={styles.innerContainer}>
        <Image
          resizeMode="cover"
          source={require('./../assets/images/civicly-remove.png')}
          style={styles.pageLogo}
        />
        {loading ? (
          <View style={styles.containerForLoading}>
            <ActivityIndicator size="large" color={Colors.green} />
          </View>
        ) : (
          <View style={styles.welcomeContainer}>
            <View style={styles.formArea}>
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
              <Text style={styles.subTitle}>Select Organisation</Text>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                extraData={selectedId}
              />
              <TouchableOpacity style={styles.styledButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

export default Welcome;
