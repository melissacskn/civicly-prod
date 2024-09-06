

// import React, { useState, useEffect, useContext,useRef } from 'react';
// import { StyleSheet, View, TouchableOpacity, Text, Image, Alert,Switch } from 'react-native';
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
// import DashBoardScreen from '../screens/DashBoardScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import AssetsPage from '../screens/AssetsPage';
// import AssetMap from '../screens/AssetMap';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { AssetContext } from '../components/AssetContext';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import AssetTable from '../components/AssetTable';
// import { fetchAuthSession } from 'aws-amplify/auth';
// import { TenantContext } from '../components/TenantContext';
// import BottomSheet from '@gorhom/bottom-sheet'; // Import the Bottom Sheet
// const Drawer = createDrawerNavigator();

// const MainDrawer = () => {
//   const [firstName, setFirstName] = useState('User');
//   const [lastName, setLastName] = useState('Name');
//   const [profileImage, setProfileImage] = useState('https://via.placeholder.com/100');
//   const [email, setEmail] = useState('user@example.com');
//   const [userName, setUserName] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
//   const [viewType, setViewType] = useState('list'); // Default to 'list' view
//   const [showImages, setShowImages] = useState(true); // Toggle for "Show Images"
//   const [showBodyText, setShowBodyText] = useState(true); // Toggle for "Show Body Text"
//   const [showTags, setShowTags] = useState(true); // Toggle for "Show Tags"
//   const [showDetailedView, setShowDetailedView] = useState(false); // State to switch views in the bottom sheet
//   const [detailedViewType, setDetailedViewType] = useState(null); // Either 'viewOptions' or 'sortBy'

//   const { fetchAssets } = useContext(AssetContext);
//   const { tenantId } = useContext(TenantContext);
//   // Ref for the bottom sheet
//   const bottomSheetRef = useRef(null);
//   const snapPoints = ['25%', '50%']; // Define the height of the bottom sheet


//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         setLoading(true); // Show loading indicator
//         const session = await fetchAuthSession({ forceRefresh: true });
//         console.log('Session:', session); // Debugging line
//         if (!session || !session.tokens) throw new Error('Session tokens are undefined');
  
//         const accessToken = session.tokens.accessToken.toString();
//         const myHeaders = new Headers();
//         myHeaders.append('Authorization', `Bearer ${accessToken}`);
  
//         const response = await fetch('https://api.dev.nonprod.civic.ly/core/user/', {
//           method: 'GET',
//           headers: myHeaders,
//         });
  
//         const result = await response.json();
//         console.log('User Data:', result); // Debugging line to check the user data
  
//         setFirstName(result.firstname || 'User');
//         setLastName(result.lastname || 'Name');
//         setProfileImage(result.profile_image?.image || 'https://via.placeholder.com/100');
//         setEmail(result.email || 'user@example.com');
//         setUserName(result.username || 'no username');
//       } catch (error) {
//         console.error('Error fetching user data:', error); // Detailed error logging
//         Alert.alert('Error', 'Failed to fetch profile data');
//       } finally {
//         setLoading(false); // Hide loading indicator after fetching data
//       }
//     };
  
//     fetchUserData();
//   }, []);
  
//   const toggleDropdown = () => {
 
//     bottomSheetRef.current?.expand(); // Open the bottom sheet when the dropdown is triggered
//   };

//   const handleViewChange = (view) => {
//     setViewType(view);
//     bottomSheetRef.current?.close(); // Close the bottom sheet
//   };

//   const handleOptionClick = () => {
//     setShowDetailedView(true); // Switch to the detailed view
//   };
//   const renderMinimalView = () => (
//     <View style={styles.bottomSheetContainer}>
//       <TouchableOpacity onPress={() => setDetailedViewType('viewOptions')}>
//         <Text style={styles.optionText}>View Options</Text>
//       </TouchableOpacity>
//       <View style={styles.divider} />
//       <TouchableOpacity onPress={() => setDetailedViewType('sortBy')}>
//         <Text style={styles.optionText}>Sort by</Text>
//       </TouchableOpacity>
//       <View style={styles.divider} />
//       <TouchableOpacity>
//         <Text style={styles.optionText}>Notes Settings</Text>
//       </TouchableOpacity>
//     </View>
//   );
  

//   const renderDetailedView = () => {
//     if (detailedViewType === 'viewOptions') {
//       return (
//         <View style={styles.bottomSheetContainer}>
//           <Text style={styles.optionTitle}>View Options</Text>
//           <View style={styles.optionContainer}>
//             <TouchableOpacity onPress={() => handleViewChange('list')}>
//               <View style={styles.optionRow}>
//                 <MaterialIcons name="view-list" size={24} color={viewType === 'list' ? 'green' : 'black'} />
//                 <Text style={[styles.optionText, viewType === 'list' && styles.selectedItem]}>
//                   Small
//                 </Text>
//               </View>
//             </TouchableOpacity>
  
//             <TouchableOpacity onPress={() => handleViewChange('grid')}>
//               <View style={styles.optionRow}>
//                 <MaterialIcons name="view-module" size={24} color={viewType === 'grid' ? 'green' : 'black'} />
//                 <Text style={[styles.optionText, viewType === 'grid' && styles.selectedItem]}>
//                   Large
//                 </Text>
//               </View>
//             </TouchableOpacity>
  
//             <TouchableOpacity>
//               <View style={styles.optionRow}>
//                 <MaterialIcons name="view-comfy" size={24} color="black" />
//                 <Text style={styles.optionText}>Card</Text>
//               </View>
//             </TouchableOpacity>
//           </View>
  
//           <View style={styles.divider} />
//           <Text style={styles.optionTitle}>Display Options</Text>
//           <View style={styles.optionRow2}>
//             <Text style={styles.optionText2}>Show Images</Text>
//             <Switch value={showImages} onValueChange={() => setShowImages(!showImages)} />
//           </View>
//           <View style={styles.optionRow2}>
//             <Text style={styles.optionText2}>Show Body Text</Text>
//             <Switch value={showBodyText} onValueChange={() => setShowBodyText(!showBodyText)} />
//           </View>
//           <View style={styles.optionRow2}>
//             <Text style={styles.optionText2}>Show Tags</Text>
//             <Switch value={showTags} onValueChange={() => setShowTags(!showTags)} />
//           </View>
//         </View>
//       );
//     } else if (detailedViewType === 'sortBy') {
//       return (
//         <View style={styles.bottomSheetContainer}>
//           <Text style={styles.optionTitle}>Sort By</Text>
//           <TouchableOpacity>
//             <Text style={styles.optionText}>Date Updated</Text>
//           </TouchableOpacity>
//           <TouchableOpacity>
//             <Text style={styles.optionText}>Name</Text>
//           </TouchableOpacity>
//         </View>
//       );
//     }
//     return null;
//   };
  

//   return (
//     <>
//       <Drawer.Navigator
//         initialRouteName="DashboardScreen"
//         drawerContent={(props) => (
//           <CustomDrawerContent
//             {...props}
//             firstName={firstName}
//             lastName={lastName}
//             profileImage={profileImage}
//             userName={userName}
//           />
//         )}
//         screenOptions={({ route, navigation }) => ({
//           header: () => (
//             <View style={styles.navBar}>
//             <TouchableOpacity onPress={() => navigation.openDrawer()}>
//               <AntDesign name="menu-fold" size={28} color="black" />
//             </TouchableOpacity>
//             <Text style={styles.title}>{getTitle(route.name)}</Text>
//             {(route.name === 'AssetTable' || route.name === 'AssetsPage') && (
//               <View>
//                 <TouchableOpacity onPress={toggleDropdown}>
//                   <MaterialIcons name="more-vert" size={28} color="black" />
//                 </TouchableOpacity>
          
           
//               </View>
//             )}
//           </View>
          
//           ),
//           drawerIcon: ({ color }) => {
//             let iconName;
  
//             if (route.name === 'DashboardScreen') {
//               iconName = 'dashboard';
//             } else if (route.name === 'AssetTable') {
//               iconName = 'appstore1';
//             } else if (route.name === 'AssetMap') {
//               iconName = 'enviromento';
//             } else if (route.name === 'ProfileScreen') {
//               iconName = 'user';
//             }
  
//             return <AntDesign name={iconName} size={wp('6%')} color={color} />;
//           },
//           drawerActiveTintColor: 'green',
//           drawerInactiveTintColor: '#4D4D4D',
//           drawerStyle: styles.drawer,
//         })}
//       >
//         <Drawer.Screen
//           name="DashboardScreen"
//           component={DashBoardScreen}
//           options={{ title: 'Dashboard' }}
//         />
  
//         <Drawer.Screen
//           name="AssetTable"
//           component={viewType === 'list' ? AssetTable : AssetsPage}
//           options={{ title: 'Assets' }}
//         />
  
//         <Drawer.Screen name="AssetMap" component={AssetMap} options={{ title: 'Map' }} />
  
//         <Drawer.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
//       </Drawer.Navigator>

//       {/* Bottom Sheet */}
//       <BottomSheet
//         ref={bottomSheetRef}
//         index={-1} // Initially closed
//         snapPoints={snapPoints}
//         enablePanDownToClose={true} // Allow dragging down to close
//       >
//         {/* Conditionally render the views based on the state */}
//         {detailedViewType ? renderDetailedView() : renderMinimalView()}
//       </BottomSheet>
//     </>
//   );
  
// };

// // Custom Drawer Content to display user image and username
// const CustomDrawerContent = (props) => {
//   const { firstName, lastName, profileImage, userName } = props;

//   return (
//     <DrawerContentScrollView {...props}>
//       <View style={styles.drawerHeader}>
//         <Image source={{ uri: profileImage }} style={styles.profileImage} />
//         <View style={styles.textContainer}>
//           <Text style={styles.nameSurname}>{`${firstName} ${lastName}`}</Text>
//           <Text style={styles.userName}>{userName}</Text>
//         </View>
//       </View>
//       <View style={styles.divider} />
//       <DrawerItemList {...props} />
//     </DrawerContentScrollView>
//   );
// };

// // Function to get the title based on the route name
// const getTitle = (routeName) => {
//   switch (routeName) {
//     case 'DashboardScreen':
//       return 'Dashboard';
//     case 'AssetTable':
//       return 'Assets';
//     case 'AssetMap':
//       return 'Map';
//     case 'ProfileScreen':
//       return 'Profile';
//     default:
//       return '';
//   }
// };


// const styles = StyleSheet.create({
//   drawer: {
//     backgroundColor: 'white',
//     width: wp('75%'),
//   },
//   navBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: 'white',
//     elevation: 5,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     flex: 1,
//   },
//   bottomSheetContainer: {
//     padding: 20,
//     backgroundColor: 'white',
//   },
//   optionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   optionText2: {
//     fontSize: 16,
//     paddingVertical: 10,
//   },
//   optionRow2: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   selectedItem: {
//     color: 'green',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#e0e0e0',
//     marginVertical: 10,
//   },
//   profileImage: {
//     width: wp('20%'),
//     height: wp('20%'),
//     borderRadius: wp('10%'),
//     marginBottom: 10,

//   },
//   textContainer: {
//     alignItems: 'center',
//   },
//   nameSurname: {
//     fontSize: wp('4.5%'),
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   userName: {
//     fontSize: wp('3.5%'),
//     color: 'gray',
//   },

//   optionContainer: {
//     flexDirection: 'row', // Arrange view options in a row
//     justifyContent: 'space-around', // Ensure even space between options
//     marginVertical: 10, // Add vertical spacing for the group of options
//   },
//   optionRow: {
//     flexDirection: 'column', // Icon above text
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 10,
//     width: wp('25%'), // Set width to make the options evenly spaced
//   },
//   optionText: {
//     fontSize: 14, // Slightly smaller font for view option names
//     paddingTop: 5, // Add some space between the icon and the text
//     textAlign: 'center', // Center align the text below the icon
//   },
  
  
// });

// export default MainDrawer;
import React, { useState, useEffect, useContext, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, Alert, Switch, TouchableWithoutFeedback } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import DashBoardScreen from '../screens/DashBoardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AssetsPage from '../screens/AssetsPage';
import AssetMap from '../screens/AssetMap';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AssetContext } from '../components/AssetContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AssetTable from '../components/AssetTable';
import { fetchAuthSession } from 'aws-amplify/auth';
import { TenantContext } from '../components/TenantContext';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'; // Import the Bottom Sheet
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

<FontAwesome name="exchange" size={24} color="black" />

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  const [firstName, setFirstName] = useState('User');
  const [lastName, setLastName] = useState('Name');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/100');
  const [email, setEmail] = useState('user@example.com');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState('list'); // Default to 'list' view
  const [showImages, setShowImages] = useState(true); // Toggle for "Show Images"
  const [showBodyText, setShowBodyText] = useState(true); // Toggle for "Show Body Text"
  const [showTags, setShowTags] = useState(true); // Toggle for "Show Tags"
  const [showSortOptions, setShowSortOptions] = useState(false);

  const { fetchAssets } = useContext(AssetContext);
  const { tenantId } = useContext(TenantContext);
  // Ref for the bottom sheet
  const bottomSheetRef = useRef(null);
  const snapPoints = ['25%', '53%']; // Define the height of the bottom sheet
  // Add a new state variable to track the selected sort option
const [selectedSortOption, setSelectedSortOption] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const session = await fetchAuthSession({ forceRefresh: true });
        if (!session || !session.tokens) throw new Error('Session tokens are undefined');

        const accessToken = session.tokens.accessToken.toString();
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${accessToken}`);

        const response = await fetch('https://api.dev.nonprod.civic.ly/core/user/', {
          method: 'GET',
          headers: myHeaders,
        });

        const result = await response.json();
        setFirstName(result.firstname || 'User');
        setLastName(result.lastname || 'Name');
        setProfileImage(result.profile_image?.image || 'https://via.placeholder.com/100');
        setEmail(result.email || 'user@example.com');
        setUserName(result.username || 'no username');
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  // Function to toggle sort options visibility
const toggleSortOptions = () => {
  setShowSortOptions(true);
};

// Function to toggle back to view options
const toggleViewOptions = () => {
  setShowSortOptions(false);
};

  const toggleDropdown = () => {
    bottomSheetRef.current?.expand();
  };

  const handleViewChange = (view) => {
    setViewType(view);
    // bottomSheetRef.current?.close();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const handleSortChange = (sortOption) => {
    // Pass the sorting option to fetchAssets function based on the viewType
    setSelectedSortOption(sortOption); // This will make the "Clear Sort" button visible
  
    if (tenantId) {
      fetchAssets(tenantId, sortOption);
    }
    // bottomSheetRef.current?.close(); // Close the bottom sheet after sorting
  };
  // Function to clear the selected sort
const clearSort = () => {
  setSelectedSortOption(null); // Reset the selected sort option
  // Fetch unsorted assets or apply the default sorting logic
  if (tenantId) {
    fetchAssets(tenantId); // Call the fetchAssets function without sorting
  }
};


  // Backdrop with blur effect and close on tap
  const renderBackdrop = (props) => (
    <BottomSheetBackdrop
      {...props}
      opacity={0.7}
      // Allow backdrop to be touchable to close the bottom sheet
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      onPress={() => bottomSheetRef.current?.close()} // Close on tap
    />
  );
  
  // Render the detailed view
 // Updated renderDetailedView to handle sort options display
//  const renderDetailedView = () => (
//   <View style={styles.bottomSheetContainer}>
//     {/* View Options */}
//     <View>
//       <TouchableOpacity onPress={toggleViewOptions}>
//         <View style={styles.headerRow}>
//           <AntDesign name="appstore-o" size={26} color="black" />
//           <Text style={styles.headerText}>View Options</Text>
//         </View>
//       </TouchableOpacity>
//     </View>

//     {!showSortOptions ? (
//       <>
//         {/* View Options Content */}
//         <View style={styles.optionContainer}>
//           <TouchableOpacity onPress={() => handleViewChange('list')}>
//             <View style={styles.optionRow}>
//               <Entypo name="menu" size={30} color={viewType === 'list' ? 'green' : 'black'} />
//               <Text style={[styles.optionText, viewType === 'list' && styles.selectedItem]}>
//                 Small
//               </Text>
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => handleViewChange('grid')}>
//             <View style={styles.optionRow}>
//               <MaterialIcons name="view-module" size={30} color={viewType === 'grid' ? 'green' : 'black'} />
//               <Text style={[styles.optionText, viewType === 'grid' && styles.selectedItem]}>
//                 Large
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         {/* Display Options */}
//         <Text style={styles.optionTitle}>Display Options</Text>
//         <View style={styles.optionRow2}>
//           <Text style={styles.optionText2}>Show Images</Text>
//           <Switch value={showImages} onValueChange={() => setShowImages(!showImages)} />
//         </View>
//         <View style={styles.optionRow2}>
//           <Text style={styles.optionText2}>Show Body Text</Text>
//           <Switch value={showBodyText} onValueChange={() => setShowBodyText(!showBodyText)} />
//         </View>
//         <View style={styles.optionRow2}>
//           <Text style={styles.optionText2}>Show Tags</Text>
//           <Switch value={showTags} onValueChange={() => setShowTags(!showTags)} />
//         </View>

//         {/* Sort By Section */}
//         <View style={styles.divider} />
//         <TouchableOpacity onPress={toggleSortOptions}>
//           <View style={styles.headerRow}>
//             <MaterialIcons name="swap-vert" size={30} color="black" />
//             <Text style={styles.headerText}>Sort By</Text>
//           </View>
//         </TouchableOpacity>
//       </>
//     ) : (
//       <>
//         <TouchableOpacity onPress={toggleSortOptions}>
//           <View style={styles.headerRow}>
//             <MaterialIcons name="swap-vert" size={30} color="black" />
//             <Text style={styles.headerText}>Sort By</Text>
//           </View>
//         </TouchableOpacity>

//         {/* Sort By Options Content */}
//         <View style={styles.sortOptionsContainer}>
//           <TouchableOpacity onPress={() => handleSortChange('name')}>
//             <View style={styles.optionRow}>
//               <Text style={[
//                 styles.sortOption,
//                 selectedSortOption === 'name' && styles.selectedSortOption
//               ]}>Name</Text>
//               {selectedSortOption === 'name' && <FontAwesome name="check" size={18} color="green" style={styles.checkmark} />}
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => handleSortChange('type')}>
//             <View style={styles.optionRow}>
//               <Text style={[
//                 styles.sortOption,
//                 selectedSortOption === 'type' && styles.selectedSortOption
//               ]}>Type (A-Z)</Text>
//               {selectedSortOption === 'type' && <FontAwesome name="check" size={18} color="green" style={styles.checkmark} />}
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => handleSortChange('status')}>
//             <View style={styles.optionRow}>
//               <Text style={[
//                 styles.sortOption,
//                 selectedSortOption === 'status' && styles.selectedSortOption
//               ]}>Status</Text>
//               {selectedSortOption === 'status' && <FontAwesome name="check" size={18} color="green" style={styles.checkmark} />}
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => handleSortChange('condition')}>
//             <View style={styles.optionRow}>
//               <Text style={[
//                 styles.sortOption,
//                 selectedSortOption === 'condition' && styles.selectedSortOption
//               ]}>Condition</Text>
//               {selectedSortOption === 'condition' && <FontAwesome name="check" size={18} color="green" style={styles.checkmark} />}
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => handleSortChange('asset_type__asset_category__parent__name')}>
//             <View style={styles.optionRow}>
//               <Text style={[
//                 styles.sortOption,
//                 selectedSortOption === 'asset_type__asset_category__parent__name' && styles.selectedSortOption
//               ]}>Main Category</Text>
//               {selectedSortOption === 'asset_type__asset_category__parent__name' && <FontAwesome name="check" size={18} color="green" style={styles.checkmark} />}
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => handleSortChange('asset_type__asset_category__name')}>
//             <View style={styles.optionRow}>
//               <Text style={[
//                 styles.sortOption,
//                 selectedSortOption === 'asset_type__asset_category__name' && styles.selectedSortOption
//               ]}>Sub Category</Text>
//               {selectedSortOption === 'asset_type__asset_category__name' && <FontAwesome name="check" size={18} color="green" style={styles.checkmark} />}
//             </View>
//           </TouchableOpacity>
          

//           {/* Conditionally show "Clear Sort" */}
//           {selectedSortOption && (
//             <View style={styles.clearSortContainer}>
//               <TouchableOpacity onPress={clearSort}>
//                 <Text style={styles.clearSortOption}>✖ Clear Sort</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       </>
//     )}
//   </View>
// );

const renderDetailedView = () => (
  <View style={styles.bottomSheetContainer}>
    {/* View Options */}
    <View>
      <TouchableOpacity onPress={toggleViewOptions}>
        <View style={styles.headerRow}>
          <AntDesign name="appstore-o" size={26} color="black" />
          <Text style={styles.headerText}>View Options</Text>
        </View>
      </TouchableOpacity>
    </View>

    {!showSortOptions ? (
      <>
        {/* Compact View Options Content */}
        <View style={styles.compactOptionContainer}>
          <TouchableOpacity onPress={() => handleViewChange('list')}>
            <View style={styles.compactOption}>
              <Entypo name="menu" size={30} color={viewType === 'list' ? 'green' : 'black'} />
              <Text style={[styles.optionText, viewType === 'list' && styles.selectedItem]}>
                Small
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleViewChange('grid')}>
            <View style={styles.compactOption}>
              <MaterialIcons name="view-module" size={30} color={viewType === 'grid' ? 'green' : 'black'} />
              <Text style={[styles.optionText, viewType === 'grid' && styles.selectedItem]}>
                Large
              </Text>
            </View>
          </TouchableOpacity>
        </View>


        {/* Display Options */}
        <Text style={styles.optionTitle}>Display Options</Text>
        <View style={styles.optionRow2}>
          <Text style={styles.optionText2}>Show Images</Text>
          <Switch value={showImages} onValueChange={() => setShowImages(!showImages)} />
        </View>
        <View style={styles.optionRow2}>
          <Text style={styles.optionText2}>Show Body Text</Text>
          <Switch value={showBodyText} onValueChange={() => setShowBodyText(!showBodyText)} />
        </View>
        <View style={styles.optionRow2}>
          <Text style={styles.optionText2}>Show Tags</Text>
          <Switch value={showTags} onValueChange={() => setShowTags(!showTags)} />
        </View>

        {/* Sort By Section */}
        <View style={styles.divider} />
        <TouchableOpacity onPress={toggleSortOptions}>
          <View style={styles.headerRow}>
            <MaterialIcons name="swap-vert" size={30} color="black" />
            <Text style={styles.headerText}>Sort By</Text>
          </View>
        </TouchableOpacity>
      </>
    ) : (
      <>
        <TouchableOpacity onPress={toggleSortOptions}>
          <View style={styles.headerRow}>
            <MaterialIcons name="swap-vert" size={30} color="black" />
            <Text style={styles.headerText}>Sort By</Text>
          </View>
        </TouchableOpacity>

        {/* Sort By Options Content */}
        <View style={styles.sortOptionsContainer}>
          <TouchableOpacity onPress={() => handleSortChange('name')}>
            <View style={styles.optionRow}>
              <Text style={[
                styles.sortOption,
                selectedSortOption === 'name' && styles.selectedSortOption
              ]}>Name</Text>
              {selectedSortOption === 'name' && <FontAwesome name="check" size={18} color="green" style={styles.checkmark} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleSortChange('type')}>
            <View style={styles.optionRow}>
              <Text style={[
                styles.sortOption,
                selectedSortOption === 'type' && styles.selectedSortOption
              ]}>Type (A-Z)</Text>
              {selectedSortOption === 'type' && <FontAwesome name="check" size={18} color="green" style={styles.checkmark} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleSortChange('status')}>
            <View style={styles.optionRow}>
              <Text style={[
                styles.sortOption,
                selectedSortOption === 'status' && styles.selectedSortOption
              ]}>Status</Text>
              {selectedSortOption === 'status' && <FontAwesome name="check" size={18} color="green" style={styles.checkmark} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleSortChange('condition')}>
            <View style={styles.optionRow}>
              <Text style={[
                styles.sortOption,
                selectedSortOption === 'condition' && styles.selectedSortOption
              ]}>Condition</Text>
              {selectedSortOption === 'condition' && <FontAwesome name="check" size={18} color="green" style={styles.checkmark} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleSortChange('asset_type__asset_category__parent__name')}>
            <View style={styles.optionRow}>
              <Text style={[
                styles.sortOption,
                selectedSortOption === 'asset_type__asset_category__parent__name' && styles.selectedSortOption
              ]}>Main Category</Text>
              {selectedSortOption === 'asset_type__asset_category__parent__name' && <FontAwesome name="check" size={18} color="green" style={styles.checkmark} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleSortChange('asset_type__asset_category__name')}>
            <View style={styles.optionRow}>
              <Text style={[
                styles.sortOption,
                selectedSortOption === 'asset_type__asset_category__name' && styles.selectedSortOption
              ]}>Sub Category</Text>
              {selectedSortOption === 'asset_type__asset_category__name' && <FontAwesome name="check" size={18} color="green" style={styles.checkmark} />}
            </View>
          </TouchableOpacity>
          

          {/* Conditionally show "Clear Sort" */}
          {selectedSortOption && (
            <View style={styles.clearSortContainer}>
              <TouchableOpacity onPress={clearSort}>
                <Text style={styles.clearSortOption}>✖ Clear Sort</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </>
    )}
  </View>
);


  return (
    <>
      <Drawer.Navigator
        initialRouteName="DashboardScreen"
        drawerContent={(props) => (
          <CustomDrawerContent
            {...props}
            firstName={firstName}
            lastName={lastName}
            profileImage={profileImage}
            userName={userName}
          />
        )}
        screenOptions={({ route, navigation }) => ({
          header: () => (
            <View style={styles.navBar}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <AntDesign name="menu-fold" size={28} color="black" />
              </TouchableOpacity>
              <Text style={styles.title}>{getTitle(route.name)}</Text>
              {(route.name === 'AssetTable' || route.name === 'AssetsPage') && (
                <View>
                  <TouchableOpacity onPress={toggleDropdown}>
                    <MaterialIcons name="more-vert" size={28} color="black" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ),
          drawerIcon: ({ color }) => {
            let iconName;
            if (route.name === 'DashboardScreen') iconName = 'dashboard';
            else if (route.name === 'AssetTable') iconName = 'appstore1';
            else if (route.name === 'AssetMap') iconName = 'enviromento';
            else if (route.name === 'ProfileScreen') iconName = 'user';
            return <AntDesign name={iconName} size={wp('6%')} color={color} />;
          },
          drawerActiveTintColor: 'green',
          drawerInactiveTintColor: '#4D4D4D',
          drawerStyle: styles.drawer,
        })}
      >
        <Drawer.Screen name="DashboardScreen" component={DashBoardScreen} options={{ title: 'Dashboard' }} />
        <Drawer.Screen name="AssetTable" component={viewType === 'list' ? AssetTable : AssetsPage} options={{ title: 'Assets' }} />
        <Drawer.Screen name="AssetMap" component={AssetMap} options={{ title: 'Map' }} />
        <Drawer.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
      </Drawer.Navigator>

      {/* Bottom Sheet */}
      <TouchableWithoutFeedback onPress={closeBottomSheet}>
        <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints} enablePanDownToClose={true}   backdropComponent={renderBackdrop}>
          {renderDetailedView()}
        </BottomSheet>
      </TouchableWithoutFeedback>
    </>
  );
};
// Custom Drawer Content to display user image and username
const CustomDrawerContent = (props) => {
  const { firstName, lastName, profileImage, userName } = props;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.nameSurname}>{`${firstName} ${lastName}`}</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

// Function to get the title based on the route name
const getTitle = (routeName) => {
  switch (routeName) {
    case 'DashboardScreen':
      return 'Dashboard';
    case 'AssetTable':
      return 'Assets';
    case 'AssetMap':
      return 'Map';
    case 'ProfileScreen':
      return 'Profile';
    default:
      return '';
  }
};

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: 'white',
    width: wp('75%'),
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    fontFamily: 'PublicSans-SemiBold',
  },
  bottomSheetContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 10,
    fontFamily: 'PublicSans-SemiBold',
  },
  optionText2: {
    fontSize: 16,
    paddingVertical: 10,
    fontFamily: 'PublicSans-Regular',
  },
  optionRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  selectedItem: {
    color: 'green',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  profileImage: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('10%'),
    marginBottom: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  nameSurname: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userName: {
    fontSize: wp('3.5%'),
    color: 'gray',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  optionRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    width: wp('25%'),
  },
  optionText: {
    fontSize: 14,
    paddingTop: 5,
    textAlign: 'center',
    fontFamily: 'PublicSans-Regular',
  },
  sortOptionsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  sortOption: {
    fontSize: 16,
    paddingVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 8,

  },
  headerText: {
    fontSize: 18,
   
    marginLeft: 10, // Space between icon and text
    fontFamily: 'PublicSans-SemiBold',
  },


  optionRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
 


 

  clearSortContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 10,
  },
  clearSortOption: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    paddingVertical: 10,
    textAlign: 'center',
  },




  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This ensures the checkmark aligns to the right
    alignItems: 'center',
    paddingVertical: 10,
  },
  checkmark: {
    marginLeft: 'auto', // Align the checkmark to the right end
  },
  sortOption: {
    fontSize: 16,
    fontFamily: 'PublicSans-Regular',
  },
  selectedSortOption: {
    color: 'green', // This will match the tick color
  },
  compactOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  compactOption: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Space between the options
  },

});

export default MainDrawer;
