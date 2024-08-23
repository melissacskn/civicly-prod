// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from '../screens/HomeScreen'; // Adjust the path as needed
// import ProfileScreen from '../screens/ProfileScreen'; // Profile screen
// import AssetsPage from '../screens/AssetsPage'; // Adjust the path as needed
// import AssetMap from '../screens/AssetMap'; // Import the AssetMap screen
// import AntDesign from 'react-native-vector-icons/AntDesign';

// const Tab = createBottomTabNavigator();

// const MainTabs = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="HomeScreen"  // Set HomeScreen as the initial screen
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ color, size }) => {
//           let iconName;

//           if (route.name === 'HomeScreen') {
//             iconName = 'home';  // Icon for HomeScreen
//           } else if (route.name === 'AssetsPage') {
//             iconName = 'appstore1';  // Icon for AssetsPage
//           } else if (route.name === 'AssetMap') {
//             iconName = 'enviromento';  // Icon for AssetMap
//           } else if (route.name === 'ProfileScreen') {
//             iconName = 'user';  // Icon for ProfileScreen
//           }

//           return <AntDesign name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: 'green',
//         tabBarInactiveTintColor: 'gray',
//       })}
//     >
//       {/* Home Screen */}
//       <Tab.Screen 
//         name="HomeScreen" 
//         component={HomeScreen}        
//         options={{ title: 'Home' }}  // Set tab label to "Home"
//       />

//       {/* Assets Page */}
//       <Tab.Screen 
//         name="AssetsPage" 
//         component={AssetsPage}        
//         options={{ title: 'Assets' }}  // Set tab label to "Assets"
//       />

//       {/* Asset Map Screen */}
//       <Tab.Screen 
//         name="AssetMap" 
//         component={AssetMap}        
//         options={{ title: 'Map' }}  // Set tab label to "Map"
//       />

//       {/* Profile Screen */}
//       <Tab.Screen 
//         name="ProfileScreen" 
//         component={ProfileScreen}        
//         options={{ title: 'Profile' }}  // Set tab label to "Profile"
//       />
//     </Tab.Navigator>
//   );
// };

// export default MainTabs;
////////Plus button added/////////
// import React from 'react';
// import { View, TouchableOpacity, StyleSheet } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from '../screens/HomeScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import AssetsPage from '../screens/AssetsPage';
// import AssetMap from '../screens/AssetMap';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { useNavigation } from '@react-navigation/native';

// const Tab = createBottomTabNavigator();

// const CustomButton = ({ onPress }) => {
//   return (
//     <TouchableOpacity
//       style={styles.customButton}
//       onPress={onPress}
//     >
//       <AntDesign name="plus" size={24} color="white" />
//     </TouchableOpacity>
//   );
// };

// const MainTabs = () => {
//   const navigation = useNavigation();

//   return (
//     <>
//       <Tab.Navigator
//         initialRouteName="HomeScreen"
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size }) => {
//             let iconName;

//             if (route.name === 'HomeScreen') {
//               iconName = 'home';
//             } else if (route.name === 'AssetsPage') {
//               iconName = 'appstore1';
//             } else if (route.name === 'AssetMap') {
//               iconName = 'enviromento';
//             } else if (route.name === 'ProfileScreen') {
//               iconName = 'user';
//             }

//             return <AntDesign name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: 'green',
//           tabBarInactiveTintColor: 'gray',
//           tabBarShowLabel: true,
//           tabBarStyle: styles.tabBar,
//         })}
//       >
//         <Tab.Screen 
//           name="HomeScreen" 
//           component={HomeScreen}        
//           options={{ title: 'Home' }}
//         />

//         <Tab.Screen 
//           name="AssetsPage" 
//           component={AssetsPage}        
//           options={{ title: 'Assets' }}
//         />

//         <Tab.Screen 
//           name="AssetMap" 
//           component={AssetMap}        
//           options={{ title: 'Map' }}
//         />

//         <Tab.Screen 
//           name="ProfileScreen" 
//           component={ProfileScreen}        
//           options={{ title: 'Profile' }}
//         />
//       </Tab.Navigator>

//       {/* Floating Add Button */}
//       <View style={styles.floatingButtonContainer}>
//         <CustomButton  />
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   tabBar: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 60,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     elevation: 10,
//     backgroundColor: 'white',
//   },
//   customButton: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#10B981', // Green button color
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 5,
//   },
//   floatingButtonContainer: {
//     position: 'absolute',
//     bottom: 30,
//     left: '50%',
//     marginLeft: -29,  // Center the button horizontally
//   },
// });

// export default MainTabs;

////22 august ////////

//NICE WITHOUT ADD BUTTON//

// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from '../screens/HomeScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import AssetsPage from '../screens/AssetsPage';
// import AssetMap from '../screens/AssetMap';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { useNavigation } from '@react-navigation/native';
// import CreateAsset2 from '../screens/CreateAsset2';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


// const Tab = createBottomTabNavigator();

// const MainTabs = () => {
//   const navigation = useNavigation();

//   return (
//     <Tab.Navigator
//       initialRouteName="HomeScreen"
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ color }) => {
//           let iconName;

//           if (route.name === 'HomeScreen') {
//             iconName = 'home';
//           } else if (route.name === 'AssetsPage') {
//             iconName = 'appstore1';
//           } else if (route.name === 'AssetMap') {
//             iconName = 'enviromento';
//           }else if (route.name === 'ProfileScreen') {
//             iconName = 'user';
//           }

//           return <AntDesign name={iconName} size={wp('6%')} color={color} />;
//         },
//         tabBarActiveTintColor: 'black',
//         tabBarInactiveTintColor: '#4D4D4D',
//         tabBarShowLabel: false,
//         tabBarStyle: styles.tabBar,
//       })}
//     >
//       <Tab.Screen 
//         name="HomeScreen" 
//         component={HomeScreen}        
//         options={{ title: 'Home' }}
//       />

//       <Tab.Screen 
//         name="AssetsPage" 
//         component={AssetsPage}        
//         options={{ title: 'Assets' }}
//       />

    

//       <Tab.Screen 
//         name="AssetMap" 
//         component={AssetMap}        
//         options={{ title: 'Map' }}
//       />

//       <Tab.Screen 
//         name="ProfileScreen" 
//         component={ProfileScreen}        
//         options={{ title: 'Profile' }}
//       />
//     </Tab.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   tabBar: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: hp('9%'), // Responsive tab bar height
//     backgroundColor: 'white',
//     elevation: 10,
//     borderTopWidth: 0, // Flat design without borders
//   },
//   plusIconContainer: {
//     width: wp('10%'), // Responsive width for the plus button container
//     height: wp('10%'), // Responsive height for the plus button container
//     borderRadius: wp('3%'), // Responsive border radius for rounded square
//     borderWidth: 1, // The border thickness
//     borderColor: 'black', // The border color
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default MainTabs;
import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AssetsPage from '../screens/AssetsPage';
import AssetMap from '../screens/AssetMap';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'HomeScreen') {
            iconName = 'home';
          } else if (route.name === 'AssetsPage') {
            iconName = 'appstore1';
          } else if (route.name === 'AssetMap') {
            iconName = 'enviromento';
          } else if (route.name === 'ProfileScreen') {
            iconName = 'user';
          }

          return <AntDesign name={iconName} size={wp('6%')} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#4D4D4D',
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen 
        name="HomeScreen" 
        component={HomeScreen}        
        options={{ title: 'Home' }}
      />

      <Tab.Screen 
        name="AssetsPage" 
        component={AssetsPage}        
        options={{ title: 'Assets' }}
      />

      <Tab.Screen 
        name="AssetMap" 
        component={AssetMap}        
        options={{ title: 'Map' }}
      />

      <Tab.Screen 
        name="ProfileScreen" 
        component={ProfileScreen}        
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: hp('9%'), // Responsive tab bar height
    backgroundColor: 'white',
    elevation: 10,
    borderTopWidth: 0, // Flat design without borders
  },
});

export default MainTabs;
