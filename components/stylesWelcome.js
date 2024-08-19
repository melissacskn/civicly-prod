

// import { StyleSheet } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// export const Colors = {
//   primary: "#ffffff",
//   secondary: "#E5E7EB",
//   tertiary: "#1F2937",
//   darkLight: "#9CA3AF",
//   brand: "#6D28D9",
//   green: "#10B981",
//   red: "#EF4444",
//   black: "#000000",
// };

// const { primary, secondary, tertiary, darkLight, brand, green, red, black } = Colors;

// export const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: wp('5%'),
//     paddingTop: hp('2%'),
//     backgroundColor: primary,
//   },
//   innerContainer: {
//     flex: 1,
//     width: '100%',
//     alignItems: 'center',
//     backgroundColor: primary,
//   },
//   welcomeContainer: {
//     paddingHorizontal: wp('5%'), // Added horizontal padding
//     paddingTop: hp('2%'),
//     backgroundColor: primary,
//     width: '100%', // Ensure full width
//   },
//   pageLogo: {
//     width: wp('60%'),
//     height: hp('7%'),
//     marginTop: hp('5%'),
//     alignSelf: 'center',
//   },
//   profileContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: hp('2%'),
//   },
//   profileIconContainer: {
//     width: wp('15%'),
//     height: wp('15%'),
//     borderRadius: wp('7.5%'),
//     backgroundColor: '#E5E7EB',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: wp('3%'),
//   },
//   profileIcon: {
//     fontSize: wp('7%'),
//     color: '#10B981',
//   },
//   profileImage: {
//     width: wp('15%'),
//     height: wp('15%'),
//     borderRadius: wp('7.5%'),
//   },
//   profileName: {
//     fontSize: wp('5%'),
//     fontWeight: 'bold',
//     color: tertiary,
//   },
//   subTitle: {
//     fontSize: wp('4%'),
//     marginBottom: hp('1%'),
//     letterSpacing: 0.25,
//     fontWeight: 'bold',
//     color: tertiary,
//     fontFamily: 'PublicSans-Regular',
//     marginLeft: wp('4%'), // Align with the start of the items
//   },
//   itemContainer: {
//     padding: wp('3%'),
//     marginVertical: hp('0.6%'),
//     backgroundColor: '#ffffff',
//     borderWidth: 1,
//     borderRadius: wp('2%'),
//     alignItems: 'center',
//     flexDirection: 'row',
//     width: '90%',
//     alignSelf: 'center',
//   },
//   iconContainer: {
//     width: wp('10%'),
//     height: wp('10%'),
//     borderRadius: wp('5%'),
//     backgroundColor: '#E5E7EB',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: wp('3%'),
//   },
//   iconText: {
//     fontSize: wp('5%'),
//     color: '#10B981',
//   },
//   itemTitle: {
//     fontSize: wp('4%'),
//     textAlign: 'left',
//     flex: 1,
//   },
//   styledButton: {
//     padding: hp('1.5%'),
//     backgroundColor: green,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: wp('2%'),
//     height: hp('7%'),
//     marginBottom: hp('35%'),
//     width: '90%',
//     alignSelf: 'center',
//     marginTop: hp('2%'),
//   },
//   buttonText: {
//     color: primary,
//     fontSize: wp('4%'),
//     fontFamily: 'PublicSans-Regular',
//   },
//   containerForLoading: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: wp('5%'),
//     backgroundColor: 'white',
//   },
//   editProfileButton: {
//     position: 'relative',
//     padding: hp('1.5%'),
  
//   },
// });

// export default styles;

import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Colors = {
  primary: "#ffffff",
  secondary: "#E5E7EB",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  brand: "#6D28D9",
  green: "#10B981",
  red: "#EF4444",
  black: "#000000",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: wp('5%'),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('4%'),
  },
  headerTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    color: Colors.tertiary,
    position: 'absolute', // Centers the text
    left: wp('50%'),
    transform: [{ translateX: -wp('16%') }], // Center relative to screen
    fontFamily: 'PublicSans-SemiBold',
    top: hp('2.6%'),
  },

  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: hp('50%'),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: hp('2%'),
    paddingHorizontal: wp('4%'), // Ensures padding between profile details and the edit icon
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('10%'),
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
  },
  profileImage: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('10%'),
  },
  profileIcon: {
    fontSize: wp('8%'),
    color: Colors.green,
  },
  profileNameContainer: {
    justifyContent: 'center',
  },
  profileName: {
    fontSize: wp('6%'),
    fontWeight: '600',
    color: Colors.tertiary,
    fontFamily: 'PublicSans-SemiBold',
  },
  profileSubtitle: {
    fontSize: wp('4%'),
    color: Colors.darkLight,
    fontFamily: 'PublicSans-Regular',
  },
  dashboardContainer: {
    width: '100%',
    marginTop: hp('4%'),
  },
  dashboardTitle: {
    fontSize: wp('5.5%'),
    fontFamily: 'PublicSans-SemiBold',
    color: Colors.tertiary,
    marginBottom: hp('2%'),
  },
  selectOrganisationCard: {
    backgroundColor: '#f8f8f8',
    padding: wp('4%'),
    marginBottom: hp('2%'),
    borderRadius: wp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    minHeight: hp('7%'), // Ensure card size is consistent with longer tenant names
  },
  dashboardCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dashboardCardTitle: {
    fontSize: wp('4.5%'),
    fontFamily: 'PublicSans-Regular',
    color: Colors.tertiary,
  },
  logoutButton: {
    backgroundColor: Colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('2%'),
    height: hp('6%'),
    width: '40%',
    alignSelf: 'center',
    
    // Positioning it at the bottom
    position: 'absolute',
    bottom: hp('3%'),
  },
  logoutText: {
    color: Colors.primary,
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  editIcon: {
    marginRight: wp('4%'), // Ensure space between icon and edges
  },
});

export default styles;
