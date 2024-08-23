

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
