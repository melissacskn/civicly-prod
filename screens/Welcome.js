
// import React, { useContext, useState } from "react";
// import { Alert, StatusBar, Text, FlatList, TouchableOpacity, ActivityIndicator, View, Image } from "react-native";
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import { signOut, fetchAuthSession } from 'aws-amplify/auth';
// import AntDesign from 'react-native-vector-icons/AntDesign'; // Import for edit icon
// import { LogInContext } from "../navigators/RootStack";
// import styles, { Colors } from '../components/stylesWelcome'; // Ensure this is correctly imported

// const Welcome = ({ route }) => {
//   const setIsUser = useContext(LogInContext);
//   const navigation = useNavigation();

//   const [data, setData] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [firstname, setFirstname] = useState('');
//   const [lastname, setLastname] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');

//   const renderItem = ({ item }) => {
//     const backgroundColor = item.id === selectedId ? Colors.green : Colors.primary;
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
//           setEmail(result.email);
//           setUsername(result.username);

//           // Check if profile_image exists and has an image property
//           if (result.profile_image && result.profile_image.image) {
//             setImageUrl(result.profile_image.image);
//           } else {
//             setImageUrl(null);  // If no image, set to null
//           }
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
//     <View style={styles.container}>
//       <StatusBar backgroundColor="white" barStyle="dark-content" translucent={true} />
//       <View style={styles.innerContainer}>
//         <Image
//           resizeMode="cover"
//           source={require('./../assets/images/civicly-remove.png')}
//           style={styles.pageLogo}
//         />
//         {loading ? (
//           <View style={styles.containerForLoading}>
//             <ActivityIndicator size="large" color={Colors.green} />
//           </View>
//         ) : (
//           <View style={styles.welcomeContainer}>
//             <View style={styles.formArea}>
//               <View style={styles.profileContainer}>
//                 <View style={styles.profileIconContainer}>
//                   {imageUrl ? (
//                     <Image source={{ uri: imageUrl }} style={styles.profileImage} />
//                   ) : (
//                     // Use user's initial or a default placeholder
//                     <Text style={styles.profileIcon}>{firstname ? firstname.charAt(0).toUpperCase() : 'U'}</Text>
//                   )}
//                 </View>
//                 <Text style={styles.profileName}>{firstname} {lastname}</Text>
//                      {/* Add Edit Button Here */}
//                      <TouchableOpacity 
//                   style={styles.editProfileButton}
//                   onPress={() => navigation.navigate('EditProfile', { firstname, lastname, email, username, imageUrl })}
//                 >
//                   <AntDesign name="edit" size={24} color={Colors.tertiary} />
//                 </TouchableOpacity>
//               </View>
//               <Text style={styles.subTitle}>Select Organisation</Text>
//               <FlatList
//                 data={data}
//                 renderItem={renderItem}
//                 keyExtractor={item => item.id}
//                 extraData={selectedId}
//               />
//               <TouchableOpacity style={styles.styledButton} onPress={handleLogout}>
//                 <Text style={styles.buttonText}>Logout</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// }

// export default Welcome;

import React, { useContext, useState, useEffect } from "react";
import { Alert, StatusBar, Text, View, Image, ActivityIndicator,TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { signOut, fetchAuthSession } from 'aws-amplify/auth';
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import { LogInContext } from "../navigators/RootStack";
import styles, { Colors } from '../components/stylesWelcome';  // Import styles

const Welcome = () => {
  const setIsUser = useContext(LogInContext);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [imageUrl, setImageUrl] = useState('');

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

      const response = await fetch("https://api.dev.nonprod.civic.ly/core/user/", requestOptions);
      const result = await response.json();

      setFirstname(result.firstname || "User");
      setLastname(result.lastname || "Name");
      setImageUrl(result.profile_image?.image || null);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch profile data');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchAuthData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.green} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" translucent={true} />
      
      {/* Back Arrow and Profile Title */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Your Profile</Text>
      </View>

      <View style={styles.innerContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.profileDetails}>
            {/* Profile image, not touchable */}
            <View style={styles.profileImageContainer}>
              {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.profileImage} />
              ) : (
                <Text style={styles.profileIcon}>
                  {firstname ? firstname.charAt(0).toUpperCase() : 'U'}
                </Text>
              )}
            </View>
            <View style={styles.profileNameContainer}>
              <Text style={styles.profileName}>{firstname} {lastname}</Text>
              <Text style={styles.profileSubtitle}>Senior Designer</Text>
            </View>
          </View>

          {/* Only the edit icon is touchable */}
          <AntDesign name="edit" size={24} color={Colors.tertiary} onPress={() => navigation.navigate('EditProfile')} />
        </View>

        {/* Select Organisation Section */}
        <View style={styles.dashboardContainer}>
          <Text style={styles.dashboardTitle}>Dashboard</Text>
          <TouchableOpacity style={styles.selectOrganisationCard} onPress={() => navigation.navigate('ListingTenants')}>
            <View style={styles.dashboardCardContent}>
              <Text style={styles.dashboardCardTitle}>Select Organisation</Text>
              <AntDesign name="right" size={20} color={Colors.tertiary} />
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Welcome;
