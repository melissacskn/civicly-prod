

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, TouchableOpacity, Text, Image, Alert } from 'react-native';
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
// import DashBoardScreen from '../screens/DashBoardScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import AssetsPage from '../screens/AssetsPage';
// import AssetMap from '../screens/AssetMap';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import AssetTable from '../components/AssetTable';
// import { fetchAuthSession } from 'aws-amplify/auth';

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

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         setLoading(true);  // Show loading indicator
//         const session = await fetchAuthSession({ forceRefresh: true });
//         if (!session || !session.tokens) throw new Error('Session tokens are undefined');

//         const accessToken = session.tokens.accessToken.toString();
//         const myHeaders = new Headers();
//         myHeaders.append("Authorization", `Bearer ${accessToken}`);

//         const response = await fetch("https://api.dev.nonprod.civic.ly/core/user/", {
//           method: "GET",
//           headers: myHeaders,
//         });

//         const result = await response.json();
//         setFirstName(result.firstname || "User");
//         setLastName(result.lastname || "Name");
//         setProfileImage(result.profile_image?.image || 'https://via.placeholder.com/100');
//         setEmail(result.email || 'user@example.com');
//         setUserName(result.username || 'no username');
//       } catch (error) {
//         Alert.alert('Error', 'Failed to fetch profile data');
//       } finally {
//         setLoading(false);  // Hide loading indicator after fetching data
//       }
//     };

//     fetchUserData();
//   }, []);

//   const toggleDropdown = () => {
//     setIsDropdownVisible(!isDropdownVisible);
//   };

//   const handleViewChange = (view) => {
//     setViewType(view);
//     setIsDropdownVisible(false);
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
//               <TouchableOpacity onPress={() => navigation.openDrawer()}>
//                 <AntDesign name="menu-fold" size={28} color="black" />
//               </TouchableOpacity>
//               <Text style={styles.title}>{getTitle(route.name)}</Text>
//               {route.name === 'AssetTable' && (
//                 <View>
//                   <TouchableOpacity onPress={toggleDropdown}>
//                     <MaterialIcons name="more-vert" size={28} color="black" />
//                   </TouchableOpacity>
//                   {isDropdownVisible && (
//                     <View style={styles.dropdownMenu}>
//                       <TouchableOpacity onPress={() => handleViewChange('list')}>
//                         <Text style={styles.dropdownItem}>List View</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={() => handleViewChange('grid')}>
//                         <Text style={styles.dropdownItem}>Grid View</Text>
//                       </TouchableOpacity>
//                     </View>
//                   )}
//                 </View>
//               )}
//             </View>
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

//         <Drawer.Screen 
//           name="AssetMap" 
//           component={AssetMap}        
//           options={{ title: 'Map' }}
//         />

//         <Drawer.Screen 
//           name="ProfileScreen" 
//           component={ProfileScreen}        
//           options={{ title: 'Profile' }}
//         />
//       </Drawer.Navigator>
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
//     width: wp('75%'), // Adjust the width of the drawer
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
//   },
//   dropdownMenu: {
//     position: 'absolute',
//     top: 40,
//     right: 0,
//     backgroundColor: 'white',
//     borderRadius: 8,
//     elevation: 5,
//     zIndex: 1000,
//     width: 150,
//   },
//   dropdownItem: {
//     padding: 10,
//     fontSize: 16,
//     color: 'black',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   drawerHeader: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 30,
//     backgroundColor: 'white',
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
//   divider: {
//     height: 1,
//     backgroundColor: '#e0e0e0',
//     marginVertical: 15,
//     marginHorizontal: 20,
//   },
// });

// export default MainDrawer;

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, TouchableOpacity, Text, Image, Alert } from 'react-native';
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
// import DashBoardScreen from '../screens/DashBoardScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import AssetsPage from '../screens/AssetsPage';
// import AssetMap from '../screens/AssetMap';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import AssetTable from '../components/AssetTable';
// import { fetchAuthSession } from 'aws-amplify/auth';

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
//   const [sortCriteria, setSortCriteria] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         setLoading(true);  // Show loading indicator
//         const session = await fetchAuthSession({ forceRefresh: true });
//         if (!session || !session.tokens) throw new Error('Session tokens are undefined');

//         const accessToken = session.tokens.accessToken.toString();
//         const myHeaders = new Headers();
//         myHeaders.append("Authorization", `Bearer ${accessToken}`);

//         const response = await fetch("https://api.dev.nonprod.civic.ly/core/user/", {
//           method: "GET",
//           headers: myHeaders,
//         });

//         const result = await response.json();
//         setFirstName(result.firstname || "User");
//         setLastName(result.lastname || "Name");
//         setProfileImage(result.profile_image?.image || 'https://via.placeholder.com/100');
//         setEmail(result.email || 'user@example.com');
//         setUserName(result.username || 'no username');
//       } catch (error) {
//         Alert.alert('Error', 'Failed to fetch profile data');
//       } finally {
//         setLoading(false);  // Hide loading indicator after fetching data
//       }
//     };

//     fetchUserData();
//   }, []);

//   const toggleDropdown = () => {
//     setIsDropdownVisible(!isDropdownVisible);
//   };


//   const handleViewChange = (view) => {
//     setViewType(view);
//     setIsDropdownVisible(false);
//   };

//   const handleSortChange = (criteria) => {
//     setSortCriteria(criteria);
//     setIsDropdownVisible(false);
//     // You can add logic here to sort your data based on the selected criteria
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
//               <TouchableOpacity onPress={() => navigation.openDrawer()}>
//                 <AntDesign name="menu-fold" size={28} color="black" />
//               </TouchableOpacity>
//               <Text style={styles.title}>{getTitle(route.name)}</Text>
//               {route.name === 'AssetTable' && (
//                 <View>
//                   <TouchableOpacity onPress={toggleDropdown}>
//                     <MaterialIcons name="more-vert" size={28} color="black" />
//                   </TouchableOpacity>
//                   {isDropdownVisible && (
//                     <View style={styles.dropdownMenu}>
//                       <TouchableOpacity onPress={() => handleViewChange('list', navigation)}>
//                         <Text style={styles.dropdownItem}>List View</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={() => handleViewChange('grid', navigation)}>
//                         <Text style={styles.dropdownItem}>Grid View</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={() => handleSortChange('date')}>
//                         <Text style={styles.dropdownItem}>Sort by Date</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={() => handleSortChange('status')}>
//                         <Text style={styles.dropdownItem}>Sort by Status</Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={() => handleSortChange('priority')}>
//                         <Text style={styles.dropdownItem}>Sort by Priority</Text>
//                       </TouchableOpacity>
//                     </View>
//                   )}
//                 </View>
//               )}
//             </View>
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

// <Drawer.Screen 
//           name="AssetTable" 
//           component={viewType === 'list' ? AssetTable : AssetsPage}        
//           options={{ title: 'Assets' }}
//         />

//         <Drawer.Screen 
//           name="AssetMap" 
//           component={AssetMap}        
//           options={{ title: 'Map' }}
//         />

//         <Drawer.Screen 
//           name="ProfileScreen" 
//           component={ProfileScreen}        
//           options={{ title: 'Profile' }}
//         />
//       </Drawer.Navigator>
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
//     width: wp('75%'), // Adjust the width of the drawer
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
//     textAlign: 'center', // Ensure title is centered
//     flex: 1, // Take up available space to ensure centering
//   },
//   dropdownMenu: {
//     position: 'absolute',
//     top: 40,
//     right: 0,
//     backgroundColor: 'white',
//     borderRadius: 8,
//     elevation: 5,
//     zIndex: 1000,
//     width: 150,
//   },
//   dropdownItem: {
//     padding: 10,
//     fontSize: 16,
//     color: 'black',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   drawerHeader: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 30,
//     backgroundColor: 'white',
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
//   divider: {
//     height: 1,
//     backgroundColor: '#e0e0e0',
//     marginVertical: 15,
//     marginHorizontal: 20,
//   },
// });

// export default MainDrawer;
import React, { useState, useEffect ,useContext} from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, Alert } from 'react-native';
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

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  const [firstName, setFirstName] = useState('User');
  const [lastName, setLastName] = useState('Name');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/100');
  const [email, setEmail] = useState('user@example.com');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [viewType, setViewType] = useState('list'); // Default to 'list' view
  const [sortCriteria, setSortCriteria] = useState(null);
  const { fetchAssets } = useContext(AssetContext);
  const { tenantId } = useContext(TenantContext);
  const { 
    sortAssetsByName, 
    sortAssetsByType, 
    sortAssetsByStatus, 
    sortAssetsByMainCategory, 
    sortAssetsBySubCategory 
  } = useContext(AssetContext); // Access sorting functions from context
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);  // Show loading indicator
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
        setFirstName(result.firstname || "User");
        setLastName(result.lastname || "Name");
        setProfileImage(result.profile_image?.image || 'https://via.placeholder.com/100');
        setEmail(result.email || 'user@example.com');
        setUserName(result.username || 'no username');
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch profile data');
      } finally {
        setLoading(false);  // Hide loading indicator after fetching data
      }
    };

    fetchUserData();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleViewChange = (view) => {
    setViewType(view);
    setIsDropdownVisible(false);

  };

  const handleSortChange = (criteria) => {
    let ordering = '';
    switch(criteria) {
      case 'name':
        ordering = 'name';
        break;
      case 'type':
        ordering = 'asset_type__name';
        break;
      case 'status':
        ordering = 'status';
        break;
        case 'condition':
        ordering = 'condition';
        break;
      case 'main_category':
        ordering = 'asset_type__asset_category__parent__name';
        break;
      case 'sub_category':
        ordering = 'asset_type__asset_category__name';
        break;
      default:
        ordering = '';
    }

    setSortCriteria(ordering);
    setIsDropdownVisible(false);

    // Refetch assets with the selected ordering and current view type
    fetchAssets(tenantId, ordering);
};

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
                  {isDropdownVisible && (
                    <View style={styles.dropdownMenu}>
                      {viewType === 'list' ? (
                        <>
                          <TouchableOpacity onPress={() => handleViewChange('grid', navigation)}>
                            <Text style={styles.dropdownItem}>Grid View</Text>
                          </TouchableOpacity>
                          {/* Add field selection logic here */}
                        </>
                      ) : (
                        <>
                          <TouchableOpacity onPress={() => handleViewChange('list')}>
                            <Text style={styles.dropdownItem}>List View</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleSortChange('name')}>
                            <Text style={styles.dropdownItem}>Sort by Name</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleSortChange('type')}>
                            <Text style={styles.dropdownItem}>Sort by Type(A-Z)</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleSortChange('status')}>
                            <Text style={styles.dropdownItem}>Sort by Status</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleSortChange('condition')}>
                            <Text style={styles.dropdownItem}>Sort by Condition</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleSortChange('main_category')}>
                            <Text style={styles.dropdownItem}>Sort by Main Category</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleSortChange('sub_category')}>
                            <Text style={styles.dropdownItem}>Sort by Sub Category</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleSortChange('priority')}>
                            <Text style={styles.dropdownItem}>Sort by Priority</Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  )}
                </View>
              )}
            </View>
          ),
          drawerIcon: ({ color }) => {
            let iconName;

            if (route.name === 'DashboardScreen') {
              iconName = 'dashboard';
            } else if (route.name === 'AssetTable') {
              iconName = 'appstore1';
            } else if (route.name === 'AssetMap') {
              iconName = 'enviromento';
            } else if (route.name === 'ProfileScreen') {
              iconName = 'user';
            }

            return <AntDesign name={iconName} size={wp('6%')} color={color} />;
          },
          drawerActiveTintColor: 'green',
          drawerInactiveTintColor: '#4D4D4D',
          drawerStyle: styles.drawer,
        })}
      >
        <Drawer.Screen 
          name="DashboardScreen" 
          component={DashBoardScreen}        
          options={{ title: 'Dashboard' }}
        />

        <Drawer.Screen 
          name="AssetTable" 
          component={viewType === 'list' ? AssetTable : AssetsPage}        
          options={{ title: 'Assets' }}
        />

        <Drawer.Screen 
          name="AssetMap" 
          component={AssetMap}        
          options={{ title: 'Map' }}
        />

        <Drawer.Screen 
          name="ProfileScreen" 
          component={ProfileScreen}        
          options={{ title: 'Profile' }}
        />
      </Drawer.Navigator>
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
    width: wp('75%'), // Adjust the width of the drawer
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
    textAlign: 'center', // Ensure title is centered
    flex: 1, // Take up available space to ensure centering
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5,
    zIndex: 1000,
    width: 150,
  },
  dropdownItem: {
    padding: 10,
    fontSize: 16,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  drawerHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: 'white',
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
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
    marginHorizontal: 20,
  },
});

export default MainDrawer;
