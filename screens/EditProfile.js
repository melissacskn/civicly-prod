// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { Colors } from '../components/stylesSignUp';  // Assuming your color constants are in stylesSignUp
// import { fetchAuthSession } from 'aws-amplify/auth';
// import AntDesign from 'react-native-vector-icons/AntDesign'; // Import icon library
// import ImagePicker from 'react-native-image-crop-picker'; // Image Picker for cropping
// import Modal from 'react-native-modal'; // Modal for selecting camera/gallery

// const { darkLight, primary, green, tertiary } = Colors;

// const EditProfile = ({ route }) => {
//   const[email, setEmail] = useState('');
//   const[imageUrl, setImageUrl] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const[username, setUsername] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);

//   const [firstNameInput, setFirstNameInput] = useState('');
//   const [lastNameInput, setLastNameInput] = useState('');

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

//       const response = await fetch("https://api.dev.nonprod.civic.ly/core/user/", requestOptions);
//       const result = await response.json();
//       console.log(result);

//       // Set fetched values into state
//       setFirstName(result.firstname || "User");
//       setLastName(result.lastname || "Name");
//       setImageUrl(result.profile_image?.image || null);
//       setEmail(result.email || "No email");
//       setUsername(result.username || "No username");

//       // Update input fields with fetched values
//       setFirstNameInput(result.firstname || "User");
//       setLastNameInput(result.lastname || "Name");
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch profile data');
//     } finally {
//       setLoading(false); 
//     }
//   };
//   const updateProfile = async () => {
//     try{
//       const session = await fetchAuthSession({ forceRefresh: true });
//       if (!session || !session.tokens) throw new Error('Session tokens are undefined');

//       const accessToken = session.tokens.accessToken.toString();
      
    
//     }
//     catch(e){

//     }
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${accessToken}`);

//     const formdata = new FormData();
//     formdata.append("firstname", firstName);
//     formdata.append("lastname", lastName);

// const requestOptions = {
//   method: "PATCH",
//   headers: myHeaders,
//   body: formdata,
//   redirect: "follow"
// };

// fetch("https://api.dev.nonprod.civic.ly/core/user/", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));
    
//   }

//   useEffect(() => {
//     fetchAuthData();
//   }, []);

//   const openGallery = () => {
//     ImagePicker.openPicker({
//       width: 300,
//       height: 300,
//       cropping: true
//     }).then(image => {
//       setImageUrl(image.path);  // Update the profile image
//     }).catch(error => {
//       console.error('Error selecting image from gallery', error);
//     });
//     setModalVisible(false);
//   };

//   const openCamera = () => {
//     ImagePicker.openCamera({
//       width: 300,
//       height: 300,
//       cropping: true
//     }).then(image => {
//       setImageUrl(image.path);  // Update the profile image
//     }).catch(error => {
//       console.error('Error capturing image', error);
//     });
//     setModalVisible(false);
//   };

//   const handleImageUpload = () => {
//     setModalVisible(true); // Open modal for image selection
//   };

//   const handleSaveChanges = () => {
//     updateProfile();
//     Alert.alert('Changes saved', 'Your profile has been updated.');
//     // Call API to update profile if necessary
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={Colors.green} />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Top Bar with Back Arrow and Edit Profile Title */}
//       <View style={styles.headerContainer}>
//         <Text style={styles.headerTitle}>Edit Profile</Text>
//       </View>

//       <View style={styles.innerContainer}>
//         {/* Profile Image or Upload Photo Text */}
//         <TouchableOpacity onPress={handleImageUpload} style={styles.uploadContainer}>
//           {imageUrl ? (
//             <Image source={{ uri: imageUrl }} style={styles.profileImage} />
//           ) : (
//             <Text style={styles.uploadText}>Upload Photo</Text>
//           )}
//         </TouchableOpacity>

//         {/* Email (untouchable) */}
//         <Text style={styles.inputLabel}>Email</Text>
//         <TextInput
//           style={styles.textInputUntouchable}
//           value={email}
//           editable={false}
//           placeholderTextColor={darkLight}
//         />

//         {/* Username (untouchable) */}
//         <Text style={styles.inputLabel}>Username</Text>
//         <TextInput
//           style={styles.textInputUntouchable}
//           value={username}
//           editable={false}
//           placeholderTextColor={darkLight}
//         />

//         {/* First Name */}
//         <Text style={styles.inputLabel}>First Name</Text>
//         <TextInput
//           style={styles.textInput}
//           value={firstNameInput}
//           onChangeText={setFirstNameInput}
//           placeholder="First Name"
//           placeholderTextColor={darkLight}
//         />

//         {/* Last Name */}
//         <Text style={styles.inputLabel}>Last Name</Text>
//         <TextInput
//           style={styles.textInput}
//           value={lastNameInput}
//           onChangeText={setLastNameInput}
//           placeholder="Last Name"
//           placeholderTextColor={darkLight}
//         />

//         {/* Save Button */}
//         <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
//           <Text style={styles.saveButtonText}>Save Changes</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Modal for Image Selection */}
//       <Modal
//         isVisible={modalVisible}
//         onBackdropPress={() => setModalVisible(false)}
//         onBackButtonPress={() => setModalVisible(false)}
//         style={styles.modal}
//       >
//         <View style={styles.modalContent}>
//           <Text style={styles.modalText}>Upload Photo</Text>
//           <TouchableOpacity style={styles.button} onPress={openCamera}>
//             <AntDesign name="camera" size={20} color="#000" style={styles.buttonIcon} />
//             <Text style={styles.buttonText}>Take Photo</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={openGallery}>
//             <AntDesign name="picture" size={20} color="#000" style={styles.buttonIcon} />
//             <Text style={styles.buttonText}>Choose from Gallery</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
//             <AntDesign name="close" size={20} color="#000" style={styles.buttonIcon} />
//             <Text style={styles.buttonText}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: wp('5%'),
//     backgroundColor: '#fff',
//   },
//   innerContainer: {
//     alignItems: 'center',
//     marginTop: hp('10%'),  // Move the fields down
//   },
//   uploadContainer: {
//     width: wp('25%'),
//     height: wp('25%'),
//     borderRadius: wp('12.5%'),
//     borderWidth: 1,
//     borderColor: darkLight,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: hp('5%'),
//   },
//   profileImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: wp('12.5%'),
//   },
//   uploadText: {
//     fontSize: wp('4%'),
//     color: darkLight,
//   },
//   inputLabel: {
//     fontSize: wp('4.2%'),  // Responsive font size
//     color: tertiary,
//     marginBottom: hp('1%'),
//     alignSelf: 'flex-start',
//   },
//   textInput: {
//     width: '100%',
//     padding: wp('4%'),
//     borderColor: darkLight,
//     borderWidth: 1,
//     borderRadius: wp('2%'),
//     fontSize: wp('4%'),
//     marginBottom: hp('2%'),
//   },
//   textInputUntouchable: {
//     width: '100%',
//     padding: wp('4%'),
//     borderColor: darkLight,
//     borderWidth: 1,
//     borderRadius: wp('2%'),
//     fontSize: wp('4%'),
//     marginBottom: hp('2%'),
//     color: darkLight,  // Simulate "blurring" by making the text light gray
//     backgroundColor: '#F0F0F0',  // Light background color for distinction
//   },
//   saveButton: {
//     width: '100%',
//     padding: wp('4%'),
//     backgroundColor: green,
//     borderRadius: wp('2%'),
//     alignItems: 'center',
//     marginTop: hp('3%'),  // Add some space above the button
//   },
//   saveButtonText: {
//     fontSize: wp('4.5%'),
//     color: primary,
//     fontWeight: 'bold',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: wp('4.5%'),
//     fontWeight: '600',
//     color: Colors.tertiary,
//     position: 'absolute', // Centers the text
//     left: wp('50%'),
//     transform: [{ translateX: -wp('16%') }], // Center relative to screen
//     fontFamily: 'PublicSans-SemiBold',
//     top: hp('2.6%'),
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: hp('2%'),
//     borderRadius: 10,
//   },
//   modalText: {
//     fontSize: wp('4%'),
//     marginBottom: hp('1%'),
//     color: '#333',
//     fontFamily:'PublicSans-SemiBold',
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: hp('2%'),
//     borderRadius: 4,
//     marginBottom: hp('2%'),
//   },
//   buttonIcon: {
//     marginRight: wp('2%'),
//   },
//   buttonText: {
//     color: '#333',
//     fontSize: wp('4%'),
//     fontFamily: 'PublicSans-Regular',
//   },
// });

// export default EditProfile;


// import React, { useState, useEffect, useMemo } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { Colors } from '../components/stylesSignUp';  
// import { fetchAuthSession } from 'aws-amplify/auth';
// import AntDesign from 'react-native-vector-icons/AntDesign'; 
// import ImagePicker from 'react-native-image-crop-picker'; 
// import Modal from 'react-native-modal';
// import { useNavigation, useRoute } from '@react-navigation/native';

// const { darkLight, primary, green, tertiary } = Colors;

// const EditProfile = ({ route }) => {
//   const [email, setEmail] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [username, setUsername] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const navigation = useNavigation();
  
//   const [firstNameInput, setFirstNameInput] = useState('');
//   const [lastNameInput, setLastNameInput] = useState('');
//   const [imageUpdated, setImageUpdated] = useState(false);

//   // Memoize the initial data for comparison
//   const initialData = useMemo(() => ({
//     firstName,
//     lastName,
//     imageUrl,
//   }), [firstName, lastName, imageUrl]);

//   // Fetch data
//   const fetchAuthData = async () => {
//     try {
//       const session = await fetchAuthSession({ forceRefresh: true });
//       if (!session || !session.tokens) throw new Error('Session tokens are undefined');

//       const accessToken = session.tokens.accessToken.toString();
//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${accessToken}`);

//       const response = await fetch("https://api.dev.nonprod.civic.ly/core/user/", {
//         method: "GET",
//         headers: myHeaders,
//       });

//       const result = await response.json();
      
//       // Set fetched values into state
//       setFirstName(result.firstname || "User");
//       setLastName(result.lastname || "Name");
//       setImageUrl(result.profile_image?.image || null);
//       setEmail(result.email || "No email");
//       setUsername(result.username || "No username");

//       // Update input fields with fetched values
//       setFirstNameInput(result.firstname || "User");
//       setLastNameInput(result.lastname || "Name");
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch profile data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateProfile = async () => {
//     try {
//       // Fetch session and tokens
//       const session = await fetchAuthSession({ forceRefresh: true });
//       if (!session || !session.tokens) throw new Error('Session tokens are undefined');
  
//       const accessToken = session.tokens.accessToken.toString();
//       const myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${accessToken}`);
  
//       // Create FormData with updated values
//       const formdata = new FormData();
//       formdata.append("firstname", firstNameInput);  // Use firstNameInput from the form
//       formdata.append("lastname", lastNameInput);    // Use lastNameInput from the form
  
//       const requestOptions = {
//         method: "PATCH",
//         headers: myHeaders,
//         body: formdata,
//         redirect: "follow"
//       };
  
//       // Perform the update request
//       const response = await fetch("https://api.dev.nonprod.civic.ly/core/user/", requestOptions);
  
//       if (response.ok) {
//         const result = await response.text();  // Assuming response is text; adjust as needed
//         console.log(result);
//         Alert.alert('Changes saved', 'Your profile has been updated.');
//         navigation.navigate('Welcome')
//       } else {
//         // Handle non-2xx responses
//         const errorText = await response.text();
//         console.error('Error:', errorText);
//         Alert.alert('Error', 'Failed to update profile. Please try again.');
//       }
  
//     } catch (error) {
//       // Log the error
//       console.error('Update failed:', error);
//       Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
//     }
//   };
  
    

//   // Enable or disable save button based on changes
//   const isSaveDisabled = useMemo(() => (
//     firstNameInput === initialData.firstName &&
//     lastNameInput === initialData.lastName &&
//     imageUrl === initialData.imageUrl && 
//     !imageUpdated
//   ), [firstNameInput, lastNameInput, imageUrl, initialData, imageUpdated]);

//   useEffect(() => {
//     fetchAuthData();
//   }, []);

//   const openGallery = () => {
//     ImagePicker.openPicker({
//       width: 300,
//       height: 300,
//       cropping: true,
//     }).then(image => {
//       setImageUrl(image.path);
//       setImageUpdated(true); // Mark that the image has been updated
//     }).catch(error => {
//       console.error('Error selecting image from gallery', error);
//     });
//     setModalVisible(false);
//   };

//   const handleSaveChanges = () => {
//     updateProfile();
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={Colors.green} />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Top Bar with Back Arrow and Edit Profile Title */}
//       <View style={styles.headerContainer}>
//         <Text style={styles.headerTitle}>Edit Profile</Text>
//       </View>

//       <View style={styles.innerContainer}>
//         {/* Profile Image or Upload Photo Text */}
//         <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.uploadContainer}>
//           {imageUrl ? (
//             <Image source={{ uri: imageUrl }} style={styles.profileImage} />
//           ) : (
//             <Text style={styles.uploadText}>Upload Photo</Text>
//           )}
//         </TouchableOpacity>

//         {/* Email (untouchable) */}
//         <Text style={styles.inputLabel}>Email</Text>
//         <TextInput
//           style={styles.textInputUntouchable}
//           value={email}
//           editable={false}
//           placeholderTextColor={darkLight}
//         />

//         {/* Username (untouchable) */}
//         <Text style={styles.inputLabel}>Username</Text>
//         <TextInput
//           style={styles.textInputUntouchable}
//           value={username}
//           editable={false}
//           placeholderTextColor={darkLight}
//         />

//         {/* First Name */}
//         <Text style={styles.inputLabel}>First Name</Text>
//         <TextInput
//           style={styles.textInput}
//           value={firstNameInput}
//           onChangeText={setFirstNameInput}
//           placeholder="First Name"
//           placeholderTextColor={darkLight}
//         />

//         {/* Last Name */}
//         <Text style={styles.inputLabel}>Last Name</Text>
//         <TextInput
//           style={styles.textInput}
//           value={lastNameInput}
//           onChangeText={setLastNameInput}
//           placeholder="Last Name"
//           placeholderTextColor={darkLight}
//         />

//         {/* Save Button */}
//         <TouchableOpacity 
//           style={[styles.saveButton, isSaveDisabled ? styles.saveButtonDisabled : styles.saveButtonEnabled]} 
//           onPress={handleSaveChanges} 
//           disabled={isSaveDisabled}>
//           <Text style={styles.saveButtonText}>Save Changes</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Modal for Image Selection */}
//       <Modal
//         isVisible={modalVisible}
//         onBackdropPress={() => setModalVisible(false)}
//         onBackButtonPress={() => setModalVisible(false)}
//         style={styles.modal}
//       >
//         <View style={styles.modalContent}>
//           <Text style={styles.modalText}>Upload Photo</Text>
//           <TouchableOpacity style={styles.button} onPress={openGallery}>
//             <AntDesign name="picture" size={20} color="#000" style={styles.buttonIcon} />
//             <Text style={styles.buttonText}>Choose from Gallery</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
//             <AntDesign name="close" size={20} color="#000" style={styles.buttonIcon} />
//             <Text style={styles.buttonText}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: wp('5%'),
//     backgroundColor: '#fff',
//   },
//   innerContainer: {
//     alignItems: 'center',
//     marginTop: hp('3%'),
//   },
//   uploadContainer: {
//     width: wp('25%'),
//     height: wp('25%'),
//     borderRadius: wp('12.5%'),
//     borderWidth: 1,
//     borderColor: darkLight,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: hp('5%'),
//   },
//   profileImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: wp('12.5%'),
//   },
//   uploadText: {
//     fontSize: wp('4%'),
//     color: darkLight,
//   },
//   inputLabel: {
//     fontSize: wp('4.2%'),
//     color: tertiary,
//     marginBottom: hp('1%'),
//     alignSelf: 'flex-start',
//   },
//   textInput: {
//     width: '100%',
//     padding: wp('4%'),
//     borderColor: darkLight,
//     borderWidth: 1,
//     borderRadius: wp('2%'),
//     fontSize: wp('4%'),
//     marginBottom: hp('2%'),
//   },
//   textInputUntouchable: {
//     width: '100%',
//     padding: wp('4%'),
//     borderColor: darkLight,
//     borderWidth: 1,
//     borderRadius: wp('2%'),
//     fontSize: wp('4%'),
//     marginBottom: hp('2%'),
//     color: darkLight,
//     backgroundColor: '#F0F0F0',
//   },
//   saveButton: {
//     width: '100%',
//     padding: wp('4%'),
//     borderRadius: wp('2%'),
//     alignItems: 'center',
//     marginTop: hp('3%'),
//   },
//   saveButtonEnabled: {
//     backgroundColor: green,
//   },
//   saveButtonDisabled: {
//     backgroundColor: '#ccc',
//   },
//   saveButtonText: {
//     fontSize: wp('4.5%'),
//     color: primary,
//     fontWeight: 'bold',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerContainer: {
//     paddingVertical: hp('2%'),
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: wp('5%'),
//     fontWeight: 'bold',
//     color: tertiary,
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: hp('2%'),
//     borderRadius: 10,
//   },
//   modalText: {
//     fontSize: wp('4%'),
//     marginBottom: hp('1%'),
//     color: '#333',
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: hp('2%'),
//     borderRadius: 4,
//     marginBottom: hp('2%'),
//   },
//   buttonIcon: {
//     marginRight: wp('2%'),
//   },
//   buttonText: {
//     color: '#333',
//     fontSize: wp('4%'),
//   },
// });

// export default EditProfile;
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, Alert, ActivityIndicator, PermissionsAndroid } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../components/stylesSignUp';  
import { fetchAuthSession } from 'aws-amplify/auth';
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import ImagePicker from 'react-native-image-crop-picker'; 
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import HandleProfileEdit from '../components/HandleProfileEdit';

const { darkLight, primary, green, tertiary } = Colors;

const EditProfile = ({ route }) => {
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // Set modal visibility state
  const navigation = useNavigation();
  const { tenantId,tenantName } = route.params || {};
  const[image,setImage]=useState(null);
  
  
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [imageUpdated, setImageUpdated] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');

  // Memoize the initial data for comparison
  const initialData = useMemo(() => ({
    firstName,
    lastName,
    imageUrl,
  }), [firstName, lastName, imageUrl]);

  // Fetch data
  const fetchAuthData = async () => {
    try {
      const session = await fetchAuthSession({ forceRefresh: true });
      if (!session || !session.tokens) throw new Error('Session tokens are undefined');

      const accessToken = session.tokens.accessToken.toString();
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);

      const response = await fetch("https://api.dev.nonprod.civic.ly/core/user/", {
        method: "GET",
        headers: myHeaders,
      });

      const result = await response.json();
      
      // Set fetched values into state
      setFirstName(result.firstname || "User");
      setLastName(result.lastname || "Name");
      setImageUrl(result.profile_image?.image || null);
      setEmail(result.email || "No email");
      setUsername(result.username || "No username");

      // Update input fields with fetched values
      setFirstNameInput(result.firstname || "User");
      setLastNameInput(result.lastname || "Name");
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      const session = await fetchAuthSession({ forceRefresh: true });
      if (!session || !session.tokens) throw new Error('Session tokens are undefined');
  
      const accessToken = session.tokens.accessToken.toString();
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${accessToken}`);
  
      const formdata = new FormData();
      formdata.append("firstname", firstNameInput);  
      formdata.append("lastname", lastNameInput);  
  
      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };
  
      const response = await fetch("https://api.dev.nonprod.civic.ly/core/user/", requestOptions);
  
      if (response.ok) {
        const result = await response.text();  
        // console.log(result);
        Alert.alert('Changes saved', 'Your profile has been updated.');
        navigation.navigate('Welcome');
      } else {
        const errorText = await response.text();
        console.error('Error:', errorText);
        Alert.alert('Error', 'Failed to update profile. Please try again.');
      }
  
    } catch (error) {
      console.error('Update failed:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  const requestPermissions = async () => {
    try {
      const storageGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
        title: 'Storage Permission',
        message: 'This app needs access to your storage to display images.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (storageGranted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission denied');
        return false;
      }

      const cameraGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if (cameraGranted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission denied');
        showPermissionAlert('Camera');
        return false;
      }

      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const showPermissionAlert = (permissionType) => {
    Alert.alert(
      `${permissionType} Permission`,
      `This app needs access to your ${permissionType.toLowerCase()} to function properly. Please go to settings and enable ${permissionType.toLowerCase()} permissions.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Go to Settings', onPress: () => Linking.openSettings() },
      ],
      { cancelable: false }
    );
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setImage(image);
      setImageUrl(image.path);
      setImageUpdated(true); 
     // Extract file name from the path
     const extractedFileName = image.path.split('/').pop();
     setFileName(extractedFileName);
     console.log('File name:', extractedFileName);

     // Extract file extension from the file name
     const extractedFileType = extractedFileName.split('.').pop();
     setFileType(extractedFileType);
     console.log('File type:', extractedFileType);
    }).catch(error => {
      // Only log error if it's not a user cancellation
      if (error.message !== 'User cancelled image selection') {
        console.error('Error selecting image from gallery', error);
      }
    });
    setModalVisible(false); // Close modal after selecting or canceling
  };
  
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setImage(image);
      setImageUrl(image.path);
      setImageUpdated(true); 
      console.log(image)
      // Extract file name from the path
      const extractedFileName = image.path.split('/').pop();
      setFileName(extractedFileName);
      console.log('File name:', extractedFileName);

      // Extract file extension from the file name
      const extractedFileType = extractedFileName.split('.').pop();
      setFileType(extractedFileType);
      console.log('File type:', extractedFileType);
      
    }).catch(error => {
      // Only log error if it's not a user cancellation
      if (error.message !== 'User cancelled image selection') {
        console.error('Error capturing image from camera', error);
      }
    });
    setModalVisible(false); // Close modal after capturing or canceling
  };

  const handleImageUpload = async () => {
    const permissionsGranted = await requestPermissions();
    if (permissionsGranted) {
      setModalVisible(true); // Show modal after permissions are granted
    }
  };

  const handleSaveChanges = () => {
    // Always call the updateProfile function to update other fields like name, etc.
    updateProfile();
  
    // Check if there is an image update
    if (imageUpdated) {
      // Ensure that the imageName, imageType, and image are provided correctly
      if (fileName && fileType && image) {
        HandleProfileEdit({ imageName: fileName, imageType: fileType, image: image });
      } else {
        console.error("Image data is missing for profile edit.");
      }
    }
  };
  // Enable or disable save button based on changes
  const isSaveDisabled = useMemo(() => (
    firstNameInput === initialData.firstName &&
    lastNameInput === initialData.lastName &&
    imageUrl === initialData.imageUrl && 
    !imageUpdated
  ), [firstNameInput, lastNameInput, imageUrl, initialData, imageUpdated]);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <View style={styles.innerContainer}>
        <TouchableOpacity onPress={handleImageUpload} style={styles.uploadContainer}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.profileImage} />
          ) : (
            <Text style={styles.uploadText}>Upload Photo</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.textInputUntouchable}
          value={email}
          editable={false}
          placeholderTextColor={darkLight}
        />

        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          style={styles.textInputUntouchable}
          value={username}
          editable={false}
          placeholderTextColor={darkLight}
        />

        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput
          style={styles.textInput}
          value={firstNameInput}
          onChangeText={setFirstNameInput}
          placeholder="First Name"
          placeholderTextColor={darkLight}
        />

        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput
          style={styles.textInput}
          value={lastNameInput}
          onChangeText={setLastNameInput}
          placeholder="Last Name"
          placeholderTextColor={darkLight}
        />

        <TouchableOpacity 
          style={[styles.saveButton, isSaveDisabled ? styles.saveButtonDisabled : styles.saveButtonEnabled]} 
          onPress={handleSaveChanges} 
          disabled={isSaveDisabled}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Upload Photo</Text>
          <TouchableOpacity style={styles.button} onPress={openCamera}>
            <AntDesign name="camera" size={20} color="#000" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={openGallery}>
            <AntDesign name="picture" size={20} color="#000" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Choose from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
            <AntDesign name="close" size={20} color="#000" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
    backgroundColor: '#fff',
  },
  innerContainer: {
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  uploadContainer: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('12.5%'),
    borderWidth: 1,
    borderColor: darkLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('5%'),
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: wp('12.5%'),
  },
  uploadText: {
    fontSize: wp('4%'),
    color: darkLight,
  },
  inputLabel: {
    fontSize: wp('4.2%'),
    color: tertiary,
    marginBottom: hp('1%'),
    alignSelf: 'flex-start',
  },
  textInput: {
    width: '100%',
    padding: wp('4%'),
    borderColor: darkLight,
    borderWidth: 1,
    borderRadius: wp('2%'),
    fontSize: wp('4%'),
    marginBottom: hp('2%'),
  },
  textInputUntouchable: {
    width: '100%',
    padding: wp('4%'),
    borderColor: darkLight,
    borderWidth: 1,
    borderRadius: wp('2%'),
    fontSize: wp('4%'),
    marginBottom: hp('2%'),
    color: darkLight,
    backgroundColor: '#F0F0F0',
  },
  saveButton: {
    width: '100%',
    padding: wp('4%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  saveButtonEnabled: {
    backgroundColor: green,
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    fontSize: wp('4.5%'),
    color: primary,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    paddingVertical: hp('2%'),
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: tertiary,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: hp('2%'),
    borderRadius: 10,
  },
  modalText: {
    fontSize: wp('4%'),
    marginBottom: hp('1%'),
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: hp('2%'),
    borderRadius: 4,
    marginBottom: hp('2%'),
  },
  buttonIcon: {
    marginRight: wp('2%'),
  },
  buttonText: {
    color: '#333',
    fontSize: wp('4%'),
  },
});

export default EditProfile;
